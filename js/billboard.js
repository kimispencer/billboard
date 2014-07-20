/*
	* kimispencer.com
	* 16 July 2014
*/

var wordFreq;
var radians = 0.0174532925, // one degree
	circleRadius = 500,
	margin = 200,
	width = document.body.clientWidth,
    height = (circleRadius+margin),
    tickLength = -10,
    clickPushY = 2,
    face;

// setup
var chart = d3.select(".chart")
	.attr('height', height*2)
    .attr("preserveAspectRatio", "xMinYMin meet");
// clock face
var face = d3.select(".chart").append("g")
	.attr("class", "clock-face")
	.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

// load the data set (defined by user on front-end, such as by decade, by artist, genre, etc.) 
d3.json("data/test.json", function(error, data) {
	processData(data);
	visualizeData(wordFreq)
});

function processData(data) {
	// 1. collect lyrics from defined sample and join them
	var allLyrics = [];
	data.forEach(function(d) {
		var lyrics = d.lyrics;
		allLyrics.push(lyrics);
	});

	// 2. determine frequency of words within that sample set
	wordFreq = getWordFrequency(allLyrics.join(" "));
};

function visualizeData(data) {
	// !!! resize stuff... not quiet right tho !!!
	chart.attr("viewBox", function(d) { 
		return "0 0 " + width + " " + width;
	});
	// drawLine(data);
	drawCircle(data);
	// drawChordDiagram(data);
	drawRelationshipArcs(data);
};

var make_point = function(element, xy)
{
    // console.log(element);
    //var matrix = element.getCTM();
    //var matrix = element.getScreenCTM();
    var p = element.nearestViewportElement.createSVGPoint();
    var matrix = element.getTransformToElement(element.nearestViewportElement);
    p.x = xy[0];
    p.y = xy[1];
    var sp = p.matrixTransform(matrix);
    return sp;
}

function drawRelationshipArcs(data) {
	var center = {x: 0, y: 0};
		// p1 = {x: 450, y: -200},
		// p2 = {x: 80, y: 500};

	face.append("circle")
	    .style("stroke", "white")
	    .attr("r", 10)
	    .attr("cx", center.x)
	    .attr("cy", center.y);

	// var curve = face.append('path')
	// 	.attr('d', 'M' + p1.x + ',' + p1.y + 'Q' + center.x + ',' + center.y + ' ' + p2.x +',' + p2.y)
	// 	.attr('class', 'relationship-arc');

	// 	curve.transition()
	// 		.attr('d', 'M' + p1.x + ',' + p1.y + 'Q' + center.x + ',' + center.y + ' ' + p2.x +',' + p2.y);

/*
	var districts = chart.selectAll("g");

	var district_centers = districts[0].map(function(d, i) {
	    var bbox = this.getBBox();
	    return [bbox.left + bbox.width/2, bbox.top + bbox.height/2];
	});

	chart
	  .selectAll("g")
	  .data(district_centers)
	  .enter()
	  .append("circle")
	     .attr("class", "district_circle")
	     .attr("cx", function(d){ return d[0]})
	     .attr("cy", function(d){ return d[1]})
	     .attr("r", 10)
	     .attr("fill", "red");
*/

 	var wordElements = face.selectAll('text');
	var face2 = d3.select(".chart").append("g")
		.attr("class", "dot-face")

 	wordElements[0].map(function(d, i) {
 		var element = d;
 		console.log(element.getBoundingClientRect())
 		var foo = element.getBoundingClientRect();

		var box = face2.append('rect')
			.attr('x', foo.top) //p.x)
			.attr('y', foo.left) //p.y)
			.attr('width', foo.width) //bbox.width)
			.attr('height', foo.height) //bbox.height)
			.attr('stroke', 'red')
			.attr('stroke-width', '2px')
			.attr('fill', 'none')
 	});

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
};

function drawLine(data) {
	var linearScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 40]);

	var ordinalScale = d3.scale.ordinal()
	    .rangeRoundBands([0, width], 0.1)
	    .domain(data.map(function(d) { return d.letter; }));

	// chart.style('width', function(d) { return linearScale(d) + 'px'; })

	var bar = chart.selectAll('g')
		.data(data)
		.enter().append('g');

	bar.append('text')
		.text(function(d) {
			return d.text;
		})
		.attr('transform', function(d, i) {
			return "translate(" + linearScale(i) + ", 100) rotate(270)";
		})
		.attr('class', 'word');
};

function drawCircle(data) {
	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 2 * Math.PI]);

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		// .on('mouseover', function(d) {
		// 	var word = d3.select(this)
		// 	console.log(word)
		// });
		
	// bar.append('line')
	// 	.attr('y1',circleRadius)
	// 	.attr('y2',circleRadius + tickLength)
	// 	.attr('class', 'tick');

	bar.append('text')
		.text(function(d){
			return d.text;
		})
		.attr('x', function(d) {
			return circleRadius;
		})
		.attr('transform', function(d, i){
			return 'rotate('  + circleScale(i) + ')';
		})
		.attr('font-size', function(d) {
			return d.frequency * 5;
		})
		.on('mousedown', function(d){
			var word = d3.select(this).attr('dy', clickPushY).attr("translate", "(20,2.5)");
		})
		.on('mouseup', function(d){
			var word = d3.select(this).attr('dy', 0);
		})
		.attr('class', 'word');
	};

// other visualization stuff:
// 3. determine frequency of correlations between words in that sample set
// later: sentiment analysis (color), bpm (audio?), etc.

// front-end functionalities:
// 1. define sample set (individual artist, year, decade, or genre)
// 2. transitions / animations (linear to circular)









