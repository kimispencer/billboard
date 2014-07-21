/*
	* kimispencer.com
	* 16 July 2014
*/

var data;
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
	// !!! resize stuff... not quiet right tho !!!
	chart.attr("viewBox", "0 0 " + width + " " + width);
// clock face
var face = d3.select(".chart").append("g")
	.attr("class", "clock-face")
	.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

// load the data set (defined by user on front-end, such as by decade, by artist, genre, etc.) 
d3.json("data/test.json", function(error, raw) {
	processData(raw);
	visualizeData(data);
});

function processData(raw) {
	// console.log(raw[0])
	var allLyrics = [],
		allRelationships = [];
	// 1. collect lyrics from defined sample and join them
	raw.forEach(function(d) {
		allLyrics.push(d.lyrics);

		d.relationships.forEach(function(r) {
			r.forEach(function(rWord) {
				console.log(rWord)
				allRelationships.push(rWord);
			})
		})
	});

	// 2. determine frequency of words within that sample set
	data = getWordFrequency(allLyrics.join(" "));	

	data.forEach(function(d) {
		// console.log(d.text)
	});
	// !!! OK PROBLEM, WE JUST CHANGE THE DATA SET SO EACH OBJECT IS AN INDIVIUDAL "WORD"
	// HOW DO WE ASSIGN INDIVIDUAL RELATIONSHIPS FOR EACH WORD... (AS THEY APPEAR BY...?)

	// raw.forEach(function(d, i) {
		// console.log(d.relationships)
		// data[i].relationships = d.relationships;
		// if(key==="theta") {
			// console.log(d[key])
		// }
	// });
	// console.log(data)
};

function visualizeData(data) {
	drawCircle(data);
	drawRelationshipArcs();
};

function drawRelationshipArcs() {
	face.selectAll('g')
		.on('mousedown', function(d, i) {
			// this key "ngram" : value "word-value"
			// find object by key "text" : value "word-value"
			// get key "theta" : value for that end word
			// draw the arc...

	       d3.keys(d).forEach(function(key) {
	           	console.log(key + ", " + d[key])
	           	// if(key==="theta") {
	           		// console.log(d[key])
	           	// }
	        });

			// append green circle to group object (which has a rotation applied)
			d3.select(this).append('circle')
				.attr('cx', circleRadius)
				.attr('cy', 0)
				.attr('r', 20)
				.attr('fill', 'green')

			var theta = d.theta;
			// append circle (with rotation) to the clock-face
			face.append('circle')
				.attr('cx', circleRadius)
				.attr('cy', 0)
				.attr('transform', 'rotate(' + theta + ')')
				.attr('r', 10)
				.attr('fill', 'red')
				// .attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

			// draw bezier curve from start to center to relationship words
			// d3.select(this).append('path')
			// 	.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + circleRadius + ',' + 0 + ' ' + circleRadius +',' + 0)
			// 	.attr('class', 'relationship-arc')
			// 	.transition()
			// 		.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + startX +',' + startY)
	});
}

function drawCircle(data) {
	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 2 * Math.PI]);

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('transform', function(d, i) {
			return 'rotate('  + circleScale(i) + ')';
		})
		.each(function(d, i) {
			// set theta
			d.theta = circleScale(i);
			// var theta = d.theta;
			// var x = circleRadius * Math.cos(theta);
			// var y = circleRadius * Math.sin(theta);
		})
		
	// line
	bar.append('line')
		.attr('x1',circleRadius)
		.attr('x2',circleRadius + tickLength)	
		.attr('class', 'tick');

	// text
	bar.append('text')
		.text(function(d){
			return d.text;
		})
		.attr('x', function(d) {
			return circleRadius;
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





