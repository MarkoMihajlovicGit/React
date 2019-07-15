import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import startingState from './startingState';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = startingState;
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
  }

  componentDidMount() {
    this.animateRoll();
  }

  animateRoll = () => {
    this.setState({ rolling: true }, () => {
      setTimeout(this.roll, 1000);
    });
  };

  roll(evt) {
    // roll dice whose indexes are in reroll

    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
      gameOver: this.checkEndGame()
    }));
  }

  toggleLocked = idx => {
    // toggle whether idx is in locked or not
    if (this.state.rollsLeft > 0 && !this.state.rolling) {
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  };

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    if (!this.state.rolling) {
      this.setState(st => ({
        scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false)
      }));
      this.animateRoll();
    }
  }

  sumValues = obj =>
    Object.values(obj)
      .filter(x => x !== undefined)
      .reduce((a, b) => a + b, 0);

  displayRollInfo = () => {
    const { rollsLeft } = this.state;
    const messages = [
      'No More Rolls',
      '1 roll left',
      '2 rolls left',
      'Starting Round'
    ];

    return messages[rollsLeft];
  };

  testObj = obj => Object.values(obj).every(x => x !== undefined);

  checkEndGame = () => {
    return this.testObj(this.state.scores);
  };

  restartGame = () => {
    this.setState(st => ({
      ...startingState,
      bestScores: st.bestScores
    }));
    this.bestScores();
    this.animateRoll();
  };

  bestScores = () => {
    if (this.state.gameOver) {
      this.setState(st => ({
        bestScores: [...st.bestScores, this.sumValues(this.state.scores)]
      }));
    }
  };

  render() {
    const {
      dice,
      locked,
      rolling,
      rollsLeft,
      scores,
      gameOver,
      bestScores
    } = this.state;

    const finalScore = this.sumValues(scores);

    const biggestNumInArray =
      bestScores.length > 0 ? Math.max(...bestScores) : 0;

    const bestScore =
      biggestNumInArray <= finalScore ? finalScore : biggestNumInArray;

    if (gameOver) {
      return (
        <div className="Game">
          <header className="Game-header">
            <h1 className="App-title">Yahtzee!</h1>
            <section className="Game-dice-section">
              <h2>Final Score: {finalScore}</h2>
              <br />
              <h2>Best Score:{bestScore}</h2>
            </section>
            <button onClick={this.restartGame} className="Game-restart-game">
              Play again?
            </button>
          </header>
        </div>
      );
    } else {
      return (
        <div className="Game">
          <header className="Game-header">
            <h1 className="App-title">Yahtzee!</h1>
            <section className="Game-dice-section">
              <Dice
                dice={dice}
                locked={locked}
                handleClick={this.toggleLocked}
                disabled={rollsLeft === 0}
                rolling={rolling}
              />
              <div className="Game-button-wrapper">
                <button
                  className="Game-reroll"
                  disabled={locked.every(x => x) || rolling}
                  onClick={this.animateRoll}
                >
                  {this.displayRollInfo()}
                </button>
              </div>
            </section>
          </header>
          <ScoreTable
            doScore={this.doScore}
            scores={scores}
            sumScores={this.sumValues}
            bestScore={biggestNumInArray}
          />
        </div>
      );
    }
  }
}

export default Game;
