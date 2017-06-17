import React, { Component } from 'react';
import Navigation from './navigation.js';
import BarChart from '../components/bar-chart.js';
import CircleChart from '../components/circle-chart.js';
import NycDeathChart from '../components/nyc-death-chart.js';

export default class App extends Component {
  render() {
    return(
      <div>
        <Navigation />
        <BarChart />
        <CircleChart />
        <NycDeathChart />
      </div>
    );
  }
}