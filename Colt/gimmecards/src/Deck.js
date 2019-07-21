import React, { Component } from 'react';
import Card from './Card';
import Emoji from './Emoji';
import axios from 'axios';
import './Deck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      drawn: []
    };
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
    //console.log(deck);
    this.setState({
      deck: deck.data
    });
  }

  getCard = async () => {
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      //make req using deck id
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error('No Cards Left');
      }
      //console.log(cardRes.data);
      let card = cardRes.data.cards[0];
      //set state using new card info from api
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            img: card.image,
            name: `${card.suit} of ${card.value}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  };

  render() {
    const cards = this.state.drawn.map(c => (
      <Card image={c.img} name={c.name} key={c.id} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">
          {' '}
          <Emoji symbol="♦️" label="diamonds" /> Card Dealer{' '}
          <Emoji symbol="♦️" label="diamonds" />
        </h1>
        <h2 className="Deck-title subtitle">
          {' '}
          <Emoji symbol="♦️" label="diamonds" /> A little demo made with React{' '}
          <Emoji symbol="♦️" label="diamonds" />{' '}
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          {' '}
          GIMME CARD!!!{' '}
        </button>
        <div className="Deck-cardarea">{cards}</div>
      </div>
    );
  }
}
