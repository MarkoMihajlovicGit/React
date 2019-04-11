import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  //funct to be called when user types in input
  onInputChange = event => {
    this.setState({ term: event.target.value });
  };
  //funct to be called when user press enter and sumbit form
  onFormSubmit = event => {
    event.preventDefault();
    //TODO: Make sure we call
    //callback from parent
    this.props.onTermSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment ">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input
              type="text"
              value={this.state.term}
              onChange={this.onInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
