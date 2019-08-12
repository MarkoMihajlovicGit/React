import React, { Component } from 'react';
import './DogList.css';
import { Link } from 'react-router-dom';

export default class DogList extends Component {
  render() {
    return (
      <div className="DogList">
        <h1 className="display-1 text-center my-5">Dog List</h1>

        <div className="row">
          {this.props.dogs.map(dog => (
            <div className="Dog  col-lg-4 text-center" key={dog.name}>
              <Link to={`/dogs/${dog.name}`}>
                <img src={dog.src} alt={dog.name} />
              </Link>

              <h3 className="mt-3">
                <Link className="underline" to={`/dogs/${dog.name}`}>
                  {dog.name}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
