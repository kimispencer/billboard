/*
	* kimispencer.com
	* 16 July 2014
*/

var data;
var radians = 0.0174532925, // one degree
	circleRadius = 500,
	margin = 40,
	width = document.body.clientWidth,
    height = (circleRadius+margin),
    tickLength = -10,
    clickPushY = 2,
    face;

// setup
var chart = d3.select(".chart")
	.attr('height', height * 2)
	.attr('width', width)
    .attr("preserveAspectRatio", "xMinYMin meet");
	chart.attr("viewBox", "0 0 " + width + " " + width);

// clock face
var face = d3.select(".chart").append("g")
	.attr("class", "clock-face")
	// circle
	.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');
	// line
	// .attr('transform','translate(' + 0 + ',' + (circleRadius + margin) + ')');

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
	// drawCircle(data);
	// drawRelationshipArcs();
	// displayText();

	// testing
	circleData(data);
	lineData(data);
	drawCircleFoo(data);
};

// 1. set circle data (x,y coords on a circle)
// 2. set line data (x,y coords on a line)
// 3. use the svg "d" attr to transition between circle & line coords

function circleData(data) {
	// rotation scale
	var circleScale = d3.scale.linear()
		.range([0, 2 * Math.PI])	// radians
		.domain([0, data.length]);

	// set circular coordinates
	data.forEach(function(d, i) {
		// d.theta in DEGREES
		d.theta = radiansToDegrees(circleScale(i));
		// set x,y circle coords (but requires RADIANS)
		d.circleCoords = calcPosition(0, 0, circleRadius, degreesToRadians(d.theta));
		// console.log(d.circleCoords)
	});

	// draw circle test
	// var bar = face.selectAll('g')
	// 	.data(data)
	// 	.enter().append('g');

	// bar.append('text')
	// 	.text(function(d) {
	// 		return d.text;
	// 	})
	// 	.attr('font-size', function(d) {
	// 		return d.frequency * 5;
	// 	})
	// 	.attr('class', 'word')
	// 	// .attr('transform', function(d) {
	// 	// 	return 'rotate(' + d.theta + ")";
	// 	// })
	// 	// .attr('x', 100);
	// 	.attr('x', function(d) {
	// 		return d.circleCoords.x;
	// 	})
	// 	.attr('y', function(d) {
	// 		return d.circleCoords.y
	// 	});
};

function lineData(data) {
	var lineScale = d3.scale.linear()
		// line length based on circle size
		.range([0, circleRadius * Math.PI * 2])
		.domain([0, data.length]);

	// set linear coordinates
	data.forEach(function(d, i) {
		d.lineCoords = {};
		d.lineCoords.x = lineScale(i);
		d.lineCoords.y = 0;
		// console.log(d)
	});

	// tick container
	// var bar = face.selectAll('g')
	// 	.data(data)
	// 	.enter().append('g');

	// // text
	// bar.append('text')
	// 	.text(function(d){
	// 		return d.text;
	// 	})
	// 	.attr('transform', 'rotate(-90)')
	// 	.attr('font-size', function(d) {
	// 		return d.frequency * 5;
	// 	})
	// 	.attr('class', 'word')
	// 	.attr('x', function(d) {
	// 		return d.lineCoords.x;
	// 	})
	// 	.attr('y', function(d) {
	// 		return d.lineCoords.y;
	// 	});
};

// accessor function?
var lineFunction = d3.svg.line()
	.x(function (d) {return d.x;})
	.y(function (d) {return d.y;})
	.interpolate("cardinal");

function transitionToLine(data) {
	console.log("transition to Line")

	face.transition()
		.duration(1000)
		.ease('linear')
		.attr('transform','translate(' + 0 + ',' + (circleRadius + margin) + ')');

	face.selectAll('text')
		.transition()
        .duration(1000)
        .ease('linear')
		.attr('x', function(d) {
			return d.lineCoords.x;
		})
		.attr('y', function(d) {
			return d.lineCoords.y;
		});
	face.on('click', transitionToCircle);
};

function transitionToCircle(data) {
	console.log("transition to Circle")

	face
		.transition()
		.duration(1000)
		.ease('linear')
		.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

	face.selectAll('text')
		.transition()
		.duration(1000)
		.ease('linear')
		.attr('x', function(d) {
			return d.circleCoords.x;
		})
		.attr('y', function(d) {
			return d.circleCoords.y;
		});
	face.on('click', transitionToLine);

};

function drawCircleFoo(data) {
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g');

	bar.append('text')
		.text(function(d) {
			return d.text;
		})
		.attr('font-size', function(d) {
			return d.frequency * 5;
		})
		.attr('class', 'word')
		.attr('x', function(d) {
			return d.circleCoords.x;
		})
		.attr('y', function(d) {
			return d.circleCoords.y
		});
	face.on('click', function() {
		transitionToLine(data);
	});
};

// !!! SAFE

// SVG rotations use DEGREES
function radiansToDegrees(radians) {
	var degrees = radians * (180/Math.PI);
	return degrees;
};

function degreesToRadians(degrees) {
	var radians = degrees / (180/Math.PI);
	return radians;
};

// calculate position based on RADIANS
function calcPosition(centerX, centerY, radius, theta) {
	var coords = {};
	var x = centerX + radius * Math.cos(theta);
    var y = centerY + radius * Math.sin(theta);
    coords.x = x;
    coords.y = y;
    return coords;
};

// layout words in a circle
function drawCircle(data) {
	var circleScale = d3.scale.linear()
		.range([0, 2 * Math.PI])	// radians
		.domain([0, data.length]);

	// tick container
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('transform', function(d, i) {
			// SVG rotation uses degrees
			return 'rotate('  + radiansToDegrees(circleScale(i)) + ')';
		})
		.each(function(d, i) {
			// set theta in radians
			d.theta = circleScale(i);
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
		.attr('dx', function(d) {
			return d.frequency * 2;
		})
		.on('mousedown', function(d){
			var word = d3.select(this).attr('dy', clickPushY).attr("translate", "(20,2.5)");
		})
		.on('mouseup', function(d){
			var word = d3.select(this).attr('dy', 0);
		})
		.attr('class', 'word');
};

function drawRelationshipArcs() {
	face.selectAll('g')
		// .on('mousedown', function(d, i) {
		.each(function(d, i) {
			// origin
			var origin = calcPosition(0, 0, circleRadius, d.theta);

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

           	// target's theta
           	var targetTheta;
           	d3.values(data).forEach(function(value) {
           		if(value.text===targetWord) {
           			targetTheta = value.theta;
           		}
           	});

           	if(typeof targetTheta === 'number') {
				var target = calcPosition(0, 0, circleRadius, targetTheta);
				// draw bezier curve from start to center to relationship words
				face.append('path')
					.attr('d', 'M' + origin.x + ',' + origin.y + ' Q' + 0 + ',' + 0 + ' ' + target.x +',' + target.y)
					// .attr('d', 'M' + origin.x + ',' + origin.y + ' Q' + 0 + ',' + 0 + ' ' + 0 +',' + 0)
					.attr('class', 'relationship-arc')
					// .transition()
						// .attr('d', 'M' + origin.x + ',' + origin.y + ' Q' + 0 + ',' + 0 + ' ' + target.x +',' + target.y)
           	}
	});
};

function displayText() {
	face.selectAll('g')
		.on('mouseover', function(d, i) {
			d3.select('.text-display')
				.text(d.text)
		});
};