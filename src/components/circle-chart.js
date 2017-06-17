import React, { Component } from 'react';
import { connect } from 'react-redux';
// import '../../style/style.css'
import { scale, schemeCategory10, scaleOrdinal, scaleLinear, scaleBand, bandwidth } from 'd3-scale';
import { max, extent } from 'd3-array'
import { select, style } from 'd3-selection'
import { axisBottom, axisLeft, ticks, tickValues, tickSize, tickFormat } from 'd3-axis'
import { keys } from 'd3-collection'
import { transition } from 'd3-transition'


class CircleChart extends Component {

  constructor(props){
    super(props)
    this.createCircleChart = this.createCircleChart.bind(this)
  }
  componentDidMount() {
    this.createCircleChart()
  }
  componentDidUpdate() {
    this.createCircleChart()
  }
  createCircleChart() {
    const circleChartData = this.props.circleChartData[0];
    const data = circleChartData.data;
    const w = circleChartData.w;
    const h = circleChartData.h;
    const margin = circleChartData.margin;
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const node = this.node
    const xScale = scaleLinear()
        .domain(extent(data, d => d.age))
        .range([0, width]);
    const yScale = scaleLinear()
       .domain([1,5]) //****
       .range([height,0]);
    const tickValues = [18,25,32,39,46,53,60,67,74];
    const xAxis = axisBottom(xScale)
                  .tickValues(tickValues) //****
    const xGridlines = axisBottom(xScale)
                  .tickValues(tickValues) //****
                  .tickSize(height,height) //****
                  .tickFormat("") //*****
    const yAxis = axisLeft(yScale)
                  .ticks(5) //****
                  .tickSize(20) //****
                  .tickFormat(d => d.toFixed(1)) //****
    const yGridlines = axisLeft(yScale)
                      .tickSize(-width,0,0) //****
                      .tickFormat("") //****
    const responseScale = scaleLinear() //****
                          .domain(extent(data, d => d.responses))
                          .range([2,15]) //****
    const ordinalColorScale = scaleOrdinal(schemeCategory10);
    let initialize = 1;
      
    const drawAxis = () => {
      if (initialize) {
        select(node).append('g')
          .classed('gridline x', true)
          .attr("transform", "translate(0,0)")
          .call(xGridlines)

        select(node).append('g')
          .classed("gridline y", true)
          .attr("transform", "translate(0,0)")
          .call(yGridlines) 

        select(node).append('g')
          .classed('axis x', true)
          .attr("transform", "translate(" + 0 + "," + height + ")")
          .call(xAxis)

        select(node).append('g')
          .classed("axis y", true)
          .attr("transform", "translate(0,0)")
          .call(yAxis)

        select(node).select('.axis y')
          .append("text")
          .classed("y axis-label", true)
          .attr("transform", "translate(" + -56 + "," + height/2+ ") rotate(-90)")
          .text("Rating (1=Low, 5=High)");

        select(node).select('.axis x')
          .append("text")
          .classed("x axis-label", true)
          .attr("transform", "translate(" + width/2 + "," + 48 + ")")
          .text("Customer age")

        select(node).append('g')
          .append("text")
          .classed("chart-header", true)
          .text("")
          .attr("transform", "translate(0," + -24 + ")")
        initialize = 0;
      }
    }
    drawAxis.call(null,this)


    const donuts = keys(data[0]).filter(d => d !== 'age' && d !== 'responses'); //****

    //enter() for <g>
    select(node)
      .selectAll('.donut')
        .data(donuts)
        .enter()
        .append('g')
        .attr("class", d => d) //****
        .classed("donut", true) //****

    //update() for <g>
    select(node)
      .selectAll('.donut')
        .style('fill', (d,i) => ordinalColorScale(i))
        .on("mouseover", (d,i) => {
          select("." + d)
            .transition()
            .style("opacity", 1);
        })
        .on("mouseout", (d,i) => {
          select("." + d)
            .transition()
            .style("opacity", 0.1);
        })

    donuts.forEach(donut => {
      let g = select(node).selectAll("g." + donut);
      let arr = data.map(d =>{
        return {
          key: donut,
          value: d[donut],
          age: d.age,
          responses: d.responses
        };
      });

      //enter()
      g.selectAll(".response")
        .data(arr)
        .enter()
          .append("circle")
          .classed("response", true);
      //update()
      g.selectAll(".response")
        .attr("r", d => responseScale(d.responses))
        .attr("cx", d => xScale(d.age))
        .attr("cy", d => yScale(d.value))
        .on("mouseover", (d,i) => {
          let str = d.key + " Donut: ";
          str += "Age: " + d.age + ", ";
          str += "Responses: " + d.responses + ", ";
          str += "Average Rating: " + d.value;
          str += ""
          select(".chart-header").text(str);
        })
        .on("mouseout", (d,i) => {
          select(".chart-header").text("");
        })
      //exit()
      g.selectAll(".response")
        .data(arr)
        .exit()
        .remove();
    });

    }
    transform(){
      const circleChartData = this.props.circleChartData[0]
      const translate = `translate(${circleChartData.margin.left},${circleChartData.margin.top})`

      return (
        `${translate}`
      );
    }

render() {
  // console.log(this.props.circleChartData[0].data)
  const data = this.props.circleChartData[0].data
  const donuts = keys(data[0]).filter(d => d !== 'age' && d !== 'responses');
  donuts.forEach(donut => {
      let arr = data.map(d =>{
        return {
          key: donut,
          value: d[donut],
          age: d.age,
          responses: d.responses
        };
      });
    // console.log(arr)
  });
  
  const circleChartData = this.props.circleChartData[0]
      return (
        // <svg id='chart' width={circleChartData.w} height={circleChartData.h} >
        //   <g className='display' transform={this.transform()} ref={node => this.node = node}></g>
        // </svg>
        <div></div>
      );
   }
}

function mapStateToProps({ circleChartData }){
  return { circleChartData };
}


export default connect(mapStateToProps)(CircleChart);