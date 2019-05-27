import React, { Component } from 'react';
import Pokedex from './Pokedex';
import pokemons from './pokemons';
import './Pokegame.css';

export default class Pokegame extends Component {
  static defaultProps = {
    pokemons
  };

  shufflePokemons = arr => {
    arr.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    let halfWayThough = Math.floor(arr.length / 2);
    let firstHalfDeck = arr.slice(0, halfWayThough);
    let secondHalfDeck = arr.slice(halfWayThough, arr.length);
    return { firstHalfDeck, secondHalfDeck };
  };

  calcExp = arr => arr.map(p => p.base_experience).reduce((acc, p) => acc + p);

  render() {
    const { firstHalfDeck, secondHalfDeck } = this.shufflePokemons(pokemons);
    const exp1 = this.calcExp(firstHalfDeck);
    const exp2 = this.calcExp(secondHalfDeck);
    const winner = exp1 > exp2 ? true : false;

    return (
      <div className="Pokegame">
        <div className="Pokegame-div">
          <Pokedex
            handNum={1}
            pokemons={firstHalfDeck}
            totalDeckExp={exp1}
            isWinner={winner}
          />
        </div>
        <div className="Pokegame-div">
          <Pokedex
            handNum={2}
            pokemons={secondHalfDeck}
            totalDeckExp={exp2}
            isWinner={!winner}
          />
        </div>
      </div>
    );
  }
}
