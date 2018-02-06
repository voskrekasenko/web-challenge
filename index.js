(function () {
  'use strict';

  var Diagram = function (url, element) {
    this.mainElement = document.getElementById(element);
    this.getJson(url);
    this.helpers();
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
      self.createListItems(self.data.scale, 'field_scale');
      self.createListItems(self.data.items, 'field_items');
    });
  };

  Diagram.prototype.helpers = function (){
    this.createListItems = function(items, itemClass){
      var ul = document.createElement('ul');
      this.mainElement.appendChild(ul);
      items.forEach(function(item){
        var li = document.createElement('li');
        li.classList.add(itemClass);
        li.innerHTML = item.title || item;
        ul.appendChild(li);
      });
    };
  }

  var createDiagram = new Diagram('data.json', 'main');
  console.log(createDiagram);

}());
