/*
	* kimispencer.com
	* 16 July 2014
*/

// global vars
var wordFreq;

// setup chart
var width = 1220;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width+100);

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
	x.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	chart.attr("height", function(d) { return data.length * 10 });

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + (i+1) * Math.sqrt(x(d.frequency) * 2) + ")"; });

	bar.append("text")
		.attr("font-size", function(d) { return Math.sqrt(x(d.frequency) * 2); })
		.text(function(d) { return d.text + " : " + d.frequency; })
		.attr("class", "word");

	drawClock(data);
};

// draw circle
var radians = 0.0174532925, // one degree
	clockRadius = 500,
	margin = 50,
	width = (clockRadius+margin)*2,
    height = (clockRadius+margin)*2,
    secondTickStart = clockRadius;
    secondTickLength = -10,
    hourTickLength = -18

function drawClock(data){ //create all the clock elements

	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 2 * Math.PI]);

	var face = d3.select(".chart").append("g")
	    .attr("class", "clock-face")
		.attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		
	bar.append('line')
		.attr('y1',secondTickStart)
		.attr('y2',secondTickStart + secondTickLength)
		.attr('transform',function(d, i){
			return 'rotate('  + circleScale(i) + ')';
		})

	bar.append('text')
		.text(function(d){
			return d.text;
		})
		.attr('x',clockRadius)
		.attr('transform',function(d, i){
			return 'rotate('  + circleScale(i) + ')';
		})
		.attr('font-size', '10px');
};

// other visualization stuff:
// 3. determine frequency of correlations between words in that sample set
// later: sentiment analysis (color), bpm (audio?), etc.

// front-end functionalities:
// 1. define sample set (individual artist, year, decade, or genre)
// 2. transitions / animations (linear to circular)











