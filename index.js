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
      self.render(self.mainElement, self.data);
    });
  };

  Diagram.prototype.render = function(element, data){
    this.helpers.createListItems(data.scale, {ul:'list_scale', li:'field_scale'}, element);
    this.helpers.createListItems(data.items, {ul:'list_items', li:'field_items'}, element);
    this.helpers.createTableResults(data, 'results_block', element);
  }

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
    createTableResults: function(data, classResults, mainElement){
      var fragment = document.createDocumentFragment();
      var div = document.createElement('div');
      var ul = document.createElement('ul');
      div.classList.add(classResults);
      ul.classList.add('results_list');
      var dates = {
        min: 0,
        max: 0,
        long: 0
      };
      data.scale.forEach(function(el, index){
        var num = el.split('.');
        var date = Date.UTC(num[2], num[1], num[0])/1000/60/60/24;
        dates.min = index === 0 ? date : date < dates.min ? date : dates.min;
        dates.max = index === 0 ? date : date > dates.max ? date : dates.max;
      });
      dates.long = (dates.max - dates.min);
      for(var i = 0; i < data.items.length; i++){
        var li = document.createElement('li');
        li.style.width = this.getWidthField(data.items[i], dates.long) * 5 + '%';
        li.style.marginLeft = this.getOffsetField(data.items[i], dates.min, dates.long) * 5 + '%';
        li.style.backgroundColor = data.items[i].color;
        fragment.appendChild(li);
      }
      ul.appendChild(fragment);
      div.appendChild(ul);
      mainElement.appendChild(div);
    },
    getWidthField: function(item, long){
      return (this.dateUtcDays(item.end) - this.dateUtcDays(item.start))*100/long;
    },
    getOffsetField: function(item, min, long){
      return (this.dateUtcDays(item.start) - min)*100/long;
    },
    dateUtcDays: function(str){
      var num = str.split('.');
      return Date.UTC(num[2], num[1], num[0])/1000/60/60/24;
    }
  };

  var createDiagram = new Diagram('data.json', 'main');
  console.log(createDiagram);

}());
