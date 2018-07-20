var themes = {
	name: "theme", value:91,
	children:[
		{name:"Mindset",value:20,
		children:[
			{name:2,value:1},
			{name:3,value:1},
			{name:4,value:1},
			{name:5,value:1},
			{name:6,value:1},
			{name:34,value:1},
			{name:9,value:1},
			{name:10,value:1},
			{name:11,value:1},
			{name:12,value:1},
			{name:15,value:1},
			{name:61,value:1},
			{name:17,value:1},
			{name:41,value:1},
			{name:51,value:1},
			{name:25,value:1},
			{name:29,value:1},
			{name:30,value:1},
			{name:63,value:1},
			{name:64,value:1}
		]	
		},
			{name:"Behavior",value:38,
			children:[
				{name:4,value:1},
				{name:6,value:1},
				{name:7,value:1},
				{name:10,value:1},
				{name:11,value:1},
				{name:12,value:1},
				{name:20,value:1},
				{name:21,value:1},
				{name:22,value:1},
				{name:23,value:1},
				{name:24,value:1},
				{name:25,value:1},
				{name:26,value:1},
				{name:27,value:1},
				{name:28,value:1},
				{name:29,value:1},
				{name:30,value:1},
				{name:31,value:1},
				{name:32,value:1},
				{name:33,value:1},
				{name:34,value:1},
				{name:36,value:1},
				{name:37,value:1},
				{name:39,value:1},
				{name:40,value:1},
				{name:41,value:1},
				{name:42,value:1},
				{name:43,value:1},
				{name:44,value:1},
				{name:45,value:1},
				{name:48,value:1},
				{name:52,value:1},
				{name:53,value:1},
				{name:55,value:1},
				{name:57,value:1},
				{name:60,value:1},
				{name:61,value:1},
				{name:62,value:1}
			]},
			{name:"Relationship",value:7,
			children:[
				{name:38,value:1},
				{name:8,value:1},
				{name:12,value:1},
				{name:13,value:1},
				{name:49,value:1},
				{name:52,value:1},
				{name:24,value:1}
				]
			},
		{name:"Journey",value:10, 
			children:[
				{name:2,value:1},
				{name:5,value:1},
				{name:6,value:1},
				{name:56,value:1},
				{name:24,value:1},
				{name:25,value:1},
				{name:26,value:1},
				{name:59,value:1},
				{name:28,value:1},
				{name:61,value:1}
			]
		},
		{name:"Family",value:1,
			children:[
				{name:37,value:1}
			]
		},
		{name:"Orientation",value:4,
			children: [
				{name:2,value:1},
				{name:46,value:1},
				{name:39,value:1},
				{name:40,value:1}
			]
		},
		{name:"Career",value:5,
			children:[
				{name:57,value:1},
				{name:35,value:1},
				{name:45,value:1},
				{name:46,value:1},
				{name:47,value:1}
		]
		},
		{name:"Politics",value:5,
			children:
			[
				{name:3,value:1},
				{name:16,value:1},
				{name:45,value:1},
				{name:59,value:1},
				{name:8,value:1}
			]
		},
		{name:"Military",value:2,
			children:
			[
				{name:54,value:1},
				{name:7,value:1},
				{name:16,value:1}
			]
		}
	]
}

function forceRadialThemeClusters(){

	var graph = d3.select('#BieGua>svg').append('g').attr("transform",
		function(){
			var result = "translate("+200+","+200+")";
			return result;
		}
	)
	var numberOfClusters = themes.children.length;
	// console.log(numberOfClusters);
	// all themes

	var centerX = 200
	var centerY = 200
	// radius for the small circle
	var radius = 6
	//  radius for the large circle
	var rad = 100
	var themesObject = themes.children
	themesObject.forEach(function(d,i){
		// the angle of the rotation
		var angle = Math.PI*2/numberOfClusters*i;
		var subgraph = graph.append('g');
		// may not use rotation
		subgraph.attr("transform",
			function(){
				var result = ""
				// var result = "rotate("+(1*angle)+","+centerX+","+centerY+") ";
				result+="translate("+(centerX+Math.cos(angle)*rad)+","+(centerY+Math.sin(angle)*rad)+")";
				return result;
			}
		);
		//transflate to the circle of the graph

		var shift = 7.5
		// generate the curve and add user interactions

		var len = 200-15;

		// apply line gnerator on all of the lines
		// console.log("current theme: "+name);
		var current = d.children; // current object 
		// console.log(len(current))
		// console.log(d.children)
		var lineGraph = subgraph.append('g')
		current.forEach(
			(d_line,i_line) =>{
				var x1 = 0;
				var y1 = 0;
				// the x1 and x2 in some cases
				var num = d_line.name;
				// console.log(d_line)
				var unshiftHorizontal = -1*Math.cos(angle)*rad;
				var unshiftVertical = -1* Math.sin(angle)*rad;
				var shiftHorizontal = len*Math.cos((num-1)/64*2*Math.PI);
				var shiftVertical = len*Math.sin((num-1)/64*2*Math.PI);
				var x2 = unshiftHorizontal+shiftHorizontal
				var y2 = unshiftVertical+shiftVertical
				// var x = -250+400+(200)*Math.cos((num-1)/64*2*Math.PI);
				// var y = -250+400+(200)*Math.sin((num-1)/64*2*Math.PI);
				// x points and y points
				// console.log('')
				// xs =[x1,x2];
				// ys =[y1,y2];
				// console.log([x1,y1])
				// console.log([x2,y2])

				var xmid = (x1+x2)/2-10
				var ymid = (y1+y2)/2

				let lineData = [
					{'x':x1,'y':y1},
					{'x':xmid,'y':ymid},
					{'x':x2,'y':y2}
				];
				var lineGenerator = d3.line().curve(d3.curveNatural)
				.x(function(d3){
					return d3.x;
				})
				.y(function(d3){
					return d3.y;
				});
				// draw the line
				lineGraph.append('path').datum(lineData)
				.attr('d',lineGenerator)
				.style('stroke-width',0.1) // the stroke width
				.style('stroke','white')
				.style('fill','none')
				.style('stroke-opacity',0.5); // the color
				
		});

		subgraph.append('circle')
		.attr('r',radius)
		.attr('cx',
			function(){
				// angle sine and consine
				return 0;
			}
		)
		.attr('cy',
			function(){
				// angle m
				return 0;
			}
		).style('fill',
		function(){
			return 'grey'
		});

		// the text label
		subgraph.append('text')
		.text(d.name)
		// .attr('r',radius)
		.attr('x',
			function(){
				// angle sine and consine
				return -10;
			}
		).attr('y',
			function(){
				// angle m
				return -10;
			}
		).style('fill',
		function(){
			return 'white'
		})
		.style('font-size',10)
		.style('fill-opacity',0.5);



		subgraph.select('text').on('mouseover',highlightLine).on('mouseout',unhighlightLine);

		subgraph.select('circle').on('mouseover',highlightLine).on('mouseout',unhighlightLine);
		// subgraph.append('text').
		// attr('r',radius)
		// .attr()
	});

}



function drawArcs(d3Object,x1,y1,x2,y2,n,k){
  var cx = (x1+x2)/2;
  var cy = (y1+y2)/2;
  var dx = (x2-x1)/2;
  var dy = (y2-y1)/2;
  var i;
  for (i=0; i<n; i++) {
    if (i==(n-1)/2) {
      d3Object.line(x1,y1,x2,y2).stroke({width:1}).fill('none');
    }
    else {
      dd = Math.sqrt(dx*dx+dy*dy);
      ex = cx + dy/dd * k * (i-(n-1)/2);
      ey = cy - dx/dd * k * (i-(n-1)/2);
      d3Object.path("M"+x1+" "+y1+"Q"+ex+" "+ey+" "+x2+" "+y2).stroke({width:1}).fill('none');
    }
  }
}

function highlightLine(){
	var parent = this.parentNode;
	d3.select(parent).selectAll('path')
	.style('stroke-width',0.4) // the stroke width
	.style('stroke','white')
	.style('stroke-opacity',1.0); // the color

	d3.select(parent).select('circle')
	.style('stroke-opacity',1.0)
	.style('fill','#ffffff')
	.style('stroke','white')
	.style('stroke-width',0.6);

	d3.select(parent).select('text').style('font-size',10)
	.style('font-size',12)
	.style('fill-opacity',1.0);

}
function unhighlightLine(){
	var parent = this.parentNode;
	d3.select(parent).selectAll('path')
	.style('stroke-width',0.1) // the stroke width
	.style('stroke','white')
	.style('stroke-opacity',0.5); // the color

	d3.select(parent).select('circle')
	.style('fill',
		function(){
			return 'grey'
	})
	.style('stroke','none')
	;
	// .style('stroke-opacity',1.0)
	// .style('stroke','blue')
	// .style('stroke-width',0.6);

	d3.select(parent).select('text').style('font-size',10)
	.style('font-size',10)
	.style('fill-opacity',0.5);
}





// the hiearchical cluster using pack
function PackStylehemeClusters(){
	// all themes
	// var sumReducer = (accum,d)=> {accum+d.count;}
	// var numberOfClusters = themes.reduce(sumReducer,0);
	// Add force, 
	var padding  = 10;
	// the radius for small circle
	var circleRadius = 3;
	// separation between different color circles
	var clusterPadding = 8;
	// maximum radius
	var maxRadius = 12;

	var width = 300
	var height = 300
	// Use d3 pack APIs 
	var pack = d3.pack()
	.size([width, height])
	.padding(padding);

	var themesGraph = d3.select('#BieGua>svg').append('g').attr("transform",
		function(){
			var result = "translate("+250+","+250+")";
			return result;
		}
	)

	 themes= d3.hierarchy(themes)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return b.value - a.value; });
	// var nodes = pack.nodes(themes)
	var node = themesGraph.selectAll(".node")
			.data(pack(themes).descendants()).enter()
		.append("g")
		.attr('id',function(d){return d.parent? d.parent.data.name+"-"+d.data.name : d.data.name})
		 	.attr("class", function(d) { return d.children ? "node" : "leaf-node"; })
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
	// Add user interaction, hover over the themes, add links between gua to theme points
	node.append("circle")
  	.attr("r",function(d) { return d.r; })
  	// .attr("fill", "steel-blue")
  	.attr("opacity", 0.5)
  	.attr("stroke", "#ADADAD")
  	.attr("stroke-width", 2);

  	var texts = node.filter(function(d) {
  		var check = d.children && d.data.name !== "theme";
  	 return check }).append("text")
  	.attr("dx","-0.5em")
		.attr("dy", "0.2em")
		.style('fill','white')
		.text(function(d) { return d.data.name; })
		.on('mouseover',
			function(d,i){
				// for each d connecting the objects
				// console.log(d)
				// get the theme name
				var themeName = this.innerHTML
				var nodeList = []
				d.data.children.forEach(
					(d1,i) =>{
						nodeList.push(themeName+"-"+d1.name)
					}
				)
				// console.log(nodeList)
				var lineLink = d3.select('#BieGua>svg').append('g').attr("transform",
				function(){
					var result = "translate("+250+","+250+")";
					return result;
				}
			)
			.attr('class','linksToGua');
			// var lineGenerator = d3.line()
				nodeList.forEach(
					function(d2,i){
						var translate = d3.select("#BieGua>svg #"+d2).attr('transform');
						var arr = translate.split(/[:;?!~,`"&|()<>{}\[\]\r\n/\\]+/)
						// console.log(arr)
						var num = d2.split('-')[1]				
						// console.log(num)
						var x = -250+400+(200)*Math.cos((num-1)/64*2*Math.PI)
						var y =-250+400+(200)*Math.sin((num-1)/64*2*Math.PI)
						var graph = lineLink.append('line')
						.attr('x1',arr[1])
						.attr('y1',arr[2])
						.attr('x2', function(){	
							return x
						})
						.attr('y2',function(){
							return y
						})
						.style('stroke','blue');
					})
			}

		).on('mouseout',function(){
			d3.select('#BieGua>svg').select('.linksToGua').remove()
		})

		// add user interaction between 
	
}
