// function for appending the legends
function appendLegends(){
	//fomulate a list
	var width = 200
	var interval = 100
	var locationArr = [1,2,3,4,5,6]
	var svg = d3.select('#BieGua>svg');
	var fontSize = 8
	var locX = 600
	var locY = 10

	var graphExp = svg.append('g').attr('transform',
	() => {
		return "translate("+locX+","+locY+")";
	});
	var w = 300
	var boxPadding = 10
	var boxL = 320
	var boxW = 120
	var frameBox = graphExp.append('g')
	.append('rect').style('fill','rgb(0,0,0,0.5)')
	.attr('x',(0-boxPadding))
	.attr('y',(0-boxPadding))
	.attr('width',(boxL-boxPadding))
	.attr('height',(boxW-boxPadding))
	// appedn the graphExp
	graph1 = graphExp.append('g')
	// appends the side length fo the graph
	var sideLength = 40
	var interval = 10
	graph1.selectAll('rect')
	.data(locationArr).enter().append('rect')
	.attr('x',d =>
	{
		return (d-1)%3*(sideLength+interval)
	})
	.attr('y',
	d =>{
		return Math.floor((d-1)/3)*(sideLength+interval)
	})
	.attr('width',sideLength)
	.attr('height',sideLength)
	.style('fill','green');

	//use the svg path to draw the right angle rectangles. using polygons
	//for yang gua
	graph1.selectAll('polygon').data(locationArr).enter()
	.append('polygon').style('fill',colorList[1])
	.attr('points',
		function(d2,i){
			points =""
			p1x = (d2-1)%3*(sideLength+interval)
			p1y =Math.floor((d2-1)/3)*(sideLength+interval)
			p1 = p1x+","+p1y+" "
			p2 = (p1x+sideLength)+","+p1y+" "
			p3 = p1x+","+(p1y+sideLength)+" "
			points+=p1+p2+p3
			return points
		}
	);
	//for all yin gua
	var graph2 = graphExp.append('g');
	graph2.selectAll('polygon').data(locationArr).enter()
	.append('polygon').style('fill',colorList[0])
	.attr('points',
		function(d2,i){
			points =""
			p1x = (d2-1)%3*(sideLength+interval)
			p1y =Math.floor((d2-1)/3)*(sideLength+interval)
			p1 = (p1x+sideLength)+","+(p1y+sideLength)+" "
			p2 = (p1x+sideLength)+","+p1y+" "
			p3 = p1x+","+(p1y+sideLength)+" "
			points+=p1+p2+p3
			return points
		}
	);
	// append the text
	var shiftedDistance = 50
	var explainText= graphExp.append('g').attr('transform',
	d => {
		return "translate("+150+","+0+")";
	});

	var textList =  ['4th','5th','top','initial','2nd','3rd']
	var yingAndYang = ['nine','six']
	explainText.append('g').selectAll('line').data(locationArr).enter().append('line')
	.attr(
		"x1",d=>{return (d-1)%3*(sideLength+interval)}
	)
	.attr('x2', d=>{return (d-1)%3*(sideLength+interval)+sideLength})
	.attr('y1', d=>{return Math.floor((d-1)/3)*(sideLength+interval)+sideLength})
	.attr('y2', d=>{return Math.floor((d-1)/3)*(sideLength+interval)})
	.style('stroke','white')
	.style('stroke-opacity',0.5);


	//first line,upper
	//first line,lower
	var shiftedDown = 10
	var secondLevel = 20

	explainText.append('g').selectAll('text').data(textList).enter()
	.append('text')
	.text((d,i)=>{
		return textList[i]
	})
	.style('font-size',fontSize)
	.style('fill-opacity',0.75)
	.style('fill','white')
	.attr('x', (d,i)=>{
		return i%3*(sideLength+interval)
	})
	.attr('y', (d,i)=>{
		return Math.floor((i)/3)*(sideLength+interval)+shiftedDown
	});

	explainText.append('g').selectAll('text').data(textList).enter()
	.append('text')
	.text((d,i)=>{
		return yingAndYang[0]
	})
	.style('font-size',fontSize)
	.style('fill-opacity',0.75)
	.style('fill','white')
	.attr('x', (d,i)=>{
		return i%3*(sideLength+interval)
	})
	.attr('y', (d,i)=>{
		return Math.floor((i)/3)*(sideLength+interval)+2*shiftedDown
	})
	
	explainText.append('g').selectAll('text').data(textList).enter()
	.append('text')
	.text((d,i)=>{
		return textList[i]
	})
	.style('font-size',fontSize)
	.style('fill-opacity',0.75)
	.style('fill','white')
	.attr('x', (d,i)=>{
		return i%3*(sideLength+interval)+secondLevel
	})
	.attr('y', (d,i)=>{
		return Math.floor((i)/3)*(sideLength+interval)+shiftedDown+secondLevel
	});

	explainText.append('g').selectAll('text').data(textList).enter()
	.append('text')
	.text((d,i)=>{
		return yingAndYang[1]
	})
	.style('font-size',fontSize)
	.style('fill-opacity',0.75)
	.style('fill','white')
	.attr('x', (d,i)=>{
		return i%3*(sideLength+interval)+secondLevel
	})
	.attr('y', (d,i)=>{
		return Math.floor((i)/3)*(sideLength+interval)+2*shiftedDown+secondLevel
	})

}