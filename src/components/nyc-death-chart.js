import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import { scale, schemeCategory10, scaleOrdinal, scaleLinear, scaleBand, bandwidth, rangeRoundBands } from 'd3-scale';
import { max, extent } from 'd3-array'
import { select, style } from 'd3-selection'
import { axisBottom, axisLeft, ticks, tickValues, tickSize, tickFormat } from 'd3-axis'
import { keys } from 'd3-collection'
import { transition } from 'd3-transition'
import { line, trendline } from 'd3-shape'

class NycDeathChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      w: 1000,
      h: 700,
      margin: {
        top: 100,
        bottom: 60,
        left: 80,
        right: 300
      },
      leading_cause: []
    };
    this.createNycDeathChart = this.createNycDeathChart.bind(this)
  }

  componentDidMount() {
    const APP_TOKEN = 'YVZX1ouEpUKnP50pkta3kOsBC'
    const ROOT_URL = "https://data.cityofnewyork.us/resource/uvxr-2jwn.json"
    
    axios.get(ROOT_URL)
    .then(res => {
      const data = res.data;
      this.setState({ data });
       
    })
    this.createNycDeathChart()
  }

  componentDidUpdate() {
    this.createNycDeathChart()
  }

  createNycDeathChart(){
    const data = this.state.data.filter(e => e.race_ethnicity !== "Other Race/ Ethnicity" && e.race_ethnicity !== "Not Stated/Unknown" && e.sex == "M");
    const w = this.state.w;
    const h = this.state.h;
    const margin = this.state.margin;
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    // const leading_cause = _.uniqBy(data, 'leading_cause').map((e, i)=> e.leading_cause);
    const leading_cause = ["Accidents Except Drug Posioning (V01-X39, X43, X45-X59, Y85-Y86)", "All Other Causes", "Assault (Homicide: Y87.1, X85-Y09)", "Cerebrovascular Disease (Stroke: I60-I69)", "Chronic Liver Disease and Cirrhosis (K70, K73)", "Chronic Lower Respiratory Diseases (J40-J47)", "Diabetes Mellitus (E10-E14)", "Diseases of Heart (I00-I09, I11, I13, I20-I51)", "Essential Hypertension and Renal Diseases (I10, I12)", "Human Immunodeficiency Virus Disease (HIV: B20-B24)", "Influenza (Flu) and Pneumonia (J09-J18)", "Intentional Self-Harm (Suicide: X60-X84, Y87.0)", "Malignant Neoplasms (Cancer: C00-C97)", "Mental and Behavioral Disorders due to Accidental …ve Substance Use (F11-F16, F18-F19, X40-X42, X44)", "Congenital Malformations, Deformations, and Chromosomal Abnormalities (Q00-Q99)", "Nephritis, Nephrotic Syndrome and Nephrisis (N00-N07, N17-N19, N25-N27)", "Certain Conditions originating in the Perinatal Period (P00-P96)"]
      // .split(' (')[0])
    // const deaths = _.uniqBy(data, 'deaths').map((e, i)=> e.deaths)
    const age_adjusted_death_rate = _.uniqBy(data, 'age_adjusted_death_rate').map((e, i)=> e.age_adjusted_death_rate)

    const tickValues = [2007,2008,2009,2010,2011,2012,2013,2014];
    const node = this.node
    const xScale = scaleLinear()
        .domain(extent(tickValues, d => d))//****
        .range([0, width]);
    const yScale = scaleLinear()
        // scaleBand()
       // .domain(leading_cause) //****
       .domain(extent(age_adjusted_death_rate, d => +d))
       .range([height,0]);
    const xAxis = axisBottom(xScale)
                  .tickFormat(d => d.toFixed(0))
                  .tickValues(tickValues)//****
    const xGridlines = axisBottom(xScale)
                  .tickValues(tickValues) //****
                  .tickSize(height,height) //****
                  .tickFormat("") //*****
    const yAxis = axisLeft(yScale)
                  .ticks(5)
                  .tickSize(10)
                  // .ticks(leading_cause.length) //****
                  // .tickSize(5) //****
                  // .tickFormat(d => d)
                  
    const yGridlines = axisLeft(yScale)
                      .tickSize(-width,0,0) //****
                      .tickFormat("")

    const valueline = line()
                .x(d => xScale(parseInt(d.year)) )
                .y(d => {
                  console.log(d)
                  return yScale(parseInt(d.age_adjusted_death_rate))});

    const ordinalColorScale = scaleOrdinal(schemeCategory10);
    // const ageAdjustedRateScale = scaleLinear() //****
    //                       .domain(extent(data, d => +d.age_adjusted_death_rate))
    //                       .range([5,50])
    const deathRateScale = scaleLinear()
                          .domain(extent(data, d => +d.death_rate))
                          .range([10,20]);
    

    
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

        select(node).select('.y.axis')
          .append("text")
          .classed("y axis-label", true)
          .attr("transform", "translate(" + -56 + "," + height/2+ ") rotate(-90)")
          .text("Cause of Death");

        select(node).select('.x.axis')
          .append("text")
          .classed("x axis-label", true)
          .attr("transform", "translate(" + width/2 + "," + 48 + ")")
          .text("Year")

        select(node).append('g')
          .append("text")
          .classed("chart-header", true)
          .text("")
          .attr("transform", "translate(0," + -24 + ")")
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
        .on("mouseover", (d,i) => {
          select("." + d)
            .transition()
            .style("opacity", 1);
        })
        .on("mouseout", (d,i) => {
          select("." + d)
            .transition()
            .style("opacity", 0.4);
        })

    realRaces.forEach(race => {
      let simple_race = race.split(' ')[0]
      let g = select(node).selectAll("g." + simple_race);
      let same_race = data.filter((e,i) => e.race_ethnicity == race)
      let arr = same_race.map((d,i) =>{
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

      leading_cause.forEach(cause => {
        let same_race_same_cause = same_race.filter((e,i) => e.leading_cause == cause);
        
        if(same_race_same_cause.length > 0){ 
          let class_name = cause.split(' ')[0].split(',')[0]

          //enter()
          g.selectAll("path." + class_name) 
            .data(same_race_same_cause)
            .enter()
              .append("path")
              .classed("trendline " + class_name , true)
          //update()
          g.selectAll("path." + class_name) 
              .attr("d", valueline(same_race_same_cause))
              .attr("fill", 'none');
          //exit()
          g.selectAll("path." + class_name) 
            .data(same_race_same_cause)
            .exit()
            .remove()
        }
      })

        //enter()
        g.selectAll(".age_adj_rate")
          .data(arr)
          .enter()
            .append("circle")
            .classed("age_adj_rate", true);
        //update()
        g.selectAll(".age_adj_rate")
          // .attr("r", 20)
          // .attr("r", d => ageAdjustedRateScale(d.age_adj_rate))
          .attr("r", d => deathRateScale(d.rate))
          .attr("cx", d => xScale(d.year))
          .attr("cy", d => yScale(d.age_adjusted_death_rate))
          .on("mouseover", (d,i) => {
            let str = "Race: " + d.race + ", ";
            str += "Sex: " + d.sex + ", ";
            str += "Leading Cause: " + d.leading_cause + ", ";
            str += "Deaths: " + d.deaths + ", ";
            str += "age_adjusted_death_rate:" + d.age_adjusted_death_rate;
            select(".chart-header").text(str);
          })
          .on("mouseout", (d,i) => {
            select(".chart-header").text("");
          })
        //exit()
        g.selectAll(".age_adj_rate")
          .data(arr)
          .exit()
          .remove();
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