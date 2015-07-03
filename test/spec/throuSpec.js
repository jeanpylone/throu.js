"use strict";

describe('throu.js', function(){
  var data = {value:1, children:[
    {value:2},
    {value:3, children:[
      {value:4, children:[
        {value:5}
      ]}
    ]}
  ]};
  var data2 = {value:6, children:[
    {value:7},
    {value:8, children:[
      {value:9, children:[
        {value:10}
      ]}
    ]}
  ]};
  var data3 = {value:3, __children:[
    {value:4},
    {value:5, __children:[
      {value:6, __children:[
        {value:7}
      ]}
    ]}
  ]};
  it('should instantiate empty Throu', function(){
    var throu = new window.Throu();
    expect(throu).not.toBe(null);
  });
  it('should instantiate Throu', function(){
    var throu = new window.Throu(data);
    expect(throu).not.toBe(null);
  });
  it('should run Throu one pass', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
  });
  it('should run Throu one pass, change data and run pass again', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
    throu.setData(data2);
    total = 0;
    throu.run();
    expect(total).toBe(40);
  });
  it('should run Throu one pass, change data, childrenSelector and run pass again', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
    throu.setData(data3);
    throu.setChildrenSelector(function(item){return item.__children;});
    total = 0;
    throu.run();
    expect(total).toBe(25);
  });
  it('should run Throu one pass with a complex childrenSelector', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.setChildrenSelector(function(item){return (item.value%2) ? item.children : null;});
    throu.run();
    expect(total).toBe(10);
  });
  it('should run Throu one pass reverse', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      total += item.value;
    }, true);
    throu.run();
    expect(total).toBe(15);
  });
  it('should run Throu one pass and one pass reverse', function(){
    var total = 0,throu = new window.Throu(data);
    throu.pass(function(item){
      if (item.value%2) {
        total += item.value;
      }
    });
    throu.pass(function(item){
      if ((item.value%2)===0) {
        total -= item.value;
      }
    }, true);
    throu.run();
    expect(total).toBe(3);
  });

  it('should instantiate empty ThrouFlat', function(){
    var throu = new window.ThrouFlat();
    expect(throu).not.toBe(null);
  });
  it('should instantiate ThrouFlat', function(){
    var throu = new window.ThrouFlat(data);
    expect(throu).not.toBe(null);
  });
  it('should run ThrouFlat one pass', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
  });
  it('should run ThrouFlat one pass, change data and run pass again', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
    throu.setData(data2);
    total = 0;
    throu.run();
    expect(total).toBe(40);
  });
  it('should run ThrouFlat one pass, change data, childrenSelector and run pass again', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.run();
    expect(total).toBe(15);
    throu.setData(data3);
    throu.setChildrenSelector(function(item){return item.__children;});
    total = 0;
    throu.run();
    expect(total).toBe(25);
  });
  it('should run ThrouFlat one pass with a complex childrenSelector', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      total += item.value;
    });
    throu.setChildrenSelector(function(item){return (item.value%2) ? item.children : null;});
    throu.run();
    expect(total).toBe(10);
  });
  it('should run ThrouFlat one pass reverse', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      total += item.value;
    }, true);
    throu.run();
    expect(total).toBe(15);
  });
  it('should run ThrouFlat one pass and one pass reverse', function(){
    var total = 0,throu = new window.ThrouFlat(data);
    throu.pass(function(item){
      if (item.value%2) {
        total += item.value;
      }
    });
    throu.pass(function(item){
      if ((item.value%2)===0) {
        total -= item.value;
      }
    }, true);
    throu.run();
    expect(total).toBe(3);
  });
});