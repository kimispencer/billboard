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
var time = 1000;

/*
	* SETUP
*/

// chart
var chart = d3.select(".chart")
	.attr('height', height * 2)
	.attr('width', width)
    .attr("preserveAspectRatio", "xMinYMin meet");
	chart.attr("viewBox", "0 0 " + width + " " + width);

// clock face
var face = d3.select(".chart").append("g")
	.attr("class", "clock-face")

// load the data set (defined by user on front-end, such as by decade, by artist, genre, etc.) 
d3.json("data/test.json", function(error, raw) {
	// process data
	processData(raw);
	circleData(data);
	lineData(data);

	// visualize data
	visualizeData();
});

// all visualization functions
function visualizeData() {
	// drawCircle();
	drawLine();
	displayText();
};

/*
	* DATA PROCESSING FUNCTIONS
*/

// process data to find word frequencies of the sample set
function processData(raw) {
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
	// 4. match them with the d.word value, and set that as that word object's target
	data.forEach(function(d) {
		allRelationships.forEach(function(r) {
			r.forEach(function(rWord) {
				if(rWord===d.word) {
					d.relationships = r;
				}
			});
		});
	});
};

// set circle coords
function circleData(data) {
	// rotation scale
	var circleScale = d3.scale.linear()
		.range([0, 2 * Math.PI])	// returns RADIANS
		.domain([0, data.length]);

	// set circular coordinates
	data.forEach(function(d, i) {
		// d.theta in DEGREES
		d.theta = radiansToDegrees(circleScale(i));
		// set x,y circle coords
		d.circleCoords = calcPosition(0, 0, circleRadius, d.theta);
	});
};

// set line coords
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
	});
};

/* 
	* COVERSION FUNCTIONS
*/

// SVG / CSS rotations use DEGREES
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
	var x = centerX + radius * Math.cos(degreesToRadians(theta));
    var y = centerY + radius * Math.sin(degreesToRadians(theta));
    coords.x = x;
    coords.y = y;
    return coords;
};

/*
	* ANIMATION FUNCTIONS
*/

// animation from circle to line
function transitionToLine() {
	face.selectAll('.relationship-arc').remove();
	face.selectAll('text')
		.attr('transform', 'rotate(0)');

	face.transition()
		.duration(time)
		.ease('linear')
		.attr('transform','translate(' + 0 + ',' + (circleRadius + margin) + ')');

	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('class', 'bar');

	face.selectAll('text')
		.transition()
        .duration(time)
        .ease('linear')
		.attr('x', function(d) {
			return d.lineCoords.x;
		})
		.attr('y', function(d) {
			return d.lineCoords.y;
		});

	setTimeout(function() {
		face.selectAll('text')
			.attr('transform', function(d) {
				return 'rotate(-90,' + d.lineCoords.x + ',' + d.lineCoords.y+ ')';
			})
		drawRelationshipArcs('line');	
	}, time);

	face.on('click', transitionToCircle);
};

// animation from to line to circle
function transitionToCircle() {
	face.selectAll('.relationship-arc').remove();
	face.selectAll('text')
		.attr('transform', 'rotate(0)');

	face.transition()
		.duration(time)
		.ease('linear')
		.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

	face.selectAll('text')
		.transition()
		.duration(time)
		.ease('linear')
		.attr('x', function(d) {
			return d.circleCoords.x;
		})
		.attr('y', function(d) {
			return d.circleCoords.y;
		});

	setTimeout(function() {
		face.selectAll('text')
			.attr('transform', function(d) {
				return 'rotate('+ d.theta +',' + d.circleCoords.x + ',' + d.circleCoords.y+ ')';
			})
		drawRelationshipArcs('circle');
	}, time);

	face.on('click', transitionToLine);
};

/*
	* DRAW STUFF
*/

// draw line + relationship arcs on INIT
function drawLine() {	
	face.attr('transform','translate(' + 0 + ',' + (circleRadius + margin) + ')');

	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('class', 'bar');

	bar.append('circle')
		.attr('class', 'circle')
		.attr('r', 20)
		.attr('cx', 0)
		.attr('cy', 0)

	bar.append('text')
		.text(function(d) {
			return d.word;
		})
		.attr('font-size', function(d) {
			return d.frequency * 5;
		})
		.attr('class', 'word')
		.attr('x', function(d) {
			return d.lineCoords.x;
		})
		.attr('y', function(d) {
			return d.lineCoords.y
		})
		// center of rotation
		.attr('transform', function(d) {
			return 'rotate(-90,' + d.lineCoords.x + ',' + d.lineCoords.y + ')';
		});

	face.on('click', function() {
		transitionToCircle();
	});

	drawRelationshipArcs('line');
};
	
// draw circle + relationship arcs on INIT
function drawCircle() {
	face.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');
	
	var bar = face.selectAll('g')
		.data(data)
		.enter().append('g')
		.attr('class', 'bar');

	bar.append('text')
		.text(function(d) {
			return d.word;
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
		})
		// center of rotation
		.attr('transform', function(d) {
			return 'rotate('+ d.theta + ',' + d.circleCoords.x + ',' + d.circleCoords.y + ')';
		});

	face.on('click', function() {
		transitionToLine();
	});

	drawRelationshipArcs('circle');
};

function drawRelationshipArcs(shape) {
   	var unique = [];
	face.selectAll('g')
		.each(function(d, i) {
			// set the origin location
			if(shape==='circle') var origin = d.circleCoords;
			if(shape==='line') var origin =d.lineCoords;

			// find the target word
			var targetWord;
			d3.keys(d).forEach(function(key) {
	           	if(key==="relationships") {
	           		d[key].forEach(function(v) {
	           			if(d.word!=v) {
	           				targetWord = v;
	           			}
	           		})
	           	}
	        });

           	// set the target location
           	var target;
           	d3.values(data).forEach(function(value) {
           		if(value.word===targetWord) {
           			if(shape==='circle') target = value.circleCoords;
           			if(shape==='line') target = value.lineCoords;
           		}
           	});

           	var midPoint;
           	if(target) {
	           	unique.push(d.word);
	           	if(unique.contains(targetWord)) {
	           		// center of circle
	           		if(shape==='circle') midPoint = {x: 0, y: 0};
	           		// midpoint between origin & target
	           		if(shape==='line') midPoint = {x: (origin.x+target.x)/2, y: -500}; 
					// draw bezier curve
					face.append('path')
						.attr('d', 'M' + origin.x + ',' + origin.y + ' Q' + origin.x + ',' + origin.y + ' ' + origin.x +',' + origin.y)
						.attr('class', 'relationship-arc')
						.transition()
							.duration(time)
							.ease('linear')
							.attr('d', 'M' + origin.x + ',' + origin.y + ' Q' + midPoint.x + ',' + midPoint.y + ' ' + target.x +',' + target.y)
	           	}
           	}
	});
};

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

function displayText() {
	face.selectAll('g')
		.on('mouseover', function(d, i) {
			d3.select('.text-display')
				.text(d.word)
		});
};