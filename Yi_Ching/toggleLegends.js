// default chosen to be Y
var chosen = 'Y'
var defaultStart = 35
var colors = ['black','white']
var recwid = 185
var recht = 30
var fis = 20
var tl = 10
var toggleArr = [
		{select:true,token:'YAO Text',id:'Y'},
		{select:false,token:'Themes of the Decisions',id:'T'},
		{select:false,token:'Divination keywords',id:'D'},
		{select:false,token:'Geomretrical Patterns',id:'G'}
];
function addToggleLegends(){
	//the update on the file
	// there are 4 toggle legends
	var svgHeight = 400;
	var svgWidth = 200;
	var color = 'black';
	toggleSvg = d3.select('#toggleLegend')
	.append('svg')
	.style("background-color", '#262626')
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

	var toggleRect = toggleG.selectAll('rect')
	.data(toggleArr).enter().append('rect')
	.attr('class', function(d){
		return d.id
	})
	.attr('x',function(d){
		if (!d.select){
			return defaultStart
		}else{
			return defaultStart-10
		}
	})
	.attr('y',function(d,i){
		return i*(recht+fis)+20;
	})
	.attr('width',function(d){
		if (d.select){
			return recwid+10
		}else{
			return recwid
		}
	})
	// chosen or not chosen selection
	.attr('height',function(d){
		return recht;
	})
	.style('fill', function(d,i){
		if (!d.select){
			return colors[0]
		}else{
			return colors[1]
		}
	})
	.on('click', function(d,i){
		var chosen = d.id;
		// console.log(chosen)
		if (!d.select){
			// remove first 
			removeMainPart()
			triggerItems(chosen)
			// toggleArr[i].select = true
			for (var j = 0; j<toggleArr.length;j++){
				if (j!=i){
					toggleArr[j].select = false
					unhighlightlegends(toggleArr[j])
				}
				else{
					toggleArr[i].select = true
				}
			}
			// console.log(className)
		}else{
			// not equal to one
			removeMainPart()
			d3.select(this).attr('class',d.id)
			toggleArr[i].select = false
		}
	})
	.on('mouseover', function(d,i){
		 highlightlegends(d)
	})
	.on ('mouseout',function(d,i){
		if (!d.select){
			unhighlightlegends(d)
		}
	})

	highlightlegends(toggleArr[0])
	// append the selection features using class attribute
	var toggleText = toggleG.selectAll('text')
	.data(toggleArr).enter().append('text')
	.text(
		function(d,i){
			return "0"+(i+1)+". "+d.token.toUpperCase();
	})
	.attr('class', function(d){
		return d.id
	})
	.attr('x',function(d){
		return 40;
	})
	.attr('y',function(d,i){
		return i*(recht+fis)+recht/2+25;
	})
	.style("font-size", "12px")
	.style('fill', function(d,i){
		if (!d.select){
			return colors[1]
		}else{
			return colors[0]
		}
	})
	.on('click', function(d,i){
		var chosen = d.id;
		// console.log(chosen)
		if (!d.select){
			// remove first 
			removeMainPart()
			triggerItems(chosen)
			// toggleArr[i].select = true
			for (var j = 0; j<toggleArr.length;j++){
				if (j!=i){
					toggleArr[j].select = false
					unhighlightlegends(toggleArr[j])
				}
				else{
					toggleArr[i].select = true
				}
			}
			// console.log(className)
		}else{
			removeMainPart()
			d3.select(this).attr('class',d.id)
			toggleArr[i].select = false
		}
	})
	.on('mouseover', function(d,i){
		highlightlegends(d)
	})
	.on ('mouseout',function(d,i){
		if (!d.select){
			unhighlightlegends(d)
		}
	})
}

// function flipSelection(avoid){

// }
//append the tags
function triggerItems(chosen){
	// trigger
	if (chosen != null){
		// switch cases on the chosen
		// console.log(chosen)
		switch(chosen){
			case 'Y': 
				appendYaoText('mainText')
				break;
			case 'T':
				setUpThemesPanel('mainText');
				break;
			case 'D':
				// divination key words
				renderTagCloudsForSentiments('mainText')
				break;
			case 'G':
				// geo patterns
				appendGeoPattern('mainText')
				break;
			default:
				// doing nothing
				break;
		}
	}
	// 选择不同的长方形，产生不同的detailed explanation side bars
	// 用不同颜色show 
	// return null;
}

function highlightlegends(d){
	selectedRect = d3.selectAll('rect.'+d.id)
	selectedText = d3.selectAll('text.'+d.id)
	// console.log('Class: '+d.id)
	selectedRect
	.attr('x',function(){
			return defaultStart-10
	}).attr('width',function(){
			return recwid+10
	})
	.style('fill', function(){
		return colors[1]
	})
	// change the text
	selectedText
	.style('fill', function(){
		return colors[0]
	});	
	// append a triangle
	var length = parseInt(selectedRect.attr('height'))
	p1y = parseInt(selectedRect.attr('y'))
	p2y = length+p1y
	p3y = length/2+p1y
	var p1x = parseInt(selectedRect.attr('x'))+parseInt(selectedRect.attr('width'))
	// console.log(p1x)
	var p3x = parseInt(selectedRect.attr('x'))+parseInt(selectedRect.attr('width')) - length/2
	var p1 = p1x+','+p1y
	var p2 = p1x+','+p2y
	var p3 = p3x+','+p3y
	var g = d3.select('#toggleLegend>svg').append('g')
	.attr("transform",
		function(){
			var result = "translate("+(-20)+","+20+")";
			return result;
		}
	).attr('class','trianglePointer_'+d.id)
	drawTriangle(p1,p2,p3,g,'#1c1c1c')
}

function unhighlightlegends(d){
	selectedRect = d3.selectAll('rect.'+d.id)
	selectedText = d3.selectAll('text.'+d.id)
	selectedRect
	.attr('x',function(){
		return defaultStart
	}).attr('width',function(){
		return recwid
	})
	.style('fill', function(){
		return colors[0]
	})
	// change the text
	selectedText
	.style('fill', function(){
		return colors[1]
	});
	d3.selectAll('.trianglePointer_'+d.id).remove()
}
// remove the main text
function removeMainPart(){
	// there are bugs at this part that need to be fixed.
	d3.select('.switchSection').remove()

}
// draw triangles 直角
function drawTriangle(p1,p2,p3,currentobject,color){
	// console.log('triangle')
	currentobject.append('polygon')
	.attr('points',
		function(){
			return p1+','+p2+','+p3;
		}
	)
	.style('fill',color);
}