import React, { Component } from 'react';
import './Pokecard.css';

export default class Pokecard extends Component {
  render() {
    const { id, name, type, exp } = this.props;
    return (
      <div className="Pokecard">
        <h3 className="Pokecard-title">{name}</h3>
        <img
          alt="pokemon "
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <p className="Pokecard-data">Type: {type}</p>{' '}
        <p className="Pokecard-data">EXP: {exp}</p>
      </div>
    );
  }
}
