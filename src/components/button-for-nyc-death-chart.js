import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NycDeathChart from '../components/nyc-death-chart.js';
// import { fetchWeather } from '../actions/index';

class ButtonForNycDeathChart extends Component {
  constructor(props){
    super(props);

    this.state = { term: ''};

    this.onClickMale = this.onClickMale.bind(this)
    this.onClickFemale = this.onClickFemale.bind(this)
  }

  onClickMale(event) {
    this.setState({ term: 'M' })
  }

  onClickFemale(event) {
    this.setState({ term: 'F'})
  }

  render() {
    return (
        <div>
          <h2> New York City Leading Causes of Death Chart </h2>
          
            
            <button type="button" className="btn btn-primary death-btn male" onClick={this.onClickMale}>Male</button>
            <button type="button" className="btn btn-success death-btn female" onClick={this.onClickFemale}>Female</button>
          
          
            
          
          {this.state.term == 'M' ? <NycDeathChart sex='M'/> : <NycDeathChart sex='F'/>}  
        </div>

    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchWeather }, dispatch);
// }

export default ButtonForNycDeathChart;
// null is for whenever we are passing in a function that is supposed to map 
// our dispatch to the props of our container it always goes in as the second argument 
// in here. 
// it's like this container is saying to redux that it doesn't need any state here.



