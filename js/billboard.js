/*
	* kimispencer.com
	* 16 July 2014
*/

var allLyrics = [];
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
	// !!! resize stuff... not quiet right tho !!!
	chart.attr("viewBox", "0 0 " + width + " " + width);
// clock face
var face = d3.select(".chart").append("g")
	.attr("class", "clock-face")
	.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

// load the data set (defined by user on front-end, such as by decade, by artist, genre, etc.) 
d3.json("data/test.json", function(error, raw) {
	processData(raw);
	visualizeData(wordFreq);
	foo();
});

function processData(data) {
	// 1. collect lyrics from defined sample and join them
	data.forEach(function(d) {
		var lyrics = d.lyrics;
		allLyrics.push(lyrics);
	});

	// 2. determine frequency of words within that sample set
	wordFreq = getWordFrequency(allLyrics.join(" "));
};

function visualizeData(data) {
	drawCircle(data);
};

function foo() {
	face.selectAll('g')
		.on('mousedown', function(d, i) {
		// this key "ngram" : value "word-value"
		// find object by key "text" : value "word-value"
		// get key "theta" : value for that end word
		// draw the arc...

		d3.select(this).append('circle')
			.attr('cx', circleRadius)
			.attr('cy', 0)
			.attr('r', 20)
			.attr('fill', 'green')

       // d3.keys(d).forEach(function(key) {
          //  	console.log(key + ", " + d[key])
       //  });

		var theta = d.theta;

		face.append('circle')
			.attr('cx', circleRadius)
			.attr('cy', 0)
			.attr('transform', 'rotate(' + theta + ')')
			.attr('r', 10)
			.attr('fill', 'red')
			// .attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

		// d3.select(this).append('path')
		// 	.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + circleRadius + ',' + 0 + ' ' + circleRadius +',' + 0)
		// 	.attr('class', 'relationship-arc')
		// 	.transition()
		// 		.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + startX +',' + startY)
	});
}

function drawCircle(data) {

	// 0, 0 is center of clock-face
	// face.append('circle')
	// 	.attr('cx', 0)
	// 	.attr('cy', 0)
	// 	.attr('r', 10)
	// 	.attr('stroke', 'white');

	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 2 * Math.PI]);

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		// ROTATION TRANSFORMATION (based on index value)
		.attr('transform', function(d, i) {
			// console.log(circleScale(i))
			return 'rotate('  + circleScale(i) + ')';
		})
		// .on('mouseover', function(d, i) {
		.each(function(d, i) {
			// set theta
			d.theta = circleScale(i);
			// console.log(d);

			// CONVERT THETA INTO X/Y COORDS
			var theta = d.theta;
			var startX = circleRadius * Math.cos(theta);
			var startY = circleRadius * Math.sin(theta);
			// console.log(startX + ", " + startY)

			// face.append('circle')
			// 	.attr('cx', startX)
			// 	.attr('cy', startY)
			// 	.attr('r', 2)
			// 	.attr('fill', 'orange')

			// !!! NOTES
			// data[i] = d 	// data array can be accessed
			// console.log(d) // data object {text: "we", frequency: 22}
			// console.log(this)	// html markup
			// console.log(d3.select(this)) // array... d3 object?
		})
		// .on('mousedown', function(d, i) {
		// 	// this key "ngram" : value "word-value"
		// 	// find object by key "text" : value "word-value"
		// 	// get key "theta" : value for that end word
		// 	// draw the arc...

		// 	// console.log(d)
		// 	// CONVERT THETA INTO X/Y COORDS
		// 	var theta = d.theta;
		// 	var startX = circleRadius * Math.cos(theta);
		// 	var startY = circleRadius * Math.sin(theta);
		// 	console.log(startX + ", " + startY)

		// 	face.append('circle')
		// 		.attr('cx', startX)
		// 		.attr('cy', startY)
		// 		.attr('r', 20)
		// 		.attr('fill', 'red')

  //          // d3.keys(d).forEach(function(key) {
	 //          //  	console.log(key + ", " + d[key])
  //          //  });

		// 	// d3.select(this).append('line')
		// 	// 	.attr('x1', circleRadius-10)
		// 	// 	.attr('x2', circleRadius)
		// 	// 	.attr('class', 'relationship-arc')
		// 	// 	// final destination
		// 	// 	.transition()
		// 	// 		.attr('x2', 0)
		// 	// 		.attr('y2', 0);
		// });
		
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





