
function navigation(){
	var h = 900;
	var w = 50;
	var fontSize = 25
	// background color
	var bgc = '#262626'


	var svg = d3.select('#leftNav').append('svg')
	.attr('width',w)
	.attr('height',h)
	.style('fill','black');
	// var shiftDown = - 160
	var text3 = svg.append('g').attr('transform','translate(0,-220)')
	.on('click',function(){
		var modal = document.getElementById('myModal');
		var span = document.getElementsByClassName("close")[0];
		modal.style.display= "block";
		span.onclick = function() {
		    modal.style.display = "none";
		}
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	})
	.on("mouseover",function(){
		d3.select(this).select('text').style('fill','black')
		d3.select(this).select('#first_rect').style('fill','grey')
		// d3.select(this).select('#second_rect').style('fill','grey')
	})
	.on("mouseout",function(){
		d3.select(this).select('text').style('fill','white')
		d3.select(this).select('#first_rect').style('fill','black')
		// d3.select(this).select('#second_rect').style('fill','white')
	})

	text3.append('rect')
	.attr('id','first_rect')
	.attr('x',0)
	.attr('y',h/4-5)
	.style('fill','black')
	.attr('height',40)
	.attr('width',50)
	// .on("mouseover",function(){
	// 	d3.select(this).style('fill','white')
	// })
	// .on("mouseout",function(){
	// 	d3.select(this).style('fill','black')
	// })

	text3.append('text')
	.text('About')
	.style('fill','white')
	.style('font-size',13)
	.style('font-weight','bold')
	.attr('x',6)
	.attr('y',h/4+20)
	// .on("mouseover",function(){
	// 	d3.select(this).style('fill','black')
	// })
	// .on("mouseout",function(){
	// 	d3.select(this).style('fill','white')
	// })

	text3.append('rect')
	.attr('id','second_rect')
	.attr('x',0)
	.attr('y',h/4+30)
	.style('fill','white')
	.attr('height',5)
	.attr('width',50)
	// .on("mouseover",function(){
	// 	d3.select(this).style('fill','black')
	// })
	// .on("mouseout",function(){
	// 	d3.select(this).style('fill','white')
	// })

	var side = 10
	// text3.append('polygon')
	// .attr('points',
	// 	function(){
	// 		var p1 = "50,"+(h/4+50)+", ";
	// 		var p2 = (50-side)+","+(h/4+50)+", ";
	// 		var p3 = "50,"+(h/4+50-side)+"";
	// 		return p1+p2+p3
	// 	}
	// )
	// .style('fill','white');
	// .stroke('fill','white')
	// .stroke('')
}



function appendHeader(){
	
	var fontSize = 30
	var background = "#262626"
	// background = 'black'
	var svg = d3.select('#topNav').append('svg').attr('width',1100)
	.attr('x',0)
	.attr('y',0)
	.attr('height',40)
	.style("background-color", background);

	var text1 = svg.append('g')
	text1.append('text').text('VISUALIZING')
	.style('fill','white')
	.style('font-size',fontSize)
	.attr('x',20)
	.attr('y',30);

	var text2 = svg.append('g')
	text2.append('text').text('I-CHING')
	.style('fill','white')
	.style('font-weight','bold')
	.style('font-size',fontSize)
	.attr('x',200)
	.attr('y',30);
	// var label1 = svg.append('g').attr('transform','translate(600,0)');
	// label1.append('text').text('HEXAGRAMS & THE STATEMENT (GUA)')
	// .style('fill','white')
	// .style('fill-opacity','0.8')
	// .attr('x',0)
	// .attr('y',15)
	// .style('font-size',10);

	// var label2 = svg.append('g').attr('transform','translate(1100,0)');
	// label2.append('text').text('DIVINATION KEYWORDS')
	// .style('fill','white')
	// // .style('fill-opacity','')
	// .attr('x',0)
	// .attr('y',15)
	// .style('font-size',10)
}
