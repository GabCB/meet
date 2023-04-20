import React, { Component } from "react";
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;
    //to view the changes on localhost
    if (window.location.href.startsWith("http://localhost")) {
      getEvents().then((events) => {
        if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    
    const accessToken = localStorage.getItem('access_token');
    console.log ('access_token', accessToken);
    const isTokenValid = accessToken !== null && navigator.onLine ? await checkToken(accessToken) : false;
    console.log ("is token valid?", isTokenValid);
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) && !navigator.onLine});
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) }); //this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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
          numberOfEvents: inputNumber
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
      })
    }
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    return (
      <div className="App">
        <div>
          <h1>Meet App</h1>
          <CitySearch  locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        </div>
        
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        
      </div>
    );
  }
}

export default App;
