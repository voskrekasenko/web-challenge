(function(){
	"use strict"

	var Diagram = function (url, element) {
		this.data = getJson(url);
		this.element = element;

		var options = {
			class: "blue"
		}
		var mainElement = document.getElementById(element);
		// data.scale.forEach(function(elemScale, indexScale){
		// 	mainElement.appendChild(newScale(elemScale));
		// })
		// data.items.forEach(function(elemItem, indexItem){
		// 	mainElement.appendChild(newElement(new Item(elemItem)));
		// })
	}
	Diagram.prototype.getJson = function(url) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		xhr.addEventListener('load', function(){
			if (xhr.status != 200) {
				return xhr.status + ': ' + xhr.statusText;
			} else {
				return xhr.responseText;
			}
		});
	};

	var createDiagram = new Diagram('data.json', 'main');
	console.log(createDiagram);

	function newElement(value){
		var element = document.createElement('div');
		element.innerHTML = value.title;
		return element;
	}
	function newScale(value){
		var element = document.createElement('div');
		element.innerHTML = value;
		return element;
	}

}())