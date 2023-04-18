import React, { Component } from "react";
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { WarningAlert } from "./Alert";

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    warningText:''
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateNumberOfEvents(number) { 
    this.setState({
      numberOfEvents: number,
    })
  }

  updateEvents = (location, inputNumber) => {
    const { selectedLocation } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          numberOfEvents: this.state.numberOfEvents
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
          events :
          events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          numberOfEvents: inputNumber
        });
      });

      if (!navigator.onLine) {
        this.setState ({
          warningText: 'You seem to be offline; events are being pulled from cache.'
        });
      } else {
        this.setState({
          warningText: ''
        });
      }

    }
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <WarningAlert text={this.state.warningText} />
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch  locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
