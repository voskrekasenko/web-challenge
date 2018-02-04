(function () {
	'use strict';

	var Diagram = function (element) {
		this.element = element;
		// var mainElement = document.getElementById(element);
		// data.scale.forEach(function(elemScale, indexScale){
		// 	mainElement.appendChild(newScale(elemScale));
		// })
		// data.items.forEach(function(elemItem, indexItem){
		// 	mainElement.appendChild(newElement(new Item(elemItem)));
		// })
	};
	Diagram.prototype.getJson = function (url) {
		var self = this;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();
		xhr.addEventListener('load', function () {
			if (xhr.status != 200) {
				return xhr.status + ': ' + xhr.statusText;
			} else {
				self.data = xhr.responseText;
			}
		});
	};

	var createDiagram = new Diagram('main');
	var openData = new createDiagram.getJson('data.json');
	console.log(openData);

	function newElement(value) {
		var element = document.createElement('div');
		element.innerHTML = value.title;
		return element;
	}
	function newScale(value) {
		var element = document.createElement('div');
		element.innerHTML = value;
		return element;
	}

}());
