# Test task - analog clock

This is a test task, which is a combination of the interaction of an analog clock with a world map. The application has
buttons for changing the user's time zone, as well as an interactive map that highlights the active area with a blue
glow (the area that matches the current value of the time zone)

**Deploy:** https://world-clock-test-app.netlify.app/

[![clock.png](https://i.postimg.cc/jSJH4BBn/Screenshot-2023-07-03-at-10-39-19-Clock-app.png)](https://postimg.cc/G4dTcgLb)

## Setup

Make sure to install the dependencies:

```bash
npm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Principle of operation:

The central clock displays the user's current time, two small clocks shows the time from previous and past time zone.

When you click on the "increment" button, one hour is added to the user's current time.

When you click on the "decrement" button, one hour decreases from the user's current time.

The current time zone on the central clock highlights the zone corresponding to it on the map.

When you click on the hour hand of the clock, you can drag it forward or backward an hour, and according to this, the time zones on the map and the clock will change.

**Additional functionality:** When clicking on one of the zones on the map, the current time of the user will be overwritten by the time corresponding to the time zone of the selected zone.
