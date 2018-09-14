
// backup file, for the v1 code
/*
	General function for drawing all 64 Gua shapes
*/
function renderGua(){
	var svgHeight = 400;
	var svgWidth = 400;
	var centerY = svgHeight/2;
	var centerX = svgWidth/2;
	//create a svg canvas, move the graph to the center
	var svg = d3.select('#BieGua').append('svg').style("background-color", "grey")
	.attr('height',svgHeight+500).attr('width',svgWidth+900);


	var graph = svg.append('g')
	.attr("transform",
		function(){
			var result = "translate("+350+","+350+")";
			return result;
		}
	);
	// the length of the small square
	var squareLength = 7;
	// the interval between each rectangel
	var interval = 1;
	// the number of yao in each layer
	var guaLayer = 3;

	// the width of the layer
	var layerWidth = 7;
	// list of colors for ying and yang
	var colorList = ['#0cccd6','#ff3e13'];
	// list to store all the subgraphs, in order for forcing translation 
	// and rotations
	subgraphList = [];
	var radius = svgHeight/4;
	//iterate over the array of guas and draw 6 rectangles representing yaos
	hexagrams.forEach(function(data,iprime){

		var angle = 360/64.0*iprime;
		var subgraph = graph.append('g');
		// rotate through the graph
		subgraph.attr("transform",
			function(){
				var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
				result+="translate("+400+","+200+")"
				return result;
			}
		);
		//append the line according to the length of the sentence
		var numberOfLayer1 = getNumOfLayer(iprime);
		// var nextLayer = getNumOfLayer((iprime+1)%64);
		var previousLayer = getNumOfLayer((iprime+63)%64);
		// the start of the arcs and the lines
		var startX =guaLayer*squareLength+guaLayer*interval;
		var numberOfLayer = Math.max(numberOfLayer1,previousLayer);
		console.log(numberOfLayer);
		var startY = -1;
		var endY = -1;
		var endX = startX+numberOfLayer*layerWidth;
		subgraph.append('line')
		.style('stroke','green')
		.attr('x1',startX)
		.attr('x2',endX)
		.attr('y1',-1.8)
		.attr('y2',-1.8);
		// start
		// subgraph.append('line')
		// .style('stroke','green')
		// .attr('x1',startX+(numberOfLayer+1)*layerWidth)
		// .attr('x2',endX)
		// .attr('y1', 15.8)
		// .attr('y2',.8);
		// generate the arc for each layer
		//append small rectangles
		subgraph.selectAll('rect').data(data).enter().append('rect')
		.attr('x',function(d,i){
			return (i%guaLayer)*(squareLength+interval);
		})
		.attr('y',function(d,i){
			return Math.floor(i/guaLayer)*(squareLength+interval);
		})
		.attr('width',function(d,i){
			return squareLength;
		})
		.attr('height',function(d,i){
			return squareLength;
		})
		.style('fill', function(d,i){
			// d is the index of the color
			return colorList[d];
		});
	});

	//generate the arc, can also be used to generate the color, also add the characters in it
	var arcGraph = graph.append('g')
	.attr("transform",
		function(){
			var result = "translate("+centerX+","+centerY+")";
			return result;
		}
	)
	// adjust on the arc，
	var adjustment = 0.008;
	for (var k=0;k<64;k++){
		numberOfLayer = getNumOfLayer(k);					
		for (var j = 0; j<=numberOfLayer;j++){
			var startX = guaLayer*squareLength+guaLayer*interval;
			var arcRadius = startX+j*layerWidth+200;
			var arc = d3.arc().innerRadius(arcRadius).outerRadius(arcRadius)
			arcGraph.append('path')
			.attr('fill','none')
			.attr("stroke", "green")
			.attr("stroke-width", 1)
			.attr("d", arc({startAngle:(Math.PI*2/64.0)*k-adjustment+Math.PI/2, endAngle:(k+1)*(Math.PI*2/64)-adjustment+Math.PI/2}));
		}
	}
}




	// the word cloud charts using high chart API
function wordCloudHighChart(){
	var bgc ="#262626"
	var maxFontSize = 30
	var chartHeight = 270
	var chartWidth = 350
	var bgc ="#262626"

	var chartArgs = {
		backgroundColor:bgc,
		// height:chartHeight,
		width:chartWidth,
		marginLeft:0,
		marginRight:0,
		marginBottom:0,
		marginTop:20
	}

	// var chartTitile = {
	var titleStyle = {color: "white",
					'font-size':'15px'
	}
	console.log(AllData);


	var getRandomPosition = function getRandomPosition(size) {
	  return Math.round(size * Math.random());
	};

	var randomPlacement = function randomPlacement(point, options) {
	  var field = options.field,
	    r = options.rotation;
	    console.log(field.width);
	  return {
	    x: getRandomPosition(field.width) - (field.width*2 /3)-10,
	    y: getRandomPosition(field.height*2) - (field.height*2 / 3),
	    rotation: 0
	  };
	}

	Highcharts.seriesTypes.wordcloud.prototype.placementStrategy.randomHorizontal = randomPlacement;
	// }
	//All groups: positive, neutral, and negative
	Highcharts.chart('Positive', {
		maxFontSize: 30,
		// minFontSize:15,
		plotOptions:{
			series: {
				point: {
					events: {
					mouseOver: function () {
					var chart = this.series.chart;
					var chineseName = this.chinese;
					highLightKeyWord(chineseName);
					// console.log(chineseName)
					
					},
					mouseOut: function () {
						unhighLightKeyWord()
					}
				}	
				}
			}
		},
		chart:chartArgs,
		series: [{
			type: 'wordcloud',
			data: positiveData,
			name: 'Occurrences in Guaci',
			placementStrategy: 'randomHorizontal'
		}],
		title: {
			text: 'Positive Key Words',
			style: titleStyle,
			align:'right',
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span >{point.name}</span>: <b>{point.count}</b> of total<br/>'
		},
		credits:{
			enabled: false
		},
		colors:[colorForGua[0]]
	});


	// neutral Key Words
	Highcharts.chart('Neutral', {
		maxFontSize: 30,
		// minFontSize:15,
		plotOptions:{
			series: {
				point: {
					events: {
					mouseOver: function () {
					var chart = this.series.chart;
					var chineseName = this.chinese;
					highLightKeyWord(chineseName);
					// console.log(chineseName)
					
					},
					mouseOut: function () {
						unhighLightKeyWord()
					}
				}	
				}
			}
		},
		//
		chart:chartArgs,
		
		series: [{
			type: 'wordcloud',
			data: neutralData,
			name: 'Occurrences in Guaci'
		}],
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span >{point.name}</span>: <b>{point.count}</b> of total<br/>'
		},
		title: {
			text: 'Neutral Key Words',
			style: titleStyle,
			align:'right'
		},
		credits:{
			enabled: false
		},
		colors:[colorForGua[1]]
	});

	//negative Key Words
	Highcharts.chart('Negative', {
		maxFontSize: 30,
		// minFontSize:15,
		plotOptions:{
			series: {
				point: {
					events: {
					mouseOver: function () {
					var chart = this.series.chart;
					var chineseName = this.chinese;
					highLightKeyWord(chineseName);
					// console.log(chineseName)						
					},
					mouseOut: function () {
						unhighLightKeyWord()
					}
				}	
				}
			}
		},
		//
		chart:chartArgs,
		series: [{
			type: 'wordcloud',
			data: negativeData,
			name: 'Occurrences in Guaci'
		}],
		title: {
			text: 'Negative Key Words',
			style: titleStyle,
			align:'right'
		},
		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span >{point.name}</span>: <b>{point.count}</b> of total<br/>'
		},
		credits:{
			enabled: false
		},
		colors: [colorForGua[2]]
	});
	//Generate the tag clouds
	//click function call will render the highlight of the guaci's colors
}