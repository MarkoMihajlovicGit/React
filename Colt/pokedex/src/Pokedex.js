import React, { Component } from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';

export default class Pokedex extends Component {
  render() {
    const { handNum, totalDeckExp, isWinner } = this.props;
    const win = isWinner ? (
      <h4 className="winner">THIS HAND WINS!</h4>
    ) : (
      <h4 className="loser">LOSER!!!</h4>
    );
    return (
      <div className="Pokedex">
        <h1>{`Pokedex player ${handNum} cards! `}</h1>
        <h3>{`Total EXP: ${totalDeckExp}`}</h3>
        {win}
        <div className="Pokedex-cards">
          {this.props.pokemons.map(p => (
            <Pokecard
              key={p.id}
              id={p.id}
              name={p.name}
              type={p.type}
              exp={p.base_experience}
            />
          ))}
        </div>
      </div>
    );
  }
}
