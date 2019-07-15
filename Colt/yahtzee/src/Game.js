import React, { Component } from 'react';
import Dice from './Dice';
import ScoreTable from './ScoreTable';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }).map(d => 5),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      gameOver: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
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

  render() {
    const { dice, locked, rolling, rollsLeft, scores, gameOver } = this.state;

    if (gameOver) {
      return (
        <div className="Game">
          <header className="Game-header">
            <h1 className="App-title">Yahtzee!</h1>
            <h2>Final Score: {this.sumValues(scores)}</h2>
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
          />
        </div>
      );
    }
  }
}

export default Game;
