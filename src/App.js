import React, { Component } from "react";
import "./App.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';

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

  getEvents().then((events) => {
    if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
    }
  });
    
    const accessToken = localStorage.getItem('access_token');
    console.log ('access_token', accessToken);
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    console.log ("is token valid?", isTokenValid);
    const searchParams = new URLSearchParams(window.location.search);

    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents),  locations: extractLocations(events) }); //this.setState({ events, locations: extractLocations(events) });
      }
    });
  }
  }
    
  componentWillUnmount(){
    this.mounted = false;
  }

   // API data for charts
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  updateNumberOfEvents(number) { 
    this.setState({
      numberOfEvents: number,
    });
    this.updateEvents(this.state.selectedLocation);
  }

  updateEvents = (location, inputNumber) => {
    const { eventCount, selectedLocation } = this.state; 
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount); 
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          
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
          eventCount: inputNumber 
        });
      })
    }
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const offlineMessage = navigator.onLine
      ? ''
      : 'The app has no connection to the internet. The information displayed may not be up-to-date.';

    return (
      <div className="App">
        <div>
          <h1>Meet App</h1>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents}/>
          <WarningAlert text={offlineMessage}></WarningAlert>
        </div>
        
        <EventList events={this.state.events} /> 
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
