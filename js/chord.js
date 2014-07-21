
// var make_point = function(element, xy)
// {
//     // console.log(element);
//     //var matrix = element.getCTM();
//     //var matrix = element.getScreenCTM();
//     var p = element.nearestViewportElement.createSVGPoint();
//     var matrix = element.getTransformToElement(element.nearestViewportElement);
//     p.x = xy[0];
//     p.y = xy[1];
//     var sp = p.matrixTransform(matrix);
//     return sp;
// }

// var center = {x: width/2, y: width/2};
// 	p1 = {x: 450, y: -200},
// 	p2 = {x: 10, y: circleRadius};

// function drawRelationshipArcs(data) {
	// face.append("circle")
	//     .style("stroke", "red")
	//     .attr('fill', 'grey')
	//     .attr("r", circleRadius)
	//     .attr("cx", 0)	// 0, 0 is center appeneded to "face"
	//     .attr("cy", 0);

 // 	var wordElements = face.selectAll('text');
	// var face2 = d3.select(".chart").append("g")
	// 	.attr("class", "dot-face")

	// d3.selectAll(wordElements).each(function(d, i) {
		// console.log(d, i, wordElements[i]);
		// console.log(wordElements[i])
 	// 	var element = wordElements[i].node();
 	// 	// console.log(element.getBoundingClientRect())
 	// 	var foo = element.getBoundingClientRect();
 	// 	// console.log(foo)

		// var box = face2.append('rect')
		// 	.attr('x', foo.top) //p.x)
		// 	.attr('y', foo.left) //p.y)
		// 	.attr('width', foo.width) //bbox.width)
		// 	.attr('height', foo.height) //bbox.height)
		// 	.attr('stroke', 'red')
		// 	.attr('stroke-width', '2px')
		// 	.attr('fill', 'none')
	// });

 	// wordElements[0].map(function(d, i) {
 	// 	var element = d;
 	// 	// console.log(element[0][0].getBoundingClientRect())
 	// 	var foo = element.getBoundingClientRect();
 	// 	// console.log(foo)

		// var box = face2.append('rect')
		// 	.attr('x', foo.top) //p.x)
		// 	.attr('y', foo.left) //p.y)
		// 	.attr('width', foo.width) //bbox.width)
		// 	.attr('height', foo.height) //bbox.height)
		// 	// .attr('stroke', 'red')
		// 	.attr('stroke-width', '1px')
		// 	.attr('fill', 'none')

		// // var line = face2.append('line')
		// // 	.attr('x1', foo.top)
		// // 	.attr('y1', foo.left)
		// // 	.attr('x2', 0)
		// // 	.attr('y2', 0)

		// var curve = face2.append('path')
		// 	.attr('d', 'M' + foo.top + ',' + foo.left + ' Q' + center.x + ',' + center.y + ' ' + p2.x +',' + p2.y)
		// 	.attr('class', 'relationship-arc');

		// 	// curve.transition()
		// 	// 	.attr('d', 'M' + p1.x + ',' + p1.y + 'Q' + center.x + ',' + center.y + ' ' + p2.x +',' + p2.y);
 	// });

	// var node = wordElements.node();
	// var bbox = node.getBBox();
	// var topLeft = make_point(node, [bbox.x, bbox.y]);

	// var b = chart.append('rect')
	// 	.attr('x', topLeft.x)
	// 	.attr('y', topLeft.y)
	// 	.attr('width', bbox.width)
	// 	.attr('height', bbox.height)
	// 	.attr('stroke', 'red')
	// 	.attr('stroke-width', '2px')
	// 	.attr('fill', 'none')

	// for(var i=0; i < wordElements.length; i++) {
	// 	var wordElem = wordElements[1];
	// 	console.log(wordElem)
	// 	var node = wordElem.node();
	// 	var bbox = node.getBBox();
	// 	var topLeft = make_point(node, [bbox.x, bbox.y]);

	// 	var b = chart.append('rect')
	// 		.attr('x', topLeft.x)
	// 		.attr('y', topLeft.y)
	// 		.attr('width', bbox.width)
	// 		.attr('height', bbox.height)
	// 		.attr('stroke', 'red')
	// 		.attr('stroke-width', '2px')
	// 		.attr('fill', 'none')
	// }
// };

// function drawLine(data) {
// 	var linearScale = d3.scale.linear()
// 		.range([0, data.length])
// 		.domain([0, 40]);

// 	var ordinalScale = d3.scale.ordinal()
// 	    .rangeRoundBands([0, width], 0.1)
// 	    .domain(data.map(function(d) { return d.letter; }));

// 	// chart.style('width', function(d) { return linearScale(d) + 'px'; })

// 	var bar = chart.selectAll('g')
// 		.data(data)
// 		.enter().append('g');

// 	bar.append('text')
// 		.text(function(d) {
// 			return d.text;
// 		})
// 		.attr('transform', function(d, i) {
// 			return "translate(" + linearScale(i) + ", 100) rotate(270)";
// 		})
// 		.attr('class', 'word');
// };

// var make_arc = function(element) {
// 	console.log(element)
// 	var theta = Math.atan2(element.left, element.top) * (180 / Math.PI);
// 	console.log(theta)
// 	var curve = face.append('path')
// 		.attr('d', 'M' + element.top + ',' + circleRadius + 'Q' + center.x + ',' + center.y + ' ' + p2.x +',' + p2.y)
// 		.attr('class', 'relationship-arc');

// 	var b = face.append('rect')
// 		.attr('x', element.top)
// 		.attr('y', element.left)
// 		.attr('width', 10)
// 		.attr('height', 10)
// 		.attr('stroke', 'red')
// 		.attr('stroke-width', '2px')
// 		.attr('fill', 'none')
// };

// other visualization stuff:
// 3. determine frequency of correlations between words in that sample set
// later: sentiment analysis (color), bpm (audio?), etc.

// front-end functionalities:
// 1. define sample set (individual artist, year, decade, or genre)
// 2. transitions / animations (linear to circular)




// // From http://mkweb.bcgsc.ca/circos/guide/tables/
// var chord = d3.layout.chord()
//   .padding(.05)
//   .sortSubgroups(d3.descending)
//   .matrix([
//     // [11975,  5871, 8916, 2868],
//     // [ 1951, 10048, 2060, 6171],
//     [ 8010, 16145],
//     [ 1013,   990]
//   ]);
// var w = 600,
//     h = 600,
//     r0 = Math.min(w, h) * .41,
//     r1 = r0 * 1.1;

// var fill = d3.scale.ordinal()
//     .domain(d3.range(4))
//     .range(["#000000", "#FFDD89", "#957244", "#F26223"]);

// var svg = d3.select(".chart")
//   .append("svg:svg")
//     .attr("width", w)
//     .attr("height", h)
//   .append("svg:g")
//     .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

// svg.append("svg:g")
//   .selectAll("path")
//     .data(chord.groups)
//   .enter().append("svg:path")
//     .style("fill", function(d) { return fill(d.index); })
//     .style("stroke", function(d) { return fill(d.index); })
//     .attr("d", d3.svg.arc().innerRadius(r0).outerRadius(r1))
//     .on("mouseover", fade(.1))
//     .on("mouseout", fade(1));

// var ticks = svg.append("svg:g")
//   .selectAll("g")
//     .data(chord.groups)
//   .enter().append("svg:g")
//   .selectAll("g")
//     .data(groupTicks)
//   .enter().append("svg:g")
//     .attr("transform", function(d) {
//       return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
//           + "translate(" + r1 + ",0)";
//     });

// ticks.append("svg:line")
//     .attr("x1", 1)
//     .attr("y1", 0)
//     .attr("x2", 5)
//     .attr("y2", 0)
//     .style("stroke", "#000");

// ticks.append("svg:text")
//     .attr("x", 8)
//     .attr("dy", ".35em")
//     .attr("text-anchor", function(d) {
//       return d.angle > Math.PI ? "end" : null;
//     })
//     .attr("transform", function(d) {
//       return d.angle > Math.PI ? "rotate(180)translate(-16)" : null;
//     })
//     .text(function(d) { return d.label; });

// svg.append("svg:g")
//     .attr("class", "chord")
//   .selectAll("path")
//     .data(chord.chords)
//   .enter().append("svg:path")
//     .style("fill", function(d) { return fill(d.target.index); })
//     .attr("d", d3.svg.chord().radius(r0))
//     .style("opacity", 1);

// /** Returns an array of tick angles and labels, given a group. */
// function groupTicks(d) {
//   var k = (d.endAngle - d.startAngle) / d.value;
//   return d3.range(0, d.value, 1000).map(function(v, i) {
//     return {
//       angle: v * k + d.startAngle,
//       label: i % 5 ? null : v / 1000 + "k"
//     };
//   });
// }

// /** Returns an event handler for fading a given chord group. */
// function fade(opacity) {
//   return function(g, i) {
//     svg.selectAll("g.chord path")
//         .filter(function(d) {
//           return d.source.index != i && d.target.index != i;
//         })
//       .transition()
//         .style("opacity", opacity);
//   };
// }