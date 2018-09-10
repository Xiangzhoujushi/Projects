

// append the yao text in the graph
// 这个是爻辞的 部分
// pass over the idStr
var yinAndYang = ['#FF3E14','#0CCCD6']
var background = '#1c1c1c'
var transitionColors = ['#FF9A00','#71DD3E','FFFF3D']
function drawYaoDetails(){

	var interval = 1.5
	var hInterval = 4
	var sideLength = 1
	d3.select('.graphDisplayInCenter').remove();
	// create a new set of graphs
	var graph = d3.select('#BieGua>svg')
	.append('g')
	.attr("transform",
		function(){
			var result = "translate("+200+","+200+")";
			return result;
	})
	.attr('class','graphDisplayInCenter')
	.attr('id','yaoDetails')

	centerX=centerY = 200
	hexagrams2 = [hexagrams[0]]
	// for each hexagrams
	hexagrams.forEach(function(d,i){
		var angle = 360/64.0*i;
		var subgraph = graph.append('g');
		// rotate through the graph
		subgraph.attr("transform",
			function(){
				var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
				result+="translate("+400+","+200+")"
				return result;
		});

		//then draw those small yao texts,阴阳的小 yao text
		var numberOfYao = yaociAll.length
		var shifted = -1*((numberOfYao-1)*interval+sideLength*numberOfYao)/2
		for (var j = 0; j<numberOfYao;j++){
			var rectGroups = subgraph.append('g').attr("transform",
			function(){
				var hshifted = -1*(hInterval+sideLength)*yaociAll[j][i].length-20
				return "translate("+hshifted+","+shifted+")";
			});
			//current Yao,判断关键字的位置,

			var currYao = yaociAll[j][i]
			// console.log(currYao)
			indicies = [-1,-1,-1]
			var words = ['吉','无咎','凶']
			for (var m = 0; m<words.length;m++){
				indicies[m] = currYao.indexOf(words[m])
			}
			// the fix of 
			var color = yinAndYang[d[i]]
			// the fix of the
			rectGroups.selectAll('rect')
			.data(currYao)
			.enter()
			.append('rect')
			.attr('x',function(d2,k){
				return k*(sideLength+hInterval)
			})
			.attr('y',function(d2,k){
				return 0
			})
			.attr('width',function(d2,k){
				return sideLength;
			})
			.attr('height',function(d2,k){
				return sideLength;
			})
			.style('fill', function(d2,k){
				// d is the index of the color
				if (indicies.indexOf(k)==-1){
					// k position does not have key words
					// console.log(yinAndYang)
					return yinAndYang[(d[j]+1)%2];
				}else{
					return '#262626';
				}
			});
			var sz = 0.5
			for (var n = 0; n<words.length;n++){
				px = indicies[n]*(sideLength+hInterval)+sz
				py = sz
				arr = [px,py]
				if (indicies[n]>=0){
					if (n == 0) drawCircle(arr,rectGroups,sz)
					if (n == 1) drawTriangle2(arr,rectGroups,sz)
					if (n == 2) drawCross(arr,rectGroups,sz,0.2)
				}
			}
			// if (index>=0){
			// 	var sz = 0.5
			// 	
			// 	// console.log(px)
			// 	switch(keyWordId){
			// 	case 1: 
			// 		drawCircle([px,py],rectGroups,sz)
			// 		break;
			// 	case 2:
			// 		drawTriangle2([px,py],rectGroups,sz)
			// 		break;
			// 	case 3:
			// 		// divination key words
			// 		drawCross([px,py],rectGroups,sz,0.2)
			// 		break;
			// 	default:
			// 		// doing nothing
			// 		break;
			// 	}

			// }
			// update that part
			shifted += (interval+sideLength)
			// then for each of the graphs, we deal with that
			// edition on the ji xiong wujiu.

		}
	});
	if (d3.select('.graphDisplayInCenter').attr('id') == 'yaoDetails'){
		var transHighlights = [1,2,3]
		transHighlights.forEach(function(d2,i){
			var className = 'trans'+d2
			var object = d3.selectAll('.'+className)
			object.on('mouseover',function(){
				highlightTrans(object,d2,interval,hInterval,sideLength)
			})
			.on('mouseout',function(){
				unhighlightTrans(object,d2)
			})
			//object, transitionID,interval,hInterval,sideLength
		})
		// the details on the graph, our gua
	}
}

// the interactive part of the code
function highlightTrans(object, transitionID,interval,hInterval,sideLength){
	// the object selected, the transitionID.
	var centerGroup = d3.select('.graphDisplayInCenter')
	// the selected rectangles, the highlighting effects
	rects = d3.select('rect.trans'+transitionID)
	// console.log(rects)
	rects.style('fill','grey')

	// 6 个爻
	var numberOfYao = 6

	// 选中当前的transtion type
	var transition = allTransitions[transitionID-1]
	// transition2 = [transition[0]]
	transition.forEach(
		function(d){
			// find out the first position,
			// find out the second position,
			// console.log(d)
			var guaIndex = d.number
			var yao1 = d.firstPos
			var yao2 = d.secondPos
			var i = guaIndex-1
			//create a new group
			var hlightGroup = centerGroup.append('g')
			.attr("transform",
				function(){
					var result = "translate("+200+","+200+")";
					return result;
			}).attr('class','transitionInYao');
			// 旋转，并且位移到相对应的位置
			var angle = (guaIndex-1)*(360/64)
			var centerX = 200
			var centerY = 200
			var secondLevelGraph = hlightGroup.attr("transform",
			function(){
				var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
				result+="translate("+400+","+200+")"
				return result;
			});

			var shifted = -1*((numberOfYao-1)*interval+sideLength*numberOfYao)/2
			var lineG = secondLevelGraph.append('g').attr("transform",
			function(){
				return "translate("+0+","+shifted+")";
			});

			// var p1x = (yao1-1)*(interval+sideLength)
			// var p2x =
			var p1y = (yao1-1)*(interval+sideLength)
			var p2y = (yao2-1)*(interval+sideLength)
			var p1x;
			var p2x;
			firstYao = yaociAll[yao1-1][i]
			secondYao = yaociAll[yao2-1][i]
			// console.log('j: '+yao1)
			// console.log('i: '+i)
			// console.log(guaIndex)
			// console.log(yao1+': '+firstYao)
			// console.log(yao2+': '+secondYao)

			// 因为内心还移动了一个格子
			var centerShifted = 0.5
			c1 = -1*(hInterval+sideLength)*firstYao.length-20
			c2 = -1*(hInterval+sideLength)*secondYao.length-20
			var wd = 0.8
			var newSz = 1.5
			switch(transitionID){
				case 1: 
					// ji -> wujiu
					if (firstYao.indexOf("吉")>=0){
						p1x = firstYao.indexOf("吉")*(hInterval+sideLength)+c1
						p2x = secondYao.indexOf("无咎")*(hInterval+sideLength)+c2
						drawCircle([p1x,p1y],lineG,newSz,1,'append-features')
						drawTriangle2([p2x,p2y],lineG,newSz,1,'append-features')
						// drawCircle(Triangle)
					}else{
						p2x = secondYao.indexOf("吉")*(hInterval+sideLength)+c2
						p1x = firstYao.indexOf("无咎")*(hInterval+sideLength)+c1
						drawCircle([p2x,p2y],lineG,newSz,1,'append-features')
						drawTriangle2([p1x,p1y],lineG,newSz,1,'append-features')
					}
					lineG.append('line')
					.style("stroke", transitionColors[0])  
					.style('fill-opacity',1)
				    .attr('stroke-width', wd)
				  	.attr("x1", p1x+centerShifted)     
				    .attr("x2", p2x+centerShifted)     
				    .attr("y1", p1y+centerShifted)     
				    .attr("y2", p2y+centerShifted);
					break;
				case 2:
					// ji -> xiong
					if (firstYao.indexOf("吉")>=0){
						p1x = firstYao.indexOf("吉")*(hInterval+sideLength)+c1
						p2x = secondYao.indexOf("凶")*(hInterval+sideLength)+c2
						drawCircle([p1x,p1y],lineG,newSz,1,'append-features')
						drawCross([p2x,p2y],lineG,newSz,newSz,1,'append-features')
					}else{
						p2x = secondYao.indexOf("吉")*(hInterval+sideLength)+c2
						p1x = firstYao.indexOf("凶")*(hInterval+sideLength)+c1
						drawCircle([p2x,p2y],lineG,newSz,1,'append-features')
						drawCross([p1x,p1y],lineG,newSz,newSz,1,'append-features')
					}
					lineG.append('line')
					.style("stroke", transitionColors[1])  
					.style('fill-opacity',1)
				    .attr('stroke-width', wd)
				  	.attr("x1", p1x+centerShifted)     
				    .attr("x2", p2x+centerShifted)     
				    .attr("y1", p1y+centerShifted)     
				    .attr("y2", p2y+centerShifted);
					break;
				case 3:
					// wujiu -> xiong
					if (firstYao.indexOf("凶")>=0){
						p1x = firstYao.indexOf("凶")*(hInterval+sideLength)+c1
						p2x = secondYao.indexOf("无咎")*(hInterval+sideLength)+c2
						drawTriangle2([p1x,p1y],lineG,1.5,1,'append-features')
						drawCross([p2x,p2y],lineG,1.5,1.5,1,'append-features')
					}else{
						p2x = secondYao.indexOf("凶")*(hInterval+sideLength)+c2
						p1x = firstYao.indexOf("无咎")*(hInterval+sideLength)+c1
						drawCross([p2x,p2y],lineG,1.5,1.5,1,'append-features')
						drawTriangle2([p1x,p1y],lineG,1.5,1,'append-features')
					}
					lineG.append('line')
					.style("stroke", transitionColors[2])  
					.style('fill-opacity',1)
				    .attr('stroke-width', wd)
				  	.attr("x1", p1x+centerShifted)     
				    .attr("x2", p2x+centerShifted)     
				    .attr("y1", p1y+centerShifted)     
				    .attr("y2", p2y+centerShifted);
					break;
				default:
					// doing nothing
					break;
			}
	})
}


function unhighlightTrans(object,transID){
	// console.log('take it')
	d3.selectAll('.transitionInYao').remove()
	// the selected rectangles, the highlighting effects
	d3.select('rect.trans'+transID).style('fill',background)
}

function appendYaoText(idStr){
	var ht = 500
	var wd = 250
	var textIndent = 35
	var lineInterval = 15
	

	// 设置背景图案
	var graph = d3.select('div#'+idStr).append('svg')
	.attr('height', function(){
		return ht;
	})
	.style("background-color", background)
	.attr('width',function(){
		return wd;
	})
	.attr('class','switchSection')
	.attr("transform",
		function(){
			var result = "translate("+200+","+(-300)+")";
			return result;
	}).append('g');

	//把每一方块叠上一层长方形方块，再叠上一层text
	var lenOfHeads = 30
	var widOfHeads = 250
	graph.append('rect')
	.attr('x',0)
	.attr('y',0)
	.style('fill',background)
	.attr('height',lenOfHeads)
	.attr('width',widOfHeads)

	graph.append('text')
	.text('The three most frequently')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent)
	.attr('y',lineInterval)

	graph.append('text')
	.text('occurred characters are:')
	.style('fill','white')

	.style('font-size',12)
	// .style('font-weight','bold')
	.attr('x',textIndent)
	.attr('y',2*lineInterval)
	.style('fill-opacity',0.6)


	var texts = [
		{name: 'auspicious', chinese: '吉'},
		{name: 'no misfortune', chinese: '无咎'},
		{name: 'ominous',chinese:'凶'}
	]
	// hover over 方块或者里面的字的时候，
	//我们 highligh 对应的transition。
	//generate the text

	var htNext2 = 50
	var wid2 = 250
	var sentimentLegends = graph.append('g')
	.attr("transform",
		function(){
			var result = "translate("+0+","+(40)+")";
			return result;
	});
	// the rectangles

	texts.forEach(function(d,i){
		var subgraph = sentimentLegends.append('g')
		.attr("transform",
		function(){
			var result = "translate("+0+","+(35*i+20)+")";
			return result;
		});

		subgraph.append('text')
		.text(d.chinese+' '+d.name)
		.attr('x',textIndent)
		.attr('y',lineInterval)
		.style('fill','white')
		.style('fill-opacity',0.6)
		.style('font-size',12)

		var legendPattern = subgraph.append('g')
		.attr("transform",
		function(){
			//因为表现吉凶的标志在行的最末尾，所以我们shifted 
			// right by 100 
			var result = "translate("+200+","+(12)+")";
			return result;
		});
		// 吉，凶，无咎，对应的不同的形状
		fillOpac = 1
		var p = [0,0]
		if (i==0){
			drawCircle(p,legendPattern,4,fillOpac,'ji')
		}else if(i==1){
			// draw triangle
			// var p1 = [0,0]
			drawTriangle2(p,legendPattern,4,fillOpac,'wujiu')
		}else{
			drawCross(p,legendPattern,4,1,fillOpac,'xiong')
			//draw 
		}
	});
	var currentG = graph.append('g')
	.attr("transform",
		function(){
			//因为表现吉凶的标志在行的最末尾，所以我们shifted 
			// right by 100 
			var result = "translate("+0+","+(30*2+120)+")";
			return result;
	});


	currentG.append('text')
	.text('The transitions between the three')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent)
	.attr('y',lineInterval)
	// draw the transitions 
	// finally the number of yaoci text,
	currentG.append('text')
	.text('stages of fortune are connected')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent)
	.attr('y',lineInterval*2)

	currentG.append('text')
	.text('and represented by the following:')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent)
	.attr('y',lineInterval*3)


	//相互转化的transition
	var transitions = [
		{s: 'auspicious', e: 'no misfortune'},
		{s: 'auspicious', e: 'ominous'},
		{s: 'no misfortune',e:'ominous'}
	]

	transitions.forEach(function(d,i){
		var subgraph = sentimentLegends.append('g')
		.attr("transform",
		function(){
			var result = "translate("+0+","+(35*i+35*3+105)+")";
			return result;
		});
		// select all class with trans1
		subgraph.append('rect')
		.attr('class','trans'+(i+1))
		.attr('x',0)
		.attr('y',0)
		.attr('height',lenOfHeads+5)
		.attr('width',widOfHeads)
		.style('fill',background)
		var transitionGraph = subgraph.append('g')
		// .on('mouseover',function(d,i){
		// 	// mouse over highlight functionality
		// })
		drawTransitions(i,subgraph)
	})
	// draw the graph in the center 
	drawYaoDetails();

	//加上user interactive 的feature


	//加上 下面两个段落的描述
	var yaoGraph = graph.append('g')
	.attr("transform",
		function(){
			//因为表现吉凶的标志在行的最末尾，所以我们shifted 
			// right by 100 
			var result = "translate("+(-15)+","+(30*3+35*3+110)+")";
			return result;
	});

	// 正方形的描述
	var pg1 = yaoGraph.append('g')
	.attr("transform",
		function(){
			//因为表现吉凶的标志在行的最末尾，所以我们shifted 
			// right by 100 
			var result = "translate("+0+","+70+")";
			return result;
	});
	//paragraph 1 对阴的描述
	pg1.append('rect')
	.attr('x',textIndent)
	.attr('y',10)
	.attr('height',3)
	.attr('width',3)
	.style('fill',yinAndYang[0])
	//
	pg1.append('text')
	.text('one character in one line of Yao Text')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent+30)
	.attr('y',lineInterval)

	pg1.append('text')
	.text('interpreting a Yang state')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent+30)
	.attr('y',lineInterval*2)

	// paragraph 2，对阳的描述
	var pg2 = yaoGraph.append('g')
	.attr("transform",
		function(){
			//因为表现吉凶的标志在行的最末尾，所以我们shifted 
			// right by 100 
			var result = "translate("+0+","+110+")";
			return result;
	});
	// the yin state of the graph
	pg2.append('text')
	.text('one character in one line of Yao Text')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent+30)
	.attr('y',lineInterval)

	pg2.append('text')
	.text('interpreting a Yin state')
	.style('fill','white')
	.style('font-size',12)
	// .style('font-weight','bold')
	.style('fill-opacity',0.6)
	.attr('x',textIndent+30)
	.attr('y',lineInterval*2)

	pg2.append('rect')
	.attr('x',textIndent)
	.attr('y',10)
	.attr('height',3)
	.attr('width',3)
	.style('fill',yinAndYang[1])

	// 加上分割的虚线
	// var 
	var len1 = 55
    var newarr = [0,1,2,3]
    newarr.forEach(
    	function(d,i){
		    graph.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', '2')
		    .attr("x1", 0)     // x position of the first end of the line
		    .attr("y1", len1+35*i)      // y position of the first end of the line
		    .attr("x2", widOfHeads)     // x position of the second end of the line
		    .attr("y2", len1+35*i); 
	})

	var len2 = 35*6+40
    var newarr = [0,1,2,3]
    newarr.forEach(
    	function(d,i){
		    graph.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', '2')
		    .attr("x1", 0)     // x position of the first end of the line
		    .attr("y1", len2+35*i)      // y position of the first end of the line
		    .attr("x2", widOfHeads)     // x position of the second end of the line
		    .attr("y2", len2+35*i); 
	});

	// finally deal with the mouse over

}

function drawCircle(origin,currentObject,size,opac,className){
	currentObject.append('circle')
	.attr('cx',origin[0])
	.attr('cy',origin[1])
	.attr('r',size)
	.style('fill','white')
	.style('fill-opacity',opac)
	.attr('class',className)
}

function drawTriangle2(point,currentObject,size,opac,className){
	// the points object of the graph
	p1 = (point[0]-size)+','+(point[1]+size)
	p2 = (point[0]+size)+','+(point[1]+size)
	p3 = point[0]+','+(point[1]-size)
	currentObject.append('polygon')
	.attr('points',
		function(){
			return p1+','+p2+','+p3;
		}
	)
	.style('fill','white')
	.style('fill-opacity',opac)
	.attr('class',className)
}

function drawCross(p,currentObject,size,swidth,opac,className){
	currentObject.append('line')
	.style("stroke", "white")  
	// .attr('stroke-dasharray', '2,3')
    // .attr('stroke-linecap', 'butt')
    .attr('stroke-width', swidth)
    .attr("x1", p[0]-size)     // x position of the first end of the line
    .attr("y1", p[1]-size)      // y position of the first end of the line
    .attr("x2", p[0]+size)     // x position of the second end of the line
    .attr("y2", p[1]+size)
    .style('stroke-opacity',opac)
    .attr('class',className)

	currentObject.append('line')
	.style("stroke", "white") 
	.style('stroke-opacity',opac) 
	// .attr('stroke-dasharray', '2,3')
    // .attr('stroke-linecap', 'butt')
    .attr('stroke-width', swidth)
    .attr("x1", p[0]+size)     // x position of the first end of the line
    .attr("y1", p[1]-size)      // y position of the first end of the line
    .attr("x2", p[0]-size)    // x position of the second end of the line
    .attr("y2", p[1]+size)
    .attr('class',className)
    //
}
function drawDoubleArrows(p, currentObject,size,swidth,opac,className){
	currentObject.append("defs")
	.append("marker")
	.attr("id","arrow")
	.attr("viewBox",
		function(){
			return "0 -5 10 10"
		}
	)
	.attr("refX",5)
	.attr("refY",0)
	.attr("markerWidth",4)
	.attr("markerHeight",4)
	.attr("orient",'auto')
	.append("path")
	.attr("d", "M0,-5L10,0L0,5")
	.attr("stroke", "None")
	.style('fill-opacity',opac)
	.style('fill','white')
	.style('fill-opacity',opac)
	.attr("class","arrowHead");
	var length = 20
	// 
	currentObject
	.append('g').attr("transform",
		function(){ 
			return "translate("+0+","+(-size/2)+")";
	})
	.attr('class',className)
	.append('path').attr('d', 'M 0,0, L 40,0, Z')
	.attr("stroke-width",swidth).attr("stroke", "white")
	.attr('stroke-opacity',opac) 
	.attr("marker-end", "url(#arrow)")

	currentObject
	.append('g').attr("transform",
		function(){ 
			return "translate("+0+","+(size/2)+")";
	})
	.attr('class',className)
	.append('path').attr('d', 'M40,0, L 0,0, Z')
	.attr("stroke-width",swidth).attr("stroke", "white")
	.attr('stroke-opacity',opac) 
	.attr("marker-end", "url(#arrow)")
}

var h = 35
function drawTransitions(i,transG){
	j = 0
	var g1 = transG.append('g').attr("transform",
		function(){
		var result = "translate("+60+","+(h/2)+")";
		return result;
	});
	var g2 = transG.append('g').attr("transform",
		function(){
		var result = "translate("+70+","+(h/2)+")";
		return result;
	});	
	var g3 = transG.append('g').attr("transform",
		function(){
		var result = "translate("+120+","+(h/2)+")";
		return result;
	});	
	var g4 = transG.append('g').attr("transform",
		function(){
		var result = "translate("+180+","+(10)+")";
		return result;
	});	
	p = [0,0]
	var fillOpac = 0.6
	if(i==0){
		drawCircle(p,g1,4,fillOpac,'trans1')
		// draw the transtion lines
		drawDoubleArrows(p,g2,4,1,fillOpac,'trans1')
		// 
		drawTriangle2(p,g3,4,fillOpac,'trans1')
		g4.append('line')
		.style("stroke", transitionColors[i])  
		.style('fill-opacity',0.7)
		// .attr('stroke-dasharray', '3,4')
	 //    .attr('stroke-linecap', 'butt')
	    .attr('stroke-width', '2')
	  	.attr("x1", p[0]-15)     
	    .attr("x2", p[0]+15)     
	    .attr("x1", p[1]-15)     
	    .attr("y2", p[1]+15); 
	}else if (i==1){
		drawCircle(p,g1,4,fillOpac,'trans2')
		// draw the transtion lines
		drawDoubleArrows(p,g2,4,1,fillOpac,'trans1')
		drawCross(p,g3,4,1,fillOpac,'trans2')
		g4.append('line')
		.style("stroke", transitionColors[i])  
		.style('fill-opacity',0.7)
		// .attr('stroke-dasharray', '2,2,4,2,2')
		// .attr('stroke-linecap', 'butt')
		.attr('stroke-width', '2') 
		// .style('fill-opacity',0.7)
	  	.attr("x1", p[0]-15)     
	    .attr("x2", p[0]+15)     
	    .attr("x1", p[1]-15)     
	    .attr("y2", p[1]+15)
		// transG.append()
	}else{
		drawTriangle2(p,g1,4,fillOpac,'trans3')
		drawDoubleArrows(p,g2,4,1,fillOpac,'trans1')
		drawCross(p,g3,4,1,fillOpac,'trans3')
		g4.append('line')
		.style("stroke",transitionColors[i]) 
		.style('fill-opacity',0.7)
		// .attr('stroke-dasharray', '2,2,4,2,2')
	 //    .attr('stroke-linecap', 'butt')
	    .attr('stroke-width', '2') 
	  	.attr("x1", p[0]-15)     
	    .attr("x2", p[0]+15)     
	    .attr("x1", p[1]-15)     
	    .attr("y2", p[1]+15)
		// transG.append()
	}

}