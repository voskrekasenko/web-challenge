(function () {
  'use strict';

  var Diagram = function (url, element) {
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

      self.helpers.createListItems(self.data.scale, {ul:'list_scale', li:'field_scale'}, self.mainElement);
      self.helpers.createListItems(self.data.items, {ul:'list_items', li:'field_items'}, self.mainElement);
      self.helpers.createTableResults(self.data.scale, 'results', self.mainElement);
    });
  };

  Diagram.prototype.helpers = {
    createListItems: function (items, classList, mainElement){
      var fragment = document.createDocumentFragment();
      var ul = document.createElement('ul');
      ul.classList.add(classList.ul);
      mainElement.appendChild(ul);
      items.forEach(function(item){
        var li = document.createElement('li');
        li.classList.add(classList.li);
        li.innerHTML = item.title || item;
        fragment.appendChild(li);
      });
      ul.appendChild(fragment);
    },
    createTableResults: function(scales, classResults, mainElement){
      var div = document.createElement('div');
      div.classList.add(classResults);
      mainElement.appendChild(div);
    }
  };

  var createDiagram = new Diagram('data.json', 'main');
  console.log(createDiagram);

}());
