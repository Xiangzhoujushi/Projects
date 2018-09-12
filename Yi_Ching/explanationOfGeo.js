
var textOpac = 0.7

function drawCenterArrows(object,point1,point2){
	// console.log(point2)
	// console.log(point1)
	object.append('g')
	.append('line')
	.style("stroke", "white") 
	.style('fill-opacity',0.7)
	.attr('stroke-dasharray', '1,9,10,9')
    .attr('stroke-linecap', 'butt')
    .attr('stroke-width', '3') 
  	.attr("x1", 0)     
    .attr("y1", 0)     
    .attr("x2", 20)     
    .attr("y2", 0)
}

function drawPolygonsArrows(object,point,size){
	p4 = (point[0]-size/2)+','+(point[1]+size)
	p2 = (point[0]-size/2)+','+(point[1]-size)
	p3 = (point[0]+2*size)+','+(point[1])
	p1 = point[0]+','+point[1]
	object.append('polygon')
	.attr('points',
		function(){
			return p1+','+p2+','+p3+','+p4;
		}
	)
	.style('fill','white')
	.style('fill-opacity',0.6)
}

var explanText = function(){

	var yinAndYang = ['#FF3E14','#0CCCD6']
	//the expediate
	var height = 300
	var width = 450
	var explan = d3.select('#maintext').append('svg')
	.style("background-color", '#262626')
	.attr('height',height)
	.attr('width',width)
	.style('opacity',0.9)
	.attr("transform",
		function(){
			var result = "translate("+0+","+500+")";
			return result;
		}
	);
	dt = [0,1,2,3,4,5]

	// generate the side frames.
	explan.append('rect')
    .attr('width', width-10)
    .attr('height', height-10)
    .attr('x', 5)
    .attr('y', 5)
    .attr('fill', 'none')
    .attr('stroke', 'grey')
    .attr('stroke-dasharray', '2,6')
    .attr('stroke-linecap', 'butt')
    .attr('stroke-width', '2')

	// generate those squares
	var squareLength = 11;
	var guaLayer = 3;
	var interval = 5;
	var d1 = ['#FF3E14','#0CCCD6']
	// var color
	explan.append('g').selectAll('rect')
	.data(d1).enter()
	.append('rect')
	.attr('x',function(d,i){
			return (i%1)*(squareLength+interval);
	})
	.attr('y',function(d,i){
		return Math.floor(i/1)*(squareLength+interval);
	})
	.attr('width',function(d,i){
		return squareLength;
	})
	.attr('height',function(d,i){
		return squareLength;
	})
	.style('fill',function(d,i){
		return d
	})
	.attr("transform",
		function(){
			var result = "translate("+300+","+25+")";
			return result;
	})

	explan.append('g').selectAll('text')
	.data(d1).enter().append('text')
	.attr("transform",
		function(){
			var result = "translate("+340+","+34+")";
			return result;
	})
	.attr('x',function(d,i){
		return (i%1)*(squareLength+interval);
	})
	.attr('y',function(d,i){
		return Math.floor(i/1)*(squareLength+interval);
	})
	.text(function(d,i){
		if (i == 0){return 'Yang'}
		else {return 'Yin'}
	})
	.style('fill',function(d,i){
		return 'white'
	})
	.style('fill-opacity',textOpac)
	.style('font-size',function(d,i){
		return '10px'
	});

	explan.append('g')
	.selectAll('rect')
	.data(dt).enter().append('rect')
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
	.style('stroke', function(d,i){
		// d is the index of the color
		return 'grey';
	})
	.style('fill',function(d,i){
		return 'none'
	})
	.attr("transform",
		function(){
			var result = "translate("+40+","+25+")";
			return result;
	})
	.style('stroke-width',function(d,i){
		return 1
	});

	// the hexagram/ the Gua
	// composed of six stages of Yin and Yang
	explan.append('g')
	.attr("transform",
		function(){
			var result = "translate("+40+","+25+")";
			return result;
	})
	.append('text')
	.attr('x',function(d,i){
		return 70
	})
	.attr('y',function(d,i){
		return 8
	})
	.text('Hexagram/the Gua')
	.style('fill',function(d,i){
		return 'white'
	})
	.style('fill-opacity',textOpac)
	.style('font-size',function(d,i){
		return '10px'
	});

	explan.append('g').attr("transform",
		function(){
			var result = "translate("+40+","+25+")";
			return result;
	})
	.append('text')
	.attr('x',function(d,i){
		return 70;
	})
	.attr('y',function(d,i){
		return 18;
	})
	.text('Composed of six stages of Yin and Yang')
	.style('fill',function(d,i){
		return 'white';
	})
	.style('fill-opacity',textOpac)
	.style('font-size',function(d,i){
		return '9px';
	})
	// .data(dt).enter().append('rect')
	// .attr('x',function(d,i){
	// 		return (i%guaLayer)*(squareLength+interval);
	// })
	// .attr('y',function(d,i){
	// 	return Math.floor(i/guaLayer)*(squareLength+interval);
	// })
	// .attr('width',function(d,i){
	// 	return squareLength;
	// })
	// .attr('height',function(d,i){
	// 	return squareLength;
	// })
	// .style('stroke', function(d,i){
	// 	// d is the index of the color
	// 	return 'grey';
	// })
	// .style('fill',function(d,i){
	// 	return 'none'
	// })
	// .attr("transform",
	// 	function(){
	// 		var result = "translate("+50+","+25+")";
	// 		return result;
	// })
	// .style('stroke-width',function(d,i){
	// 	return 1
	// });

	// explanation for the word count part
	var wordCount = explan.append('g').attr("transform",
		function(){
			var result = "translate("+50+","+(height/2+40)+")";
			return result;
	});

	// the append
	dt2 = [0,1,2,3,4,5,6]
	var countLength = 12
	wordCount.selectAll('rect')
	.data(dt2).enter().append('rect')
	.attr('x',function(d,i){
		return i*(countLength/2)-10;
	})
	.attr('y',function(d,i){
		return 0;
	})
	.attr('width',function(d,i){
		return countLength/2;
	})
	.attr('height',function(d,i){
		return countLength;
	})
	.style('stroke', function(d,i){
		// d is the index of the color
		return 'grey';
	})
	.style('fill',function(d,i){
		return 'none'
	})
	.style('stroke-width',function(d,i){
		return 1
	});

	var str1 = 'word count of the Decision'
	var str2 = 'King Wen\'s interpretation of the meaning of the gua'

	wordCount.append('text')
	.attr('x',countLength*7-30)
	.attr('y',5)
	.text(str1)
	.style("font-size", "10px")
	.style('font-weight',10)
	.style('fill', 'white')
	.style('fill-opacity',textOpac)

	wordCount.append('text')
	.attr('x',countLength*7-30)
	.attr('y',18)
	.text(str2)
	.style("font-size", "10px")
	.style('fill', 'white')
	.style('font-weight',10)
	.style('fill-opacity',textOpac)
	// var str3 = 

	// sentiment part for the gua interpretation
	var dt3 = [0,1,2]
	var sentiment = explan.append('g').attr("transform",
		function(){
			var result = "translate("+50+","+(height/2+70)+")";
			return result;
	});

	//
	ht = 15
	wt = 5 
	sentiment.selectAll('rect')
	.data(dt3).enter().append('rect')
	.attr('x',function(d,i){
		return 15;
	})
	.attr('y',function(d,i){
		return (ht+interval)*i;
	})
	.attr('width',function(d,i){
		return wt;
	})
	.attr('height',function(d,i){
		return ht;
	})
	.style('fill',function(d,i){
		return colorForGua[i]
	});

	//keywords explanations 
	var dt4 = ['Keyword for Positive meanings'
	, 'Keyword for Neutral meanings', 'Keyword for Negative meanings']
	
	sentiment.selectAll('text')
	.data(dt4).enter().append('text')
	.text(function(d,i){
		return d;
	})
	.attr('x',wt+50)
	.attr('y',function(d,i){
		return (ht+interval)*i+10
	})
	// .text(str2)
	.style("font-size", "10px")
	.style('fill', 'white')
	.style('font-weight',10)
	.style('fill-opacity',textOpac)
	// .style('stroke-width',function(d,i){
	// 	return 1
	// });
	// var subgraph = explan
	// .append('g')
	// .attr("transform",
	// 	function(){
	// 		var result = "translate("+50+","+(height/2+40)+")";
	// 		return result;
	// });
	// the meridian graph	
	var newdata = [0,1,3,-1,-3]
	var dummyColor = ['white','grey']
	var dummyGua = [0,2,4,1,3,5]
	var meridianGraph = explan.append('g')
	.attr('id','meridianDemo')
	.attr("transform",
		function(){
			var result = "translate("+150+","+120+")";
			return result;
	});
	var r = 47
	meridianGraph.append('circle')
	.attr('cx',0)
	.attr('cy',0)
	.attr('r',47)
	.style('fill','none')
	.attr('stroke', 'grey')
    .attr('stroke-dasharray', '1,2')
    .attr('stroke-linecap', 'butt')
    .attr('stroke-width', '1')

    p1 = [-1*r-20,0]
    p2 = [1*r+30,0]

    var end = 1*r+14
    // drawCenterArrows(meridianGraph,p1,p2)

    // the horizontal lines with the arrow heads
    meridianGraph.append('g')
	.append('line')
	.style("stroke", "white") 
	.attr('stroke-dasharray', '3,9,10,9')
    .attr('stroke-linecap', 'butt')
    .attr('stroke-opacity',0.6)
    .attr('stroke-width', '2') 
  	.attr("x1", p1[0])     
    .attr("y1", p1[1])     
    .attr("x2", p2[0])     
    .attr("y2", p2[1])

    var secondG = meridianGraph.append('g')
    .attr('transform',function()
	    {	
	    	return 'translate('+end+','+(0)+')'
	    }
    )
    drawPolygonsArrows(secondG,[0,0],4)

    // append the gua
    secondG.append('line').attr('x1',20).attr('y1',0)
    .attr('x2',35).attr('y2',0)
    .attr('stroke-opacity',0.6)
    .style("stroke", "white") 
    .attr('stroke-width', '1') 

    // append the labels for specifications
    secondG.append('text')
    .attr('x','40')
    .attr('y','3')
    .text('The Meridian')
    .style('fill-opacity',textOpac)
	.style('font-size','10px')
	.style('fill',function(d,i){
		return 'white'
	})

    // 
	newdata.forEach(function(d,i){
		// the dummy gua
		guaLayer = 3
		squareLength = 4
		interval = 1
		var cx = 0
		var cy = 0
		// squareLength = 
		var angle = d*45
		var subgraph = meridianGraph.append('g')
		.attr("transform",
			function(){
				var result = "rotate("+(angle)+","+cx+","+cy+") ";
				result+="translate("+40+","+0+")"
				return result;
			}
		);
		subgraph.append('g')
		.selectAll('rect')
		.data(dummyGua).enter()
		.append('rect')
		.attr('x',function(d2,i){
				return (i%guaLayer)*(squareLength+interval);
		})
		.attr('y',function(d2,i){
			return Math.floor(i/guaLayer)*(squareLength+interval)-squareLength;
		})
		.attr('width',function(d2,i){
			return squareLength;
		})
		.attr('height',function(d2,i){
			return squareLength;
		})
		.style('fill',function(d2,i){
			// if (d>=0) return 
			return dummyColor[d2%2];
				// dummyColor[(d2+1)%2];
		});
	});

	r = 50
	var angle = -1*Math.PI/4
	var startX = r*Math.cos(angle)
	var startY = r*Math.sin(angle)-7
	var graph = meridianGraph.append('g');

	graph.append('path').attr('d', 'M'+(startX)+","+(startY)+" V"+(startY-10)+" H"+(startX+40))
	.style('fill','None')
	.attr("stroke-width",1).attr("stroke", "white")
	.attr('stroke-opacity','0.7')

	graph.append('g')
	.attr("transform",
		function(){
			return "translate("+(startX+40)+","+(startY-10)+")"
		})
	.append('text').text('Upper Gua')
	.attr('x','5')
	.attr('y','3')
	.style('font-size','10px')
	.style('fill-opacity',textOpac)
	.style('fill',function(d,i){
		return 'white'
	})

	startY+=16
	graph.append('path').attr('d', 'M'+(startX)+","+(startY)+" V"+(startY+10)+" H"+(startX+40))
	.style('fill','None')
	.attr("stroke-width",1).attr("stroke", "white")
	.attr('stroke-opacity','0.7')

	graph.append('g')
	.attr("transform",
		function(){
			return "translate("+(startX+40)+","+(startY+10)+")"
		})
	.append('text').text('Lower Gua')
	.attr('x','5')
	.attr('y','3')
	.style('font-size','10px')
	.style('fill-opacity',textOpac)
	.style('fill',function(d,i){
		return 'white'
	})
}

