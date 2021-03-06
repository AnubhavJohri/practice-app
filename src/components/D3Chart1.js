import React, { Component } from 'react'
import '../App.css'
import * as d3 from 'd3';

class D3Chart1 extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
        //   console.log("barchart.js=",this.props.data);
    }

    createBarChart() {
        const data = [
            { "Month": "JAN", "quantity": 15, "quantity1": 8},
            { "Month": "FEB", "quantity": 24, "quantity1": 15},
            { "Month": "MARCH", "quantity": 3, "quantity1": 3},
            { "Month": "APRIL", "quantity": 8, "quantity1": 5},
            { "Month": "MAY", "quantity": 18, "quantity1": 20}]
        
        //Variable that's going to be displayed at Y-Axis and
        //Each variable on Y-Axis will have a bar displayed
        const yKeyName="Month";
        const colors = ["#17a2b8", "lightblue","blue"];
        const margin = 200;
        

        var keys = Object.keys(data[0]).filter(d => d !== yKeyName);
        console.log("data and dataset in barchart=", data, keys);
        var svg = d3.select("svg");
        var width = svg.attr("width") - margin;
        var height = svg.attr("height") - margin;

        svg.append("text")
            .attr("transform", "translate(80,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Stacked Bar Graph")
        
        //arr :- all Key values that have to be stacked in 1 bar 
        //d :- 1 data object out of the whole data array containing the whole object of data passed
        //.i.e of format :-{ "food": "Sandwiches", "quantity": 18, "quantity1": 20 }
        //Function is used to RETURN TOTAL of all the KEY VALUES you want to display in 1 bar
        //USAGE:- when we need to know the length of 1 stacked bar say:-{Month:"JAN",Prod1:18,Prod2:35,Prod3:10}
        //It will return the value PROD1+PROD2+PROD3 of Key "JAN"
        const calculateTotal = (arr,d) =>{
            let total=0;
            arr.forEach(ele=>total+=d[ele]);
            return total;
        }

        //1.)XSCALE
        var xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.4)
            .domain(data.map(function (d) { return d[yKeyName]; }));
        //2.)YSCALE
        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function (d) { 
                return (calculateTotal(keys,d) + 2);
            })])
        //3.)ZSCALE
        var zScale = d3.scaleOrdinal()
            .range(colors)
            .domain(keys);

        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        // .attr("transform", "translate(100,100)")      // This controls the rotate position of the Axis
        
        // g.append("g")
        // .attr("transform", "translate(0,200)")
        //     .call(d3.axisBottom(xScale))
        //     .selectAll("text")
        //     .attr("transform", "translate(-10,10)rotate(-45)")
        //     .style("text-anchor", "end")
        //     .style("font-size", 20)
        //     .style("fill", "#69a3b2")

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - 250)
            .attr("x", width - 150)
            .attr("text-anchor", "end")
            .attr("font-size", "12px")
            .attr("stroke", "black")
            .text("Leads");

        g.append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "-5.1em")
            .attr("dx", "-5.1em")
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Number of Leads in 1000")
            .attr("font-size", "12px")


        g.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft()
                .scale(yScale)
                .tickSize(-width, 0, 0)
                .tickFormat(''))


        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter()
            .append("g")
            .attr("fill", function (d) { console.log("fill=", d); return zScale(d.key); })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { console.log("x1=", d); return xScale(d.data[yKeyName]); })
            .attr("y", function (d) { console.log("y=", d); return yScale(d[1]); })
            .attr("height", function (d) { console.log("height=", d); return yScale(d[0]) - yScale(d[1]); })
            .attr("width", xScale.bandwidth());
        // // Create groups for each series, rects for each segment 
        // var groups = svg.selectAll("g.cost")
        //     .data(dataset)
        //     .enter().append("g")
        //     .attr("class", "cost")
        //     .style("fill", function (d, i) { return colors[i]; });

        // // var rect = groups.selectAll("rect")
        //      groups.selectAll("rect")
        //     .data(function (d) { return d; })
        //     .enter()
        //     .append("rect")
        //     .attr("x", function (d) { return xScale(d.x); })
        //     .attr("y", function (d) { return yScale(d.y); })
        //     .attr("height", function (d) { return y(d.y0) - y(d.y0 + d.y); })
        //     .attr("width", xScale.bandwidth())
        //     // .on("mouseover", function () { tooltip.style("display", null); })
        // .on("mouseout", function () { tooltip.style("display", "none"); })
        // .on("mousemove", function (d) {
        //     var xPosition = d3.mouse(this)[0] - 15;
        //     var yPosition = d3.mouse(this)[1] - 25;
        //     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        //     tooltip.select("text").text(d.y);
        // });


        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d[yKeyName]) + xScale.bandwidth() / 2 })
                .y(function (d) { return yScale(calculateTotal(keys,d)) }))
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function (d) { return xScale(d[yKeyName]) + xScale.bandwidth() / 2 })
            .attr("cy", function (d) { return yScale(calculateTotal(keys,d)) })
            .attr("r", 4)
            .attr("fill", "blue");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ffc107")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d[yKeyName]) + xScale.bandwidth() / 2 })
                .y(function (d) { return yScale(calculateTotal(keys,d) + 2) }))
        g.selectAll("dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot1") // Assign a class for styling
            .attr("cx", function (d) { return xScale(d[yKeyName]) + xScale.bandwidth() / 2 })
            .attr("cy", function (d) { return yScale(calculateTotal(keys,d) + 2) })
            .attr("r", 4)
            .attr("fill", "blue");

    }
    render() { return <svg width="600" height="500"></svg> }
}
export default D3Chart1;