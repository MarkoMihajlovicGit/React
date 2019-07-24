import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';
import './JokesList.css';

export default class JokesList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    };
  }

  async componentDidMount() {
    const url = 'https://icanhazdadjoke.com/';
    let jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let res = await axios.get(url, {
        headers: { Accept: 'application/json' }
      });

      jokes.push({ id: uuid(), joke: res.data.joke, votes: 0 });
    }
    this.setState({ jokes: jokes });
  }

  handleVote = (id, delta) => {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      )
    }));
  };

  render() {
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img
            alt="laughing emoji"
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
          />

          <button className="JokeList-getmore">New Jokes</button>
        </div>

        <div className="JokeList-jokes">
          {this.state.jokes.map(joke => (
            <Joke
              key={joke.id}
              joke={joke.joke}
              votes={joke.votes}
              upvote={() => this.handleVote(joke.id, 1)}
              downvote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
