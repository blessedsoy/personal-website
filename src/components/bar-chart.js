import React, { Component } from 'react';
import { connect } from 'react-redux';
// import '../../style/style.css'
import { scale, schemeCategory20, scaleOrdinal, scaleLinear, scaleBand, bandwidth } from 'd3-scale';
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'



class BarChart extends Component {

   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
      this.transform = this.transform.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const barChartData = this.props.barChartData[0];
      const data = barChartData.data;
      const w = barChartData.w;
      const h = barChartData.h;
      const margin = barChartData.margin;
      const width = w - margin.left - margin.right;
      const height = h - margin.top - margin.bottom;

    // translate : `translate(${margin.left},${margin.top})`

      const node = this.node
      const dataMax = max(data, d => d.value)
      const xScale = scaleBand()
          .domain(data.map(entry => entry.key))
          .range([0, width]);
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([height, 0]);
      const xAxis = axisBottom(xScale)
      const yAxis = axisLeft(yScale)
      const ordinalColorScale = scaleOrdinal(schemeCategory20);

   select(node)
      .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .classed("bar", true)
   select(node)
      .selectAll('.bar-label')
        .data(data)
        .enter()
          .append('text')
          .classed('bar-label', true)
   
   select(node)
      .selectAll('.bar')
      .data(data)
      .exit()
      .remove()
    select(node)
      .selectAll('.bar-label')
      .data(data)
      .exit()
      .remove()

   select(node)
      .selectAll('.bar')
        .data(data)
        .style('fill', (d,i) => ordinalColorScale(i))
        .attr('x', (d,i) => xScale(d.key))
        .attr('y', (d,i) => yScale(d.value))
        .attr('height', d => height - yScale(d.value))
        .attr('width', xScale.bandwidth())

    select(node)
      .selectAll('.bar-label')
        .data(data)
        .attr('x', (d,i) => xScale(d.key) + (xScale.bandwidth()/2))
        .attr('dx', 0)
        .attr('y', (d,i) => yScale(d.value))
        .attr('dy', -6)
        .text(d => d.value)

    select(node).append('g')
        .classed('x axis', true)
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .call(xAxis)

    select(node).append('g')
        .classed("y axis", true)
        .attr("transform", "translate(0,0)")
        .call(yAxis)   

    }
    transform(){
      const barChartData = this.props.barChartData[0]
      const translate = `translate(${barChartData.margin.left},${barChartData.margin.top})`

      return (
        `${translate}`
      );
    }

render() {
      const barChartData = this.props.barChartData[0]
      return (
        // <svg id='chart' width={barChartData.w} height={barChartData.h} >
        //   <g className='display' transform={this.transform()} ref={node => this.node = node}></g>
        // </svg>
        <div>
        </div>
      );
   }
}

function mapStateToProps({ barChartData }){
  return { barChartData };
}


export default connect(mapStateToProps)(BarChart);