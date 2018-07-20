function addToggleLegends(){
	//the update on the file
	// there are 4 toggle legends
	var arr = ['YAO Text','Themes of the Decisions','Divination keywords','Geomretrical Patterns'];
	var svgHeight = 800;
	var svgWidth = 250;
	var color = 'black';
	toggleSvg = d3.select('#toggleLegend')
	.append('svg')
	.style("background-color", 'silver')
	.attr('height',svgHeight)
	.attr('width',svgWidth);

	var toggleG = toggleSvg
	.append('g')
	.attr("transform",
		function(){
			var result = "translate("+(-20)+","+20+")";
			return result;
		}
	);

	var recwid = 215
	var recht = 50
	var fis = 20
	var tl = 10
	var toggleRect = toggleG.selectAll('rect')
	.data(arr).enter().append('rect')
	.attr('x',function(d){
		return 0;
	})
	.attr('y',function(d,i){
		return i*(recht+fis);
	})
	.attr('width',function(d){
		return recwid;
	})
	// chosen or not chosen selection
	.attr('class','not-chosen')
	.attr('height',function(d){
		return recht;
	})
	.style('fill', function(d,i){
		var cs = d3.select(this).attr('class');
		// not chosen, then we append the small triangle
		var co = toggleG.append('g').attr('class','not-selected');
		var y = i*(recht+fis);
		if(cs == 'not-chosen'){
			var p1 = ""+recwid+","+y+"";
			var p2 = ""+recwid+","+(y+tl)+"";;
			var p3 = ""+(recwid-tl)+","+y+"";
			drawTriangle(p1,p2,p3,co);
		}
		return color;
	}).on('click', function(d){
		// the click function
		return null;
	});

	var toggleText = toggleG.selectAll('text')
	.data(arr).enter().append('text')
	.text(
		function(d,i){
			return "0."+(i+1)+" "+d.toUpperCase();
	})
	.attr('x',function(d){
		return 40;
	})
	.attr('y',function(d,i){
		return i*(recht+fis)+recht/2;
	})
	.style("font-size", "12px")
	.style('fill', 'white')
}


function drawTriangle(p1,p2,p3,currentobject){
	currentobject.append('polygon')
	.attr('points',
		function(){
			return p1+','+p2+','+p3;
		}
	)
	.style('fill','white');
}