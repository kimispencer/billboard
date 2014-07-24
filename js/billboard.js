/*
	* kimispencer.com
	* 16 July 2014
*/

var data;
var radians = 0.0174532925, // one degree
	circleRadius = 500,
	margin = 100,
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
	.attr('transform','translate(' + width/2 + ',' + (circleRadius + margin) + ')');

// !!! TESTING
// 0, 0 center of circle
face.append('circle')
	.attr('cx', 0)
	.attr('cy', 0)
	.attr('r', 10)
	.attr('stroke', 'white')

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
		.on('mousedown', function(d){
			var word = d3.select(this).attr('dy', clickPushY).attr("translate", "(20,2.5)");
		})
		.on('mouseup', function(d){
			var word = d3.select(this).attr('dy', 0);
		})
		.attr('class', 'word');
};

function radiansToDegrees(radians) {
	var degrees = radians * (180/Math.PI);
	return degrees;
};

function calcPosition(centerX, centerY, radius, theta) {
	var coords = {};
	var x = centerX + radius * Math.cos(theta);
    var y = centerY + radius * Math.sin(theta);
    coords.x = x;
    coords.y = y;

    console.log(theta)
    return coords;
};

function drawRelationshipArcs() {
	face.selectAll('g')
		.on('mousedown', function(d, i) {
			console.log(d)

			// origin
			face.append('circle')
				.attr('cx', circleRadius)
				.attr('cy', 0)
				// SVG rotation uses degrees
				.attr('transform', 'rotate(' + radiansToDegrees(d.theta) + ')')
				.attr('r', 10)
				.attr('fill', 'red')

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
				// x/y coords based on theta (radians)
				var target = calcPosition(0, 0, circleRadius, targetTheta);
				face.append('circle')
					.attr('cx', target.x)
					.attr('cy', target.y)
					.attr('r', 10)
					.attr('fill', 'yellow')
           	}

           	// draw bezier curve

			// draw bezier curve from start to center to relationship words
			// face.append('path')
			// 	.attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + targetX +',' + targetY)
			// 	.attr('class', 'relationship-arc')
				// .transition()
					// .attr('d', 'M' + circleRadius + ',' + 0 + ' Q' + 0 + ',' + 0 + ' ' + targetX +',' + targetX)
	});
}





