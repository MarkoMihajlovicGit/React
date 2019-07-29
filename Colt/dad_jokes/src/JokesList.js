import React, { Component } from 'react';
import Joke from './Joke';
import axios from 'axios';
//import uuid from 'uuid/v4';
import './JokesList.css';

export default class JokesList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem('jokes') || '[]'),
      loading: false
    };
    this.seenJokes = new Set(this.state.jokes.map(j => j.id));
    console.log(this.seenJokes);
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.setState({ loading: true }, this.getJokes);
    }
  }

  getJokes = async () => {
    try {
      const url = 'https://icanhazdadjoke.com/';
      let jokes = [];
      while (jokes.length < this.props.numJokesToGet) {
        let res = await axios.get(url, {
          headers: { Accept: 'application/json' }
        });

        let newJokeId = res.data.id;
        let newJoke = res.data.joke;
        const isUnique = !this.seenJokes.has(newJokeId);
        console.log(isUnique);
        if (isUnique) {
          jokes.push({ id: newJokeId, joke: newJoke, votes: 0 });
          this.seenJokes.add(newJokeId);
        } else {
          console.log('FOUND A DUPLICATE');
          console.log(newJoke);
        }
      }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      this.setState({ loading: false });
      console.log(e);
    }
  };

  handleVote = (id, delta) => {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  };

  handleClick = () => {
    this.setState({ loading: true }, this.getJokes);
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

          <button className="JokeList-getmore" onClick={this.handleClick}>
            New Jokes
          </button>
        </div>

        {!this.state.loading ? (
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
        ) : (
          <div className="Jokelist-spinner">
            <i className="far fa-8x fa-laugh fa-spin" />
            <h1 className="JokeList-title h1-spinner">Loading...</h1>
          </div>
        )}
      </div>
    );
  }
}
//}
