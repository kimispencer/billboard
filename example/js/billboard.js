/*
	* Unroll
*/

// data.length
var numberOfPoints = 30;
var radius = 60
var margin = {top: 20,left: 20}

// length of line should be based off the radius of the circle
var lineLength = 2 * radius * Math.PI

// x,y coords of points on the circle
var circleData = $.map(Array(numberOfPoints), function (d, i) {
    var imag = margin.left + lineLength / 2 + radius * Math.sin(2 * i * Math.PI / (numberOfPoints - 1))
    var real = margin.top + radius - radius * Math.cos(2 * i * Math.PI / (numberOfPoints - 1))
    return {x: imag, y: real}
})

// x,y coords of points on the line
var lineData = $.map(Array(numberOfPoints), function (d, i) {
    var y = margin.top + 2 * radius;
    var x = margin.left + i * lineLength / (numberOfPoints - 1)
    return { x: x, y: y}
}).reverse()

//This is the accessor function we talked about above
var lineFunction = d3.svg.line()
    .x(function (d) {return d.x;})
    .y(function (d) {return d.y;})
    .interpolate("cardinal");

//The SVG Container
var svgContainer = d3.select("body").append("svg")
    .attr("width", 400)
    .attr("height", 200);

//The Circle SVG Path we draw
var circle = svgContainer.append("g")
    .append("path")
    .data([circleData])
    .attr("d", lineFunction)
    .attr("class", "circle")
    .on("click", transitionToLine)

//console.log(circleData)
// x,y coords of points on the circle

// circleData.forEach(function(d,i) {
// 	console.log(d)
// 	svgContainer.append("circle")
// 	    .style("fill", "black")
// 	    .attr("r", 2)
// 	    .attr("cx", d.x)
// 	    .attr("cy", d.y);
// })

// console.log(lineData)
// x,y coords of points on the line

// lineData.forEach(function(d, i) {
// 	svgContainer.append("circle")
// 		.style("fill", "red")
// 		.attr("r", 2)
// 		.attr("cx", d.x)
// 		.attr("cy", d.y);
// })

function transitionToLine() {
    circle.data([lineData])
        .transition()
        .duration(1000)
        .ease("linear")
        // .attr('d', lineFunction)
    circle.on("click", transitionToCircle)
}
function transitionToCircle() {
    circle.data([circleData])
        .transition()
        .duration(1000)
        .ease("linear")
        // .attr('d', lineFunction)
    circle.on("click", transitionToLine)
}


    //The second SVG, a Line:
var line = svgContainer.append("path")
    .attr("d", lineFunction(lineData))
    .attr("class", "line")



// /*
// 	* SVG chart
// */

// // 1. RUNS BEFORE .TSV FILE DOWNLOAD

// // init vars (non-data dependent)
// var margin = {top: 20, right: 30, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// var scaleX = d3.scale.ordinal()
//     .rangeRoundBands([0, width], 0.1);

// var scaleY = d3.scale.linear()
//     .range([height, 0]);

// var xAxis = d3.svg.axis()
//     .scale(scaleX)
//     .orient("bottom");

// var yAxis = d3.svg.axis()
//     .scale(scaleY)
//     .orient("left");

// var chart = d3.select(".chart")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr('class', 'chart-container')
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // load the data from external .tsv file
// d3.tsv('letter-frequency.tsv', type, function(error, data) {

// 	// 3. CODE RUNS HERE LAST, AFTER .TSV FILE IS DOWNLOADED

// 	// set linear scale
// 	// scaleX.domain([0, d3.max(data, function(d) { return d.frequency; })]);
//     scaleX.domain(data.map(function(d) { return d.letter; }));  
// 	scaleY.domain([0, d3.max(data, function(d){ return d.frequency; })])

// 	// define bar width
// 	var barWidth = width / data.length;

// 	// svg 'g' is a group container
// 	var bar = chart.selectAll('g')
// 		// join the data
// 		.data(data)
// 		// enter the new data & append a 'g' element for each new data point
// 		.enter().append('g').attr('class', 'bar')
// 		// set y-coord of each 'g' element
// 		.attr('transform', function(d, i) {
// 			return "translate(" + i * barWidth + ",0)";
// 		});

// 	// add a 'rect' element to the 'g' (group) element
// 	bar.append('rect')
// 		.attr("y", function(d) { 
// 			return scaleY(d.frequency); 
// 		})
// 		.attr('height', function(d) {
// 			return height - scaleY(d.frequency);
// 		})
// 		.attr('width', barWidth - 4);

// 	// bar.append('text')
// 	// 	// set x-coord of text based on it's width value
// 	// 	.attr('x', barWidth/2)
// 	// 	.attr('y', function(d) {
// 	// 		return scaleY(d.frequency) + 3;  
// 	// 	})
// 	// 	.attr('dy', '.75em')
// 	// 	// add text
// 	// 	.text(function(d) {
// 	// 		return d.frequency;
// 	// 	});

//     // x-axis 
//     chart.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis);

//     // y-axis
//     chart.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//         .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Frequency");
// });

// // 2. CODE RUNS SECOND, WHILE .TSV FILE IS DOWNLOADING

// // coerce to number
// function type(d) {
//   d.frequency = +d.frequency;
//   return d;
// }


// /*
// 	* HTML chart
// 	* long version
// */


// // // define the data
// // var data = [4, 8, 15, 16, 23, 42];

// // // linear scale max-width of data
// // var scaleX = d3.scale.linear()
// //     .domain([0, d3.max(data)])
// //     .range([0, 320]);

// // // select chart element based on class
// // var chart = d3.select('.chart')
// // // init "data join" by defining the section to which we want to join the data
// // 	.selectAll('div')
// // // join the data
// // 	.data(data)
// // // enter represents new data
// // 	.enter()
// // // append a "div" for the newly entered data
// // 	.append('div')
// // // width of bar represented by each data value 'd'
// // 	.style('width', function(d) { return scaleX(d) + 'px'; })
// // // text content in each bar
// // 	.text(function(d) { return d; })


// /*
// 	* HTML chart
// 	* shortened version
// */
// // d3.select(".chart")
// //   .selectAll("div")
// //     .data(data)
// //   .enter().append("div")
// //     .style("width", function(d) { return d * 10 + "px"; })
// //     .text(function(d) { return d; });
