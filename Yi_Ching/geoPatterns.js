// console.log('ofo')
var colorList = ['#0CCCD6','#FF3E14']
function highlightAll(token_str){
	var token_arr = token_str.split('_')
	var symbol;
	if (token_arr[1] =='nine'){
		symbol = 1
	}else{
		symbol = 0
	}
	hexagrams.forEach(function(d,i){
		var position = token_arr[2]
		if (d[position] == symbol ){
			highlightSingle(i)
		}
	})
}

function unhighlightAll(token_str){
	var token_arr = token_str.split('_')
	var symbol;
	if (token_arr[1] =='nine'){
		symbol = 1
	}else{
		symbol = 0
	}
	hexagrams.forEach(function(d,i){
		var position = token_arr[2]
		if (d[position] == symbol ){
			unhighlightSingle(i)
		}
	})
}

function highlightSingle(guaOrder){
	var shiftPlacement = 35
	var angle = 360/64.0*guaOrder
	subgraph = d3.select('#'+'Gua_'+guaOrder)
	.attr("transform",
	function(){
		var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
		result+="translate("+(400+shiftPlacement)+","+200+")"
		return result;
	});
	data = hexagrams[guaOrder]

	// the attribute of the graph
	// var rects = subgraph.selectAll('.overview>rect').remove()
	var squareLength = parseInt(subgraph.select('.overview>rect').attr('height'))*1.25
	var interval = 1
	var guaLayer = 3
	var moveToMid = (squareLength*2+interval)/2;
	var rects = subgraph.selectAll('.overview').remove()
	var rectanglesGraph = subgraph.append('g');
	rectanglesGraph.attr('class','overview')
	rectanglesGraph.selectAll('rect').data(data).enter().append('rect')
	.attr('x',function(d,i){
		return (i%guaLayer)*(squareLength+interval);
	})
	.attr('y',function(d,i){
		return Math.floor(i/guaLayer)*(squareLength+interval)-moveToMid;
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
	}).style('fill-opacity',1)
	// .style('fill-opacity',1)
	// augl = sidel*1.25
	// var diff = augl-sidel
	// rects.style('fill-opacity',1)
	// rects.attr('height',augl).attr('width',augl)
	// .attr('x',function(){
	// 	var prevX = d3.select(this).attr('x')

	// })
	// .attr('y',function(){

	// })
	// subgraph.append('g')
}

function unhighlightSingle(guaOrder){
	// var shiftPlacement = 
	var angle = 360/64.0*guaOrder
	subgraph = d3.select('#'+'Gua_'+guaOrder)
	.attr("transform",
	function(){
		var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
		result+="translate("+400+","+200+")"
		return result;
	});

	data = hexagrams[guaOrder]

	// the attribute of the graph
	// var rects = subgraph.selectAll('.overview>rect').remove()
	var squareLength = 7
	var interval = 1
	var guaLayer = 3
	var moveToMid = (squareLength*2+interval)/2;
	var rects = subgraph.selectAll('.overview').remove()
	var rectanglesGraph = subgraph.append('g');
	rectanglesGraph.attr('class','overview')
	rectanglesGraph.selectAll('rect').data(data).enter().append('rect')
	.attr('x',function(d,i){
		return (i%guaLayer)*(squareLength+interval);
	})
	.attr('y',function(d,i){
		return Math.floor(i/guaLayer)*(squareLength+interval)-moveToMid;
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
	}).style('fill-opacity',0.8)

}

function appendGeoPattern(idStr){
	var background = '#1c1c1c'
	var ht = 580
	var wd = 250
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
	}).append('g')

	var tokens = [['initial','nine',0,'初九'],
	['second','nine',1,'九二'],['third','nine',2,'九三'],['forth','nine',3,'九四'],['fifth','nine',4,'九五'],
	['top','nine',5,'上九'],
	['initial','six',0,'初六'],
	['second','six',1,'六二'],
	['third','six',2,'六三'],
	['forth','six',3,'六四'],
	['fifth','six',4,'六五'],
	['top','six',5,'上六']]
	var guadata = [0,1,2,3,4,5]
	var len = 80
	var guaLayer1= 3
	var guaLayer2 = 3
	var squareLength = 12
	var interval = 5
	var yinAndYang = ['#FF3E14','#0CCCD6']

	var strokWidth = 1
	//vertical lines
	var right = 0 // shifted right
	var down = 0 // shifted down
	// var hLines =

	// var colors = ['black','#262626']
	// draw the sparation line
	tokens.forEach((d,i)=>{
		var h = Math.floor((i/guaLayer1))*len+20
		var w = (i%guaLayer1)*len+20
		var g2 = graph.append('g').attr("transform",
			function(){
				var result = "translate("+w+","+h+")";
				return result;
		});

		var str = d[0]+'_'+d[1]+'_'+d[2];

		var paddingWd = wd/3
		var paddingHt = 80
		// the rectangle length and height
		g2.append('g')
		.append('rect')
		.attr('x',-20+strokWidth)
		.attr('y',-20+strokWidth)
		.attr('width',paddingWd)
		.attr('height',paddingHt)

		// .stroke('width')
		.style('fill',background)
		.style("stroke", "grey")  
		.attr('stroke-dasharray', '2,3')
	    // .attr('stroke-linecap', 'butt')
	    .attr('stroke-width', strokWidth)
	    .attr('class',str)
	   

		// all legends
		g2.append('g')
		.selectAll('rect')
		.data(guadata).enter()
		.append('rect')
		.attr('x',function(d2,i2){
				return (i2%guaLayer2)*(squareLength+interval);
		})
		.attr('y',function(d2,i2){
			return Math.floor(i2/guaLayer2)*(squareLength+interval);
		})
		.attr('width',function(d2,i2){
			return squareLength;
		})
		.attr('height',function(d2,i2){
			return squareLength;
		})
		.style('stroke', function(d2,i2){
		// d is the index of the color
			return 'grey';
		})
		.style('fill',function(d2,i2){
			if (i2 == d[2]) return yinAndYang[Math.floor(i/6)]
			else return 'none'
		})
		.style('stroke-width',function(d2,i2){
			return 1
		})
		.style('fill-opacity','1')
		.attr('class',str);


		g2.append('g').append('text')
		.text(function(){
			return d[0]+' '+d[1]
		})
		.attr('x',
			function(){
				var str = d[0]+' '+d[1]
				return 13-str.length
			}
		)
		.attr('y',40)
		.style("font-size", "10px")
		.style('font-weight',10)
		.style('fill', 'white')
		.style('fill-opacity','0.5')
		.attr('class',d[0]+'_'+d[1]+'_'+d[2]);


		g2.append('g').append('text')
		.text(function(){
			return d[3]
		})
		.attr('x',14)
		.attr('y',54)
		.style("font-size", "10px")
		.style('font-weight',10)
		.style('fill', 'white')
		.style('fill-opacity','0.5')
		.attr('class',d[0]+'_'+d[1]+'_'+d[2]);
		//pseudo number for the object

		// the lines
		// if (i%3 == 0){
		// 	g2.append('line')
		// 	.style("stroke", "grey")  
		// 	.attr('stroke-dasharray', '2,3')
		//     .attr('stroke-linecap', 'butt')
		//     .attr('stroke-width', '2')
		//     .attr("x1", -50)     // x position of the first end of the line
		//     .attr("y1", 60)      // y position of the first end of the line
		//     .attr("x2", 250)     // x position of the second end of the line
		//     .attr("y2", 60); 
		// }

		// if (i==0 || i == 3){
	 //    	var right = Math.floor(i/guaLayer1+1)*len-17
		//     g2.append('line')
		// 	.style("stroke", "grey")  
		// 	.attr('stroke-dasharray', '2,3')
		//     .attr('stroke-linecap', 'butt')
		//     .attr('stroke-width', '2')
		//     .attr("x1",right )     // x position of the first end of the line
		//     .attr("y1", -h)      // y position of the first end of the line
		//     .attr("x2", right)     // x position of the second end of the line
		//     .attr("y2", 320-h); 

		//  //    var right = Math.floor(i/guaLayer1+1)*len-17
		//  //    g2.append('line')
		// 	// .style("stroke", "grey")  
		// 	// .attr('stroke-dasharray', '2,3')
		//  //    .attr('stroke-linecap', 'butt')
		//  //    .attr('stroke-width', '2')
		//  //    .attr("x1",right*2)     // x position of the first end of the line
		//  //    .attr("y1", -h)      // y position of the first end of the line
		//  //    .attr("x2", right*2)     // x position of the second end of the line
		//  //    .attr("y2", 305);
		// }

		d3.selectAll('.'+str)
		.on('mouseover',function(){
	    	var className = str
	    	d3.select('rect'+'.'+str).style('fill','#333333')
	    	// console.log(className)
	    	highlightAll(className)
	    })
	    .on('mouseout',function(){
	    	var className = str
	    	d3.select('rect'+'.'+str).style('fill','#1c1c1c')
	    	// console.log(className)
	    	unhighlightAll(className)
	    });

	});

	// draw boarder lines
	// draw the next level of the geometircal patterns
	var naturesArr = [
		{name:'heaven', data:[0,0,0]},
		{name:'earth', data:[1,1,1]},
		{name:'water', data:[1,0,1]},
		{name:'thunder', data:[1,1,0]},
		{name:'mountain', data:[1,0,1]},
		{name:'fire', data:[0,1,0]},
		{name:'wind',data:[0,0,1]},
		{name:'lake', data:[1,0,0]}
	]
	var guaLayer3 = 2
	var guaLayer4 = 3
	len1 = 30
	len2 = 120
	naturesArr.forEach((d,i)=>{
		var h = Math.floor((i/guaLayer3))*len1+40
		var w = (i%guaLayer3)*len2+20
		var g3 = graph.append('g').attr("transform",
			function(){
				var result = "translate("+w+","+(h+300)+")";
				return result;
		});

		g3.append('g')
		.selectAll('rect')
		.data(d.data).enter()
		.append('rect')
		.attr('x',function(d2,i2){
				return (i2%guaLayer4)*(squareLength+interval);
		})
		.attr('y',function(d2,i2){
			return Math.floor(i2/guaLayer4)*(squareLength+interval);
		})
		.attr('width',function(d2,i2){
			return squareLength;
		})
		.attr('height',function(d2,i2){
			return squareLength;
		})
		// .style('stroke', function(d2,i2){
		// // d is the index of the color
		// 	return 'grey';
		// })
		.style('fill',function(d2,i2){
			return yinAndYang[d2]
		})
		// .style('stroke-width',function(d2,i2){
		// 	return 1
		// })
		.style('fill-opacity','1');

		g3.append('g').append('text')
		.text(function(){
			return d.name
		})
		.attr('x',55)
		.attr('y',10)
		.style("font-size", "10px")
		.style('font-weight',10)
		.style('fill', 'white')
		.style('fill-opacity','0.5')

		// dotted lines
		if (i == 0){
			// horizontal line
			g3.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    // .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', strokWidth)
		    .attr("x1", -30)     // x position of the first end of the line
		    .attr("y1", -7)      // y position of the first end of the line
		    .attr("x2", 250)     // x position of the second end of the line
		    .attr("y2", -7); 
		    // the vertical line
		    g3.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    // .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', strokWidth)
		    .attr("x1", 105)     // x position of the first end of the line
		    .attr("y1", -7)      // y position of the first end of the line
		    .attr("x2", 105)     // x position of the second end of the line
		    .attr("y2", 110); 
		}
		if (i%2 == 0){
			g3.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    // .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', strokWidth)
		    .attr("x1", -30)     // x position of the first end of the line
		    .attr("y1", 20)      // y position of the first end of the line
		    .attr("x2", 250)     // x position of the second end of the line
		    .attr("y2", 20); 
		}
	})

	var pairsDivision = [
		{name:'Opposite Pairs', dt:[[0,0,0,0,0,0],[1,1,1,1,1,1]]},
		{name: 'Inverse Pairs',dt:[[1,0,1,0,0,0],[0,0,0,1,0,1]]}
	]

	pairsDivision.forEach((d,i)=>{
		len1 = 50
		len2 = 140
		var squareLength = 9
		var guaLayer5 = 1
		var h = Math.floor((i/guaLayer5))*len1+170
		var w = (i%guaLayer5)*len2+10
		var g4 = graph.append('g').attr("transform",
			function(){
				var result = "translate("+150+","+(h+310)+")";
				return result;
		});

		interval = 2

		// the text
		g4.append('g')
		.attr("transform",
			function(){
				var result = "translate("+(-180)+","+(0)+")";
				return result;
		})
		.append('text')
		.text(function(){
			return d.name
		})
		.attr('x',40)
		.attr('y',13)
		.style("font-size", "14px")
		.style('font-weight',13)
		.style('fill', 'white')
		.style('fill-opacity','0.5')

		g4.append('line')          // attach a line
	    .style("stroke", "grey")  // colour the line
	    .attr("x1", 40)     // x position of the first end of the line
	    .attr("y1", 10)      // y position of the first end of the line
	    .attr("x2", 50)     // x position of the second end of the line
	    .attr("y2", 10); 

		// first pair
		g4.append('g')
		.selectAll('rect')
		.data(d.dt[0]).enter()
		.append('rect')
		.attr('x',function(d2,i2){
				return (i2%guaLayer4)*(squareLength+interval);
		})
		.attr('y',function(d2,i2){
			return Math.floor(i2/guaLayer4)*(squareLength+interval);
		})
		.attr('width',function(d2,i2){
			return squareLength;
		})
		.attr('height',function(d2,i2){
			return squareLength;
		})
		.style('fill',function(d2,i2){
			return yinAndYang[d2]
		})
		.style('fill-opacity','1');

		// the second pair
		g4.append('g').attr("transform",
			function(){
				var result = "translate("+60+","+(0)+")";
				return result;
		})
		.selectAll('rect')
		.data(d.dt[1]).enter()
		.append('rect')
		.attr('x',function(d2,i2){
				return (i2%guaLayer4)*(squareLength+interval);
		})
		.attr('y',function(d2,i2){
			return Math.floor(i2/guaLayer4)*(squareLength+interval);
		})
		.attr('width',function(d2,i2){
			return squareLength;
		})
		.attr('height',function(d2,i2){
			return squareLength;
		})
		.style('fill',function(d2,i2){
			return yinAndYang[d2]
		})
		.style('fill-opacity','1');

		// dotted lines
		if (i == 0){
			// horizontal line
			g4.append('line')
			.style("stroke", "grey")  
			.attr('stroke-dasharray', '2,3')
		    // .attr('stroke-linecap', 'butt')
		    .attr('stroke-width', strokWidth)
		    .attr("x1", -150)     // x position of the first end of the line
		    .attr("y1", -15)      // y position of the first end of the line
		    .attr("x2", 200)     // x position of the second end of the line
		    .attr("y2", -15); 
		    // the vertical line
		 //    g4.append('line')
			// .style("stroke", "grey")  
			// .attr('stroke-dasharray', '2,3')
		 //    .attr('stroke-linecap', 'butt')
		 //    .attr('stroke-width', '2')
		 //    .attr("x1", (-200+175))     // x position of the first end of the line
		 //    .attr("y1", -20)      // y position of the first end of the line
		 //    .attr("x2", (-200+175))     // x position of the second end of the line
		 //    .attr("y2", 110); 
		}
		
		g4.append('line')
		.style("stroke", "grey")  
		.attr('stroke-dasharray', '2,3')
	    // .attr('stroke-linecap', 'butt')
	    .attr('stroke-width', strokWidth)
	    .attr("x1", -150)     // x position of the first end of the line
	    .attr("y1", 35)      // y position of the first end of the line
	    .attr("x2", 200)     // x position of the second end of the line
	    .attr("y2", 35); 
		
	})


}