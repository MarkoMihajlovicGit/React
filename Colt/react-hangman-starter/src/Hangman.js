import React, { Component } from 'react';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';
import { randomWord } from './words';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.onClick = this.onClick.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    if (this.props.maxWrong > this.state.nWrong) {
      this.setState(st => ({
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
      }));
    }
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.onClick}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  handleResetClick = () => {
    this.setState(st => ({
      ...st,
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    }));
  };

  onClick(evt) {
    this.handleGuess(evt);
  }
  gameState = () => {
    let gameState = this.generateButtons();
    let isWinner = this.guessedWord().join('') === this.state.answer;
    let gameOver = this.state.nWrong >= this.props.maxWrong;
    if (isWinner) gameState = 'You Win!';
    else if (gameOver) gameState = 'You Lose!';

    return gameState;
  };
  /** render: render game */
  render() {
    const { nWrong, answer } = this.state;
    const { maxWrong, images } = this.props;
    const altText = `${nWrong}/${maxWrong} wrong guesses`;
    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={altText} />
        <p>{altText}</p>
        <p className="Hangman-word">
          {!(nWrong >= maxWrong) ? this.guessedWord() : answer}
        </p>
        <p className="Hangman-btns ">{this.gameState()}</p>

        <button id="reset" onClick={this.handleResetClick}>
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;
