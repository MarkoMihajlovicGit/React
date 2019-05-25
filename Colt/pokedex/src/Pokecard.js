import React, { Component } from 'react';
import './Pokecard.css';

export default class Pokecard extends Component {
  createIdUrl = id => {
    const len = Math.ceil(Math.log10(id + 1));
    const url = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail';
    if (len === 2) {
      return `${url}/0${id}.png`;
    } else if (len <= 1) {
      return `${url}/00${id}.png`;
    } else {
      return `${url}/${id}.png`;
    }
  };

  render() {
    const { id, name, type, exp } = this.props;
    return (
      <div className="Pokecard">
        <h3 className="Pokecard-title">{name}</h3>
        <img alt="pokemon " src={this.createIdUrl(id)} />
        <p className="Pokecard-data">Type: {type}</p>{' '}
        <p className="Pokecard-data">EXP: {exp}</p>
      </div>
    );
  }
}
