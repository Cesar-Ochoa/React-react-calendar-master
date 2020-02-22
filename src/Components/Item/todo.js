
import React, { Component } from 'react';

import List from './list';

export default class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
    };
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      term: '',
      items: [...this.state.items, this.state.term]
    });
  }

  render() {
    return (
      <div>
        <form className="Todo" onSubmit={this.onSubmit}>
          <input value={this.state.term} onChange={this.onChange} placeholder="add a new event..."/>
          <button>Add</button>
        </form>
        <List items={this.state.items} />
      </div>
    );
  }
}