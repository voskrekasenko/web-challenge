(function(){
	"use strict"

	var data = JSON.parse(getJson('data.json'));
	var i, j;
	var itemLength = data.items.length, scaleLength = data.scale.length;

	diagram(data, 'main');

	// document.write("<table border=" + 1 + ">");
	// for(i = 0; i <= itemLength; i++){
	// 	if(i>=1){
	// 		document.write("<tr align=right><td>" + data.items[i-1].title);
	// 	}
	// 	for(j = 0; j <= scaleLength; j++){
	// 		if(i === 0){
	// 			document.write("<td>" + (data.scale[j-1] || '') + "</td>");
	// 		} else if(data.scale[j]){
	// 			document.write("<td"+hasBackground(data.items[i-1], data.scale[j])+"></td>");
	// 		}
	// 	}
	// 	document.write("</tr>");
	// }
	// document.write("</table>");

// epic functions

	function getJson(url) {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', url, false);
		xhr.send();

		if (xhr.status != 200) {
			return xhr.status + ': ' + xhr.statusText;
		} else {
			return  xhr.responseText;
		}
	}

	function diagram(data, element) {
		var options = {
			class: "blue"
		}
		var mainElement = document.getElementById(element);
		data.items.forEach(function(elemItem){
			mainElement.appendChild(newElement());
			console.log(elemItem);
			data.scale.forEach(function(elemScale){
				elemScale.appendChild(newElement());
				console.log(elemScale);
			})
		})
		function newElement(value){
			var element = document.createElement('div');
			return element;
		}
	}

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