# Meet App

![meet](https://i.imgur.com/gAunlPc.png) <br>

## Table of Contents

## Overview

Meet App allows users to search, schedule an attend events in their cities.

This app is built using a test-driven development technique (TDD) and is designed as a serverless, progressive web app (PWA). 

MeetApp uses Google Calendar as an API to retrieve information about upcoming events. As this API is protected, authorization access is required. The access authorization (token) is being handled by the serverless backend hosted on AWS.

## Features, User Stories and BDD Scenarios

Feature 1: FILTER EVENTS BY CITY
Scenario 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES.
•	Given: The user hasn’t searched for any city.
•	When: The user opens the app.
•	Then: The user should see a list of all upcoming events.

Scenario 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY.
•	Given: The main page is open.
•	When: The user starts typing in the city textbox.
•	Then: The user should see a list of cities (suggestions) that match what they’ve typed.

Scenario 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST.
•	Given. The user was typing “Berlin” in the city textbox and the list of suggested cities is showing.
•	When: The user selects a city (e.g., “Berlin, Germany”) from the list.
•	Then: Their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city.


Feature 2: SHOW/HIDE AN EVENT’S DETAILS
User story: As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.

Scenario 1: An event element is collapsed by default.
•	Given: The user was in the page to see all the events per city.
•	When: The user doesn’t click on any city to see an event.
•	Then: The event details will not be visible for the user.

Scenario 2: User can expand an event to see its details.
•	Given: The user has selected a city and the lists of events is showing.
•	When: The user clicks on an event.
•	Then: The details of the event will be shown.

Scenario 3: User can collapse an event to hide its details.
•	Given: An event was selected by the user to see its details.
•	When: The user clicks on a button (i.e., “see less” button).
•	Then: The details of the event will be hidden.
 

Feature 3: SPECIFY NUMBER OF EVENTS

User story: As a user, I should be able to specify the number of events I want to view in the app so I can see more or fewer events in the events list at once.

Scenario 1: When user hasn’t specified a number, 32 is the default number.
•	Given: The user has selected a city and the lists of events is showing.
•	When: The user doesn’t specify the number of events to be displayed.
•	Then: The lists will show 32 events by default.

Scenario 2: User can change the number of events they want to see.
•	Given: The user has selected a city and the lists of events is showing.
•	When: The user selects on a filter how many events he/she wants to see.
•	Then: The list will expand or shorten.


Feature 4: USE THE APP WHEN OFFLINE
User story: As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.

Scenario 1: Show cached data when there’s no internet connection.
•	Given: The list of events of a city was loaded and there is no internet.
•	When: The user browses through the list of events.
•	Then: The user received cached data from the last session.

Scenario 2: Show error when user changes the setting (city, time range).
•	Given: The user received a list of events from last session cached data.
•	When: The user changes the settings (i.e., the city).
•	Then: A “no internet connection” error will be displayed.

 
Feature 5: DATA VISUALIZATION
User story: As a user, I would like to be able to see a chart showing upcoming events in each city so that I know what events are organized in which city.
Scenario 1: Show a chart with the number of upcoming events in each city.
•	Given: The user was on main events per city view.
•	When: The user clicks on a “show upcoming events” button.
•	Then: A list of upcoming events will be displayed.


## Technologies & Resources used

- Create React App
- React


-Frontend:
Writen with JavaScript/React and hosted on GitHub Pages. The events are retrieved via Google Calendar API.

-Backend:
Built with Node/Express and hosted on AWS.

-Backend (Database):
Google Calendar API

## Dependencies
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.4.0",
"@testing-library/user-event": "^13.5.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4",
"workbox-background-sync": "^6.5.4",
"workbox-broadcast-update": "^6.5.4",
"workbox-cacheable-response": "^6.5.4",
"workbox-core": "^6.5.4",
"workbox-expiration": "^6.5.4",
"workbox-google-analytics": "^6.5.4",
"workbox-navigation-preload": "^6.5.4",
"workbox-precaching": "^6.5.4",
"workbox-range-requests": "^6.5.4",
"workbox-routing": "^6.5.4",
"workbox-strategies": "^6.5.4",
"workbox-streams": "^6.5.4"

## Dev Dependencies
"gh-pages": "^5.0.0"


## Links
[Live site URL](https://gabcb.github.io/meet/)
[Code Url](https://github.com/GabCB/meet)

