var sentimentsObject = [
	// 1 是 positive
	// 2 是 neutral
// 3 是偏向 negative
{'name':'positive','arr':['利','吉','貞吉','元','亨','悔亡','利貞','宜','貞','顒','尚','孚','得']},
{'name':'neutral','arr':['无咎','勿憂','无疾','无喪','无得']},
{'name':'negative','arr':['不利','凶','眚','匪正','孚窒','不寧','用獄','不家食','厲','喪','不宜','勿用']}
];

var translation = {
	"advantage": "利",
	"auspicious":"吉",
	"pure fortune":"貞吉",
	"primary fortune": "元", 
	"prosperous":"亨",
	'advantageous':'利',
	"regret vanishes":'悔亡',
	"abundant and pure":'利貞',
	"appropriate":'宜',
	"confident":'有孚',
	"determination":'貞',
	"reverence":'顒',
	"honored":'尚',
	"sincerity":'孚',
	"gain":'得',
	"no misfortune":'无咎',
	"no worries":'勿憂',
	"no fault":'无疾',
	"no loss":'无喪',
	"no gain":'无得',
	"have misfortune":'貞凶',
	"disadvantage":'不利',
	"ominous":'凶',
	"troublesome":'眚',
	"untruthful":'匪正',
	"lose faith":"孚窒",
	"lost friends":'喪朋',
	"restless":'不寧',
	"prosecuting":'用獄',
	"not eating at home":'不家食',
	"threatening":'厲',
	"loss":'喪',
	"not appropriate":'不宜',
	"no engaging":'勿用'
}


var sentimentTable = {
	'positive':0,
	'neutral':1,
	'negative':2
};

var sentimentClass = ['Positive','Neutral','Negative']
// array for labelling the colored or uncolored rectangles
// var labelArr = new Array(numberOfLayer1)
// the color list for yin and yang
var colorList = ['#0cccd6','#ff3e13'];
var sentimentsCount = {};
// for (key in translation.keys){
// 	value = translation[key]
// 	sentimentsCount[key] = [0,value,]
// }	
// sort sentiment by length of the string
sentimentsArray = []
sentimentsObject.forEach(
	function(d){
		var array = d.arr
		var name = d.name
		array.forEach(
			function(d2){
				sentimentsArray.push({'id':d2,'label':name})
				key = findTranslation(d2)
				sentimentsCount[key] = [d2,name,0]
			}
		)
	}
)

function findTranslation(characters){
				for (key in translation){
					value = translation[key];
					if (value == characters){
						return key
					}

				}

}
		// sort the sentiments array by lenghth
sentimentsArray.sort(
	function(a,b){
		return b['id'].length-a['id'].length
	}
)	


// the word cloud charts using high chart API, alternative way 
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
// highlight the key word
function highLightKeyWord(word){
	// go over the hexagrams and color the rectangle
	var svg = d3.select('#BieGua>svg')
	var newGraph = svg.append('g')
	.attr("transform",
		function(){
			var result = "translate("+200+","+200+")";
			return result;
		}
	)
	.attr('class','highlight');
	var squareLength = 7;
	// the interval between each rectangel
	var interval = 1;
	// the number of yao in each layer
	var guaLayer = 3;
	// the width of the layer
	var layerWidth = 7;
	// shifted the rectangles
	var moveToMid = (2*layerWidth+interval)/2
	var centerX = 200;
	var centerY = 200;
	hexagrams.forEach(function(data,iprime){
		ci = guaci[iprime]
		var index = ci.indexOf(word)
		// console.log(ci)
		if(index>-1 && ci[index-1]!="不" && ci[index-1]!="无"){
			// console.log("enter")
			var angle = 360/64.0*iprime;
			var subgraph = newGraph.append('g');
			// rotate through the graph
			subgraph.attr("transform",
				function(){
					var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
					result+="translate("+400+","+200+")"
					return result;
				}
			);
			var numberOfLayer1 = getNumOfLayer(iprime);
			var startX =guaLayer*squareLength+guaLayer*interval;
			var startY = -1;
			var endY = -1;
			var endX = startX+numberOfLayer1*layerWidth;

			var highLight = subgraph.append('g').attr('transform',
						function(){
							var str = "translate("+0+","+-1*moveToMid+")";
							return str;
						});

			highLight.append('rect')
				.attr('x',startX+layerWidth*index+0.5)
				.attr('y',-3.5)
				.attr('width',function(){
					// return squareLength;
					return layerWidth * word.length-1;
				})
				.attr('height',function(){
					// return squareLength;
					return 2*layerWidth+interval+6.5;
				})
				.style('fill', function(){
					// highlight using white
					return "white";
			});

		}

	})
}

// unhighlight the keyword
function unhighLightKeyWord(){
	d3.select('.highlight').remove()
}

// render the word clouds
function renderTagCloudsForSentiments(idStr){
	positiveData =[];
	neutralData =[];
	negativeData =[];	
	colorForGua = ['#8e8e8e','#5e5e5e','#000000']
	for (var key in sentimentsCount){
		// console.log(key)
		if (sentimentsCount[key][1] == "positive"){
			positiveData.push(
				{"name":key+"("+sentimentsCount[key][0]+")",
				"chinese":sentimentsCount[key][0],
				"count":sentimentsCount[key][2],
				'tag':0,
				"color":colorForGua[0],
				"weight":normalizeCount(sentimentsCount[key][2])}
				);
		}
		if (sentimentsCount[key][1] == "neutral"){
			neutralData.push(
				{"name":key+"("+sentimentsCount[key][0]+")",
				"chinese":sentimentsCount[key][0],
				"count":sentimentsCount[key][2],
				'tag':1,
				"color":colorForGua[1],
				"weight":normalizeCount(sentimentsCount[key][2])}
				);
		}
		if (sentimentsCount[key][1] == "negative"){
			negativeData.push(
				{"name":key+"("+sentimentsCount[key][0]+")",
				"chinese":sentimentsCount[key][0],
				"count":sentimentsCount[key][2],
				'tag':2,
				"color":colorForGua[2],
				"weight":normalizeCount(sentimentsCount[key][2])}
				);
		}

	}
	// console.log(positiveData)
	//A link to the mouseover, mouse on events
	AllData = positiveData.concat(neutralData,negativeData)
	//http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-point-events-mouseover/

	var fontSize = 14;
	var width = 250;
	var background = '#1c1c1c';
	var height = 700;
	var space  = 5;
	var margin = 30;
	var marginLeft = 50;
	var factor = 0;
	// //Tag clouds For all chinese characters
	var svg = d3.select('#'+idStr).append('svg')
	// .style("background-color", background)
	.attr('height',height).attr('width',width)
	.attr('class','switchSection')
	.attr("transform",
		function(){
			var result = "translate("+200+","+(-300)+")";
			return result;
	})
	.style('opacity',1)
	.style("background-color", background)
	var textGraph = svg.append('g').attr('transform',
		'translate(20,5)'
	);

	var wordClouds = textGraph.selectAll('text')
	.data(AllData).enter().append('text')
	.text(function(d){
		return d.name
	})
	.attr('x', d =>  {
		// x start from 20
		x = 20;
		return x;
	})
	.attr('y', (d,i)=>{
		// console.log(AllData[i-1])
		// add the rectangels here
		// var prevData = 
		if (i<=0 || (AllData[i-1].tag!= d.tag)){
			// labels for classification of keywords 
			factor += 27;
			textGraph.append('rect')
			.attr('x',-20)
			.attr('y',i*(fontSize+space)+factor-33)
			.attr('height',22)
			.attr('width',width)
			.style('fill',d.color);

			textGraph.append('text')
			.attr('x',-18)
			.attr('y',i*(fontSize+space)+factor-35/2+1)
			.style('fill','white')
			.style('fill-opacity',0.8)
			.text(sentimentClass[d.tag].toUpperCase())
			.style('font-size', fontSize+2)
			factor += 5;
			// .attr('height',15)
			// .attr('width',width/2)
			// .style('fill',d.color);
			// append the title
		}
		var  yPosition = i*(fontSize+space)+factor

		var textColor = '#8c8c8c'
		// append the rectangels in the front
		var rectangle = textGraph
		.append('rect')
		.attr('x',-10)
		.attr('y',yPosition-7)
		.attr('height',8)
		.attr('width',20)
		.style('fill',d.color)
		.on('mouseover',function(){
			var name = d.chinese;
			highLightKeyWord(name)

	// console.log(d)
		}).on('mouseout',function(){
			unhighLightKeyWord();
		});
		// yPosition+=factor;
		return yPosition;
	})
	.style('fill',d=> {return '#8c8c8c'})
	.style('font-size', fontSize)
	.on('mouseover',function(d){
		var name = d.chinese;
		highLightKeyWord(name)
		d3.select(this).style('fill','white')
	// console.log(d)
	}).on('mouseout',function(d){
		unhighLightKeyWord();
		d3.select(this).style('fill','#8c8c8c')
	});
	// append the title for the key words
	// append the 
}

