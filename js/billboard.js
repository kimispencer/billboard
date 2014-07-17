/*
	* kimispencer.com
	* 16 July 2014
*/

var wordFreq;
var width = 1220;
var chart = d3.select(".chart")
    .attr("width", width+100);

// circle stuff
var radians = 0.0174532925, // one degree
	circleRadius = 500,
	margin = 50,
	width = (circleRadius+margin)*2,
    height = (circleRadius+margin)*2,
    tickLength = -10,
    clickPushY = 2;

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
	chart.attr("height", function(d) { return data.length * 10 });
	
	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 2 * Math.PI]);

	var face = d3.select(".chart").append("g")
	    .attr("class", "clock-face")
		.attr('transform','translate(' + (circleRadius + margin) + ',' + (circleRadius + margin) + ')');

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		
	bar.append('line')
		.attr('y1',circleRadius)
		.attr('y2',circleRadius + tickLength)
		.attr('transform',function(d, i){
			return 'rotate('  + circleScale(i) + ')';
		})
		.attr('class', 'tick');

	bar.append('text')
		.text(function(d){
			return d.text;
		})
		.attr('x',circleRadius)
		.attr('transform', function(d, i){
			return 'rotate('  + circleScale(i) + ')';
		})
		.attr('font-size', function(d) {
			return d.frequency * 5;
		})
		.on('mousedown', function(d){
			var word = d3.select(this).attr('dy', clickPushY);
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











