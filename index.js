(function(){
	"use strict"

	var i, j;
	var data = {
		"scale": ["15.03.2016", "16.03.2016", "17.03.2016", "18.03.2016", "19.03.2016", "13.04.2016", "16.04.2016"],
		"items": [
			{
				"title": "Setup",
				"start": "15.03.2016",
				"end": "16.03.2016",
				"color": "#11C01A"
			},
			{
				"title": "Development",
				"start": "16.03.2016",
				"end": "17.03.2016",
				"color": "#39B0DA"
			},
			{
				"title": "Testing",
				"start": "17.03.2016",
				"end": "19.03.2016",
				"color": "#F8BB3C"
			},
			{
				"title": "Production",
				"start": "18.03.2016",
				"end": "16.04.2016",
				"color": "#FF00DD"
			}
		]
	}
	document.write("<table border=" + 1 + ">");
	for(i = 0; i <= data.items.length; i++){
		if(i>=1){
			document.write("<tr align=right><td>" + data.items[i-1].title);
		}
		for(j = 0; j <= data.scale.length; j++){
			if(i === 0){
				document.write("<td>" + (data.scale[j-1] || '') + "</td>");
			} else if(data.scale[j]){
				document.write("<td"+hasBackground(data.items[i-1], data.scale[j])+"></td>");
			}
		}
		document.write("</tr>");
	}
	document.write("</table>");
	function hasBackground(item, scale){
		var dateScale = scale.split('.'),
			itemStart = item.start.split('.'),
			itemEnd = item.end.split('.');
		if(new Date(dateScale[1], dateScale[0], dateScale[2]) >= new Date(itemStart[1], itemStart[0], itemStart[2]) && new Date(dateScale[1], dateScale[0], dateScale[2]) <= new Date(itemEnd[1], itemEnd[0], itemEnd[2])){
			return ' style="background-color: ' + item.color + ';"';
		}
		return '';
	}
}())