/*
	* kimispencer.com
	* 16 July 2014
*/

// global vars
var wordFreq;

// setup chart
var width = 1220,
    barHeight = 20;

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
	// console.log(data);
	x.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	chart.attr("height", barHeight * data.length);

	var bar = chart.selectAll("g")
		.data(data)
		.enter().append("g")
		.attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

	bar.append("rect")
		.attr("width", function(d) { return x(d.frequency); })
		.attr("height", barHeight - 2)
		.attr("class", "bar");

	bar.append("text")
		.attr("x", function(d) { return x(d.frequency) + 10; })
		.attr("y", barHeight / 2)
		.attr("dy", ".35em")
		.text(function(d) { return d.text + " : " + d.frequency; })
		.attr("class", "word");

};


// other visualization stuff:
// 3. determine frequency of correlations between words in that sample set
// later: sentiment analysis (color), bpm (audio?), etc.

// front-end functionalities:
// 1. define sample set (individual artist, year, decade, or genre)
// 2. transitions / animations (linear to circular)