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
            { "food": "Tacos", "quantity": 15, "quantity1": 8 },
            { "food": "Hotdogs", "quantity": 24, "quantity1": 15 },
            { "food": "Pizza", "quantity": 3, "quantity1": 3 },
            { "food": "Cheese Burger", "quantity": 8, "quantity1": 5 },
            { "food": "Sandwiches", "quantity": 18, "quantity1": 20 }]
        //DATASET KEYS HAVE TO BE HARDCODED FOR EACH GRAPH

        var keys = Object.keys(data[0]).filter(d => d !== "food");
        var colors = ["blue", "lightblue"];
        console.log("data and dataset in barchart=", data, keys);
        var svg = d3.select("svg");
        var margin = 200;
        var width = svg.attr("width") - margin;
        var height = svg.attr("height") - margin;

        svg.append("text")
            .attr("transform", "translate(80,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Stacked Bar Graph")

        var xScale = d3.scaleBand()
            .range([0, width])
            .padding(0.4)
            .domain(data.map(function (d) { return d.food; }));
        var yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, function (d) { return (d.quantity + d.quantity1); }) + 2]);
        var zScale = d3.scaleOrdinal()
            .range(["#17a2b8", "lightblue"])
            .domain(keys);


        var g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

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
            .attr("fill", function (d) {console.log("fill=",d);return zScale(d.key);})
            .selectAll("rect")
            .data(function (d) {return d;})
            .enter().append("rect")
            .attr("x", function (d) {console.log("x1=",d);return xScale(d.data.food);})
            .attr("y", function (d) {console.log("y=",d);return yScale(d[1]);})
            .attr("height", function (d) {console.log("height=",d);return yScale(d[0]) - yScale(d[1]);})
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
                .x(function (d) { return xScale(d.food) + xScale.bandwidth() / 2 })
                .y(function (d) { return yScale(d.quantity + d.quantity1) }))
        g.selectAll(".dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot") // Assign a class for styling
            .attr("cx", function (d) { return xScale(d.food) + xScale.bandwidth() / 2 })
            .attr("cy", function (d) { return yScale(d.quantity + d.quantity1) })
            .attr("r", 4)
            .attr("fill", "blue");
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#ffc107")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return xScale(d.food) + xScale.bandwidth() / 2 })
                .y(function (d) { return yScale(d.quantity + d.quantity1 + 2) }))
        g.selectAll("dot")
            .data(data)
            .enter().append("circle") // Uses the enter().append() method
            .attr("class", "dot1") // Assign a class for styling
            .attr("cx", function (d) { return xScale(d.food) + xScale.bandwidth() / 2 })
            .attr("cy", function (d) { return yScale(d.quantity + d.quantity1 + 2) })
            .attr("r", 4)
            .attr("fill", "blue");

    }
    render() { return <svg width="600" height="500"></svg> }
}
export default D3Chart1;