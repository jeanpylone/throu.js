"use strict";

var t= new window.Throu();
t.setChildrenSelector(function(item){return item.children;});
t.pass(function(item, parent){
  if (parent) {
    console.log("" + item.firstname + ' ' + item.lastname+
        " child of " + parent.firstname + ' ' + parent.lastname);
  }
}, true);

t.run();