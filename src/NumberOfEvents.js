import React, { Component } from "react";

class NumberOfEvents extends Component {
  constructor() {
    super();
    this.state = {
      query: 32,
    };
  }
  

  handleNumberChange = (event) => {
    const value = event.target.value;
    if (value >= 1 || value <= 32) {
      this.setState({
        query: value,
      });
      this.props.updateEvents(this.props.selectedCity, value);
    }
  };

  render() {
    return (
      <div>
        <input
          type="number"
          className="NumberOfEvents"
          min={1}
          max={32}
          value={this.state.query}
          onChange={this.handleNumberChange}  
        />
      </div>
    );
  }
}

export default NumberOfEvents;



/*
class NumberOfEvents extends Component {
  state = {
  number: 32 //change to eventCount?
}

  handleNumberChange = (event) => {
    let inputValue = event.target.value;
      this.props.updateEvents(null, inputValue);
      this.setState({ number: inputValue }); //change to eventCount?
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          id="number-of-events"
          type="number"
          className="number"
          value={this.state.number} //change to eventCount?
          onChange={this.handleNumberChange}  
        />
      </div>
    );
  }
}

export default NumberOfEvents;
*/