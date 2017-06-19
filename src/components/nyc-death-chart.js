import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { scale, schemeCategory20, scaleOrdinal, scaleLinear } from 'd3-scale';
import { max, extent } from 'd3-array';
import { select, style } from 'd3-selection';
import { keys } from 'd3-collection';
import { axisBottom, axisLeft, ticks, tickValues, tickSize, tickFormat, tickSizeInner, tickPadding } from 'd3-axis';
import { transition } from 'd3-transition';
import { line, trendline } from 'd3-shape';
import { scaleDiscontinuous, discontinuityRange } from 'd3fc-discontinuous-scale';

class NycDeathChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      w: 1000,
      h: 1000,
      margin: {
        top: 200,
        bottom: 80,
        left: 100,
        right: 80
      },
      loaded: false
    };
    this.createNycDeathChart = this.createNycDeathChart.bind(this)
  }

  componentDidMount() {
    const APP_TOKEN = 'YVZX1ouEpUKnP50pkta3kOsBC'
    const ROOT_URL = "https://data.cityofnewyork.us/resource/uvxr-2jwn.json"
    
    axios.get(ROOT_URL)
    .then(res => {
      const data = res.data;
      this.setState({ data: data, loaded: true });
       
    })
    this.createNycDeathChart()
  }

  componentDidUpdate() {
    this.createNycDeathChart()
  }

  createNycDeathChart(){
    const data = this.state.data.filter(e => e.race_ethnicity !== "Other Race/ Ethnicity" && e.race_ethnicity !== "Not Stated/Unknown" && e.sex == this.props.sex);
    const w = this.state.w;
    const h = this.state.h;
    const margin = this.state.margin;
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;
    const leading_cause = _.uniqBy(data, 'leading_cause').map((e, i)=> e.leading_cause);
    const age_adjusted_death_rate = _.uniqBy(data, 'age_adjusted_death_rate').map((e, i)=> e.age_adjusted_death_rate)
    const tickValues = [2007,2008,2009,2010,2011,2012,2013,2014,2015];
    const tickValuesY = [0, 50, 100, 150, 200, 250, 300, 350];
    const myTickSize = d => {
      if (d === 50) {
        return 20;
      }
      return 10
    }
    const node = this.node
    const xScale = scaleLinear()
        .domain(extent(tickValues, d => d))//****
        .range([0, width]);
    // const yScale = scaleDiscontinuous(scaleLinear())
    //     .discontinuityProvider(discontinuityRange ([50,120],[200,300]))
    //     .domain(extent(age_adjusted_death_rate, d => +d))
    //     .range([height,0]);
    const yScale = scaleLinear()
        // .domain(extent(age_adjusted_death_rate, d => +d))
        .domain(extent(tickValuesY, d => d))
        .range([height,0]);
    const xAxis = axisBottom(xScale)
                  .tickFormat(d => d.toFixed(0))
                  .tickValues(tickValues)
                  .tickSizeInner(20)//****
    const xGridlines = axisBottom(xScale)
                  .tickValues(tickValues) //****
                  .tickSize(height,height) //****
                  .tickFormat("") //*****
    const yAxis = axisLeft(yScale)
                  .ticks(5)
                  .tickSizeInner(20)
                  // .tickSize(20)
    const yGridlines = axisLeft(yScale)
                      .tickSize(-width,0,0) //****
                      .tickFormat("")


    const ordinalColorScale = scaleOrdinal(schemeCategory20);
    const deathRateScale = scaleLinear()
                          .domain(extent(data, d => +d.death_rate))
                          .range([10,50]);  
    let initialize = 1;

    const drawAxis = () => {
      if (!this.state.loaded) {
        select(node).append('g')
          .call(xGridlines)
          .classed('gridline x', true)
          .attr("transform", "translate(0,0)")

        select(node).append('g')
          .call(yGridlines) 
          .classed("gridline y", true)
          .attr("transform", "translate(0,0)")

        select(node).append('g')
          .call(xAxis)
          .classed('axis x', true)
          .attr("transform", "translate(" + 0 + "," + height + ")")
          .append("text")
          .classed("x axis-label", true)
          .attr("transform", "translate(" + width/2 + "," + 55 + ")")
          .text("Year")
          .style('fill', '#ddd');

        select(node).selectAll("g.tick")
          .selectAll("text")
            .attr("x", 50)
            .attr("dy", null)
            .style("text-anchor", null)


        select(node).append('g')
          .call(yAxis)
          .classed("axis y", true)
          .attr("transform", "translate(0,0)")
          .append("text")
          .classed("y axis-label", true)
          .attr("transform", "translate(" + -60 + "," + height/2+ ") rotate(-90)")
          .text("Age Adjusted Death Rate")
          .style('fill', '#ddd');

        select(node).append('g')
          .append("foreignObject")
          .classed("chart-header", true)
          .text("")
          .attr("height", 20)
          .attr("width", width - 400)
          .attr("transform", "translate(400," + -170 + ")")

        select(node).selectAll("text")
        .filter(d => d == '2015').remove()

        initialize = 0;
        }
      }
    
    drawAxis.call(null,this)


    const races = ["Asian", "Black", "Hispanic", "White"]
    const realRaces = ["Asian and Pacific Islander", "Black Non-Hispanic", "Hispanic", "White Non-Hispanic"]   

    //enter() for <g>
    select(node)
      .selectAll('.race')
        .data(races)
        .enter()
        .append('g')
        .attr("class", d => d) //****
        .classed("race", true) //****

    //update() for <g>
    select(node)
      .selectAll('.race')
        .style('fill', (d,i) => ordinalColorScale(i))

    realRaces.forEach((race, i) => {
      let simple_race = race.split(' ')[0]
      let g = select(node).selectAll("g." + simple_race);
      let same_race = data.filter((e,i) => e.race_ethnicity == race)
      let arr = same_race.map((d) =>{
        return {
          race: race,
          rate: parseInt(d.death_rate),
          age_adjusted_death_rate: parseInt(d.age_adjusted_death_rate),
          deaths: d.deaths,
          year: d.year,
          leading_cause: d.leading_cause.split(' (')[0],
          sex: d.sex
        };
      });

      // let same_race_by_causes = [];  

      // leading_cause.forEach(cause => {
      //   let same_race_same_cause = same_race.filter((e,i) => e.leading_cause == cause);
        
      //   if(same_race_same_cause.length > 0){ 

      //     let obj_of_same_race_same_cause = {
      //       key: same_race_by_causes.length + 1,
      //       value: []
      //     }          
      //     obj_of_same_race_same_cause['value'] = same_race_same_cause;

      //     same_race_by_causes.push(obj_of_same_race_same_cause);          
      //   }        
        
      // })

      const valueline = line()
            .x(d => xScale(parseInt(d.year)) + (i+1) * 22 )
            .y(d => yScale(parseInt(d.age_adjusted_death_rate)));

      leading_cause.forEach(cause => {
        let same_race_same_cause = same_race.filter((e,i) => e.leading_cause == cause).sort((a,b)=> a.year - b.year);
        
        if(same_race_same_cause.length > 0){ 
          let class_name = cause.split(' ')[0].split(',')[0].split("'")[0]

          //enter() for line
          g.selectAll("path." + class_name) 
            .data(same_race_same_cause)
            .enter()
              .append("path")
              .classed("trendline " + class_name , true)
          //update() for line
          g.selectAll("path." + class_name) 
              .attr("d", valueline(same_race_same_cause))
              .style("stroke-opacity", 0)
          //exit() for line
          g.selectAll("path." + class_name) 
            .data(same_race_same_cause)
            .exit()
            .remove()
        
        //enter() for circle
        g.selectAll("circle." + class_name)
          .data(same_race_same_cause)
          .enter()
            .append("circle")
            .classed("rate " + class_name, true);
        //update() for circle
        g.selectAll("circle." + class_name)
          .attr("r", d => deathRateScale(parseInt(d.death_rate)))
          .attr("cx", d => xScale(d.year) + (i+1)* 22)
          .attr("cy", d => yScale(d.age_adjusted_death_rate))
          .on("mouseover", (d,i) => {
            let str = "Race: " + d.race_ethnicity + ", ";
            let str_cause = ''
            if (d.leading_cause == "All Other Causes"){
              str_cause = d.leading_cause
            }
            else if (d.leading_cause.split('(')[1].split(':')[1] === undefined){
              str_cause = d.leading_cause.split('(')[0]
            } else {
              str_cause = d.leading_cause.split('(')[0] + "(" + d.leading_cause.split('(')[1].split(':')[0]+ ")"
            }
            // str += "Sex: " + d.sex + ", ";
            str += "\nLeading Cause: " + str_cause + ", ";
            str += "Deaths: " + d.deaths + ", ";
            str += "age_adjusted_death_rate:" + d.age_adjusted_death_rate;
            select(".chart-header").text(str)
            // let causeLabel = [];
            // d.leading_cause.split(' ')
            //   console.log(causeLabel)
            // select(".cause-label").text(d.leading_cause)
            // select('.' + d.leading_cause.split(' ')[0].split(',')[0])
            // .transition()
            // .style("opacity",1)
          })
          .on("mouseout", (d,i) => {
            select(".chart-header").text("")
            // select('.' + d.leading_cause.split(' ')[0].split(',')[0])
            // .transition()
            // .style("opacity", 0.4)
          })
        //exit() for circle
        g.selectAll("circle." + class_name)
          .data(same_race_same_cause)
          .exit()
          .remove();


        
            g.selectAll('.' + class_name)
            .on("mouseover", (d,i) => {
              // console.log('.' + d.race_ethnicity.split(' ')[0] + ' .' + d.leading_cause.split(' ')[0].split(',')[0])
            g.selectAll('.' + d.race_ethnicity.split(' ')[0] + ' .' + d.leading_cause.split(' ')[0].split(',')[0].split("'")[0])
            .transition()
            .style("fill-opacity", 1)
            .style("stroke-opacity", 1)
             let str = "Race: " + d.race_ethnicity + ", ";
            let str_cause = ''
            if (d.leading_cause == "All Other Causes"){
              str_cause = d.leading_cause
            }
            else if (d.leading_cause.split('(')[1].split(':')[1] === undefined){
              str_cause = d.leading_cause.split('(')[0]
            } else {
              str_cause = d.leading_cause.split('(')[0] + "(" + d.leading_cause.split('(')[1].split(':')[0]+ ")"
            }
            // str += "Sex: " + d.sex + ", ";
            str += "\nLeading Cause: " + str_cause + ", ";
            str += "Deaths: " + d.deaths + ", ";
            str += "age_adjusted_death_rate: " + d.age_adjusted_death_rate;
            select(".chart-header").text(str);
          })
            .on("mouseout", (d,i) => {
            g.selectAll('.' + d.race_ethnicity.split(' ')[0] + ' .' + d.leading_cause.split(' ')[0].split(',')[0].split("'")[0])
            .transition()
            .style("fill-opacity", 0.2)
            .style("stroke-opacity", 0)
            select(".chart-header").text("");
          })
        
        }

      })
      // same_race_by_causes.forEach((d,i)=>{
        
      //   let class_name = d.value.map((d,i) => d.leading_cause)[0].split(' ')[0].split(',')[0]
      //   console.log(class_name)
            //enter()
      //     g.selectAll("path." + class_name) 
      //       .data(same_race_by_causes)
      //       .enter()
      //         .append("path")
      //         .classed("trendline " + class_name , true)
      //     //update()
      //     g.selectAll("path." + class_name) 
      //         .attr("d", valueline(d.value))
      //         .attr("fill", 'none');
      //     //exit()
      //     g.selectAll("path." + class_name) 
      //       .data(same_race_by_causes)
      //       .exit()
      //       .remove()
      // })

    });
  
  }

  transform(){
    const translate = `translate(${this.state.margin.left},${this.state.margin.top})`
    return (
      `${translate}`
    );
  }
  
  render(){
    
    return (
      <svg id='chart' width={this.state.w} height={this.state.h} >
        <g className='display' transform={this.transform()} ref={node => this.node = node}></g>
      </svg>
    );
  }  
}

function mapStateToProps({ nycDeathChartData }){
  return { nycDeathChartData };
}


export default connect(mapStateToProps)(NycDeathChart);