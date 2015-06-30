var fs = require('fs');

var gen = function() {
  var data = {first:[], last:[]},
      fLength= 0, lLength=0;
  return {
    init : function(readyCb) {
      fs.readFile('samplenames.json', function (err, d) {
        data = JSON.parse(d);
        fLength = data.first.length;
        lLength = data.last.length;
        readyCb();
      });
    },
    randomFirst:function(){
      return data.first[Math.floor(Math.random() * fLength)];
    },
    randomLast:function(){
      return data.last[Math.floor(Math.random() * lLength)];
    },
    randomPerson:function(){
      return {
        firstname:this.randomFirst(),
        lastname:this.randomLast(),
        children:[]
      };
    },
    nList: function(n){
      var result = [];
      for (var i=0;i<n;i++){
        result.push(this.randomPerson());
      }
      return result;
    },
    ten: function(){
      return this.nList(10);
    },
    tens: function(lvl){
      var result = this.ten();
      for (var i=0;i<10;i++) {
        if (lvl>0) {
          result[i].children = this.tens(lvl - 1);
        }
      }
      return result;
    },
    tree: function(lvl){
      var result = this.randomPerson();
      if (lvl>0) {
        result.children = this.tens(lvl - 1);
      }
      return result;
    }
  }
};

var g = gen();
g.init(function(){
  for(var n = 1;n<7;n++) {
    fs.writeFile('sample' + n + '.json', JSON.stringify(g.tree(n)), function (err) {
    });
  }
});