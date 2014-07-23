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

// process data to find word frequencies of the sample set
function processData(raw) {
	// console.log(raw[0])
	var allLyrics = [],
		allRelationships = [];

	raw.forEach(function(d) {
		// 1. collect lyrics from defined sample and join them
		allLyrics.push(d.lyrics);

		// 3. pull out relationship pairs from sample set
		d.relationships.forEach(function(r) {
			allRelationships.push(r);
		})
	});
	// 2. determine frequency of words within that sample set
	data = getWordFrequency(allLyrics.join(" "));	

	// 4. match them with the d.text value, and set that as that word object's target
	data.forEach(function(d) {
		allRelationships.forEach(function(r) {
			r.forEach(function(rWord) {
				if(rWord===d.text) {
					d.relationships = r;
				}
			});
		});
	});
};

// all visualization functions
function visualizeData(data) {
	drawCircle(data);
	drawRelationshipArcs();
};

// layout words in a circle
function drawCircle(data) {
	// scale data set to 360 degrees
	var circleScale = d3.scale.linear()
		.range([0, data.length])
		.domain([0, 60]); //2 * Math.PI]);

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
			// console.log(x + ", " + y)
		});

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

// !!! ARGHHHHH
function calcPosition(centerX, centerY, radius, theta) {
	var coords = {};
	var x = centerX + radius * Math.cos(theta);
    var y = centerX + radius * Math.sin(theta);
    coords.x = x;
    coords.y = y;

    return coords;
};

function drawRelationshipArcs() {
	face.selectAll('g')
		.on('mousedown', function(d, i) {
			// set the target
			var targetWord;
			d3.keys(d).forEach(function(key) {
	           	if(key==="relationships") {
	           		d[key].forEach(function(v) {
	           			if(d.text!=v) {
	           				targetWord = v;
	           			}
	           		})
	           	}
	        });

           	// find the target's theta
           	var targetTheta;
           	d3.values(data).forEach(function(value) {
           		if(value.text===targetWord) {
           			// console.log(value.text)
           			// console.log(value.theta)
           			targetTheta = value.theta;
           		}
           	});

           	// ORIGIN
           	// add circle to the "g" element (which has a rotation applied)
			// d3.select(this).append('circle')
			// 	.attr('cx', circleRadius)
			// 	.attr('cy', 0)
			// 	.attr('r', 20)
			// 	.attr('fill', 'pink')

			// ORIGIN
			// add circle (which has a rotation applied) to the "face"
			face.append('circle')
				.attr('cx', circleRadius)
				.attr('cy', 0)
				.attr('transform', 'rotate(' + d.theta + ')')
				.attr('r', 10)
				.attr('fill', 'red')

			// !!! ARGHHHH
			var origin = calcPosition(0, 0, circleRadius, d.theta);

			// ORIGIN
			face.append('circle')
				.attr('cx', origin.x)
				.attr('cy', origin.y)
				.attr('r', 5)
				.attr('fill', 'yellow')

			// TARGET
			// face.append('circle')
			// 	.attr('cx', circleRadius)
			// 	.attr('cy', 0)
			// 	.attr('transform', 'rotate(' + targetTheta + ')')
			// 	.attr('r', 10)
			// 	.attr('fill', 'orange');

			// var target = calcPosition(0, 0, circleRadius, targetTheta);

	        // TARGET
			// face.append('circle')
			// 	.attr('cx', target.x)
			// 	.attr('cy', target.y)
			// 	.attr('r', 10)
			// 	.attr('fill', 'orange');

			// draw bezier curve from start to center to relationship words
			// face.append('path')
			// 	.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + targetX +',' + targetY)
			// 	.attr('class', 'relationship-arc')
				// .transition()
					// .attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + targetX +',' + targetX)
	});
}





