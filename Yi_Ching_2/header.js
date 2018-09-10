
function navigation(){
	var h = 1000;
	var w =50;
	var fontSize = 25
	// background color
	var bgc = 'silver'
	var svg = d3.select('#leftNav').append('svg')
	.attr('width',w)
	.attr('height',h)
	.style('fill',bgc);

	var text1 = svg.append('g').attr('transform','translate(30,-240)')
	text1.append('text').text('Visualizing')
	.style('fill','black')
	.style('font-size',fontSize)
	.attr('x',0)
	.attr('y',h/2)
	.attr('transform','rotate(-90)')
	.attr('transform-origin','left')
	;


	var text2 = svg.append('g').attr('transform','translate(30,-370)');
	text2.append('text').text('I-CHING')
	.style('fill','black')
	.style('font-weight','bold')
	.style('font-size',fontSize)
	.attr('x',0)
	.attr('y',h/2)
	.attr('transform','rotate(-90)')
	.attr('transform-origin','left')
	;

	var text3 = svg.append('g').attr('transform','translate(0,150)')
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
	;

	text3.append('rect')
	.attr('x',0)
	.attr('y',h/4)
	.style('fill','black')
	.attr('height',50)
	.attr('width',50)

	text3.append('text').text('About')
	.style('fill','white')
	.style('font-size',15)
	.style('font-weight','bold')
	.attr('x',0)
	.attr('y',h/4+18)
	;

	var side = 10
	text3.append('polygon')
	.attr('points',
		function(){
			var p1 = "50,"+(h/4+50)+", ";
			var p2 = (50-side)+","+(h/4+50)+", ";
			var p3 = "50,"+(h/4+50-side)+"";
			return p1+p2+p3
		}
	)
	.style('fill','white');
	// .stroke('fill','white')
	// .stroke('')

}

function appendHeader(){
	var background = "black"
	var svg = d3.select('#topNav').append('svg').attr('width',1250)
	.attr('x',0)
	.attr('y',-20)
	.attr('height',20)
	.style("background-color", background);

	var label1 = svg.append('g').attr('transform','translate(600,0)');
	label1.append('text').text('HEXAGRAMS & THE STATEMENT (GUA)')
	.style('fill','white')
	.style('fill-opacity','0.8')
	.attr('x',0)
	.attr('y',15)
	.style('font-size',10);

	var label2 = svg.append('g').attr('transform','translate(1100,0)');
	label2.append('text').text('DIVINATION KEYWORDS')
	.style('fill','white')
	// .style('fill-opacity','')
	.attr('x',0)
	.attr('y',15)
	.style('font-size',10)
}
