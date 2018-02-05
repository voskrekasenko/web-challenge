(function () {
	'use strict';

	var Diagram = function (url, element) {
		this.element = element;
    this.mainElement = document.getElementById(element);
    this.getJson(url);
  };

	Diagram.prototype.getJson = function (url) {
    var self = this;
    var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
    xhr.send();
		xhr.addEventListener('load', function () {
			if (xhr.status != 200) {
				return xhr.status + ': ' + xhr.statusText;
			}
			self.data = JSON.parse(xhr.responseText);
			self.data.scale.forEach(function(elemScale){
				self.mainElement.appendChild(newScale(elemScale));
			});
			self.data.items.forEach(function(elemItem){
				self.mainElement.appendChild(newElement(elemItem));
			});
		});
  };

	var createDiagram = new Diagram('data.json', 'main');
  console.log(createDiagram);

	function newElement(value) {
		var element = document.createElement('div');
    element.innerHTML = value.title;
    element.classList.add('field_items');
		return element;
  }

	function newScale(value) {
		var element = document.createElement('div');
    element.innerHTML = value;
    element.classList.add('field_scale');
		return element;
  }

}());
