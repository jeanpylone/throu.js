(function(window){
  var defaultChildrenSelector = function(item){return item.children;};
  var runPass = function(pass, item, childrenSelector, parent){
    pass(item, parent);
    var children = childrenSelector(item)||[];
    for(var i=0;i<children.length;i++){
      runPass(pass, children[i], childrenSelector, item);
    }
  };
  var runPassReverse = function(pass, item, childrenSelector, parent){
    var children = childrenSelector(item)||[];
    for(var i=0;i<children.length;i++){
      runPass(pass, children[i], childrenSelector, item);
    }
    pass(item, parent);
  };

  var Throu = function(data){
    this._data = data;
    this._childrenSelector = defaultChildrenSelector;
    this._passes = [];
    this._beforePass = function(){};
    this._afterPass = function(){};
  };
  Throu.prototype = {
    setChildrenSelector:function(selector){
      this._childrenSelector = selector;
    },
    pass:function(pass, childrenFirst){
      this._passes.push({pass:pass, childrenFirst:childrenFirst});
    },
    beforePass:function(cb){
      this._beforePass = cb;
    },
    afterPass:function(cb){
      this._afterPass = cb;
    },
    run:function(){
      for(var p = 0;p<this._passes.length;p++){
        var pass = this._passes[p];
        this._beforePass(p);
        if(!pass.childrenFirst){
          runPass(pass.pass, this._data, this._childrenSelector);
        } else {
          runPassReverse(pass.pass, this._data, this._childrenSelector);
        }
        this._afterPass(p);
      }
    },
    destroy:function(){
      this._data = null;
      this._passes.length = 0;
      this._childrenSelector = null;
    }
  };

  var runFlatten = function(parent, childrenSelector, flat){
    var children = childrenSelector(parent);
    for(var i=0;i<children.length;i++){
      flat.push({item:children[i], parent:parent});
      runFlatten(children[i], childrenSelector, flat);
    }
  };

  var ThrouFlat = function(data){
    this._data = data;
    this._childrenSelector = defaultChildrenSelector;
    this._flattened = [];
    this._passes = [];
    this._beforePass = function(){};
    this._afterPass = function(){};
    this._refreshFlattened();
  };
  ThrouFlat.prototype = {
    setChildrenSelector:function(selector){
      this._childrenSelector = selector;
      this._refreshFlattened();
    },
    _refreshFlattened:function(){
      this._flattened.length = 0;
      this._flattened.push({item : this._data, parent: null});
      runFlatten(this._data, this._childrenSelector, this._flattened);
    },
    pass:function(pass, childrenFirst){
      this._passes.push({pass:pass, childrenFirst:childrenFirst});
    },
    beforePass:function(cb){
      this._beforePass = cb;
    },
    afterPass:function(cb){
      this._afterPass = cb;
    },
    run:function(){
      for(var p = 0;p<this._passes.length;p++){
        var pass = this._passes[p];
        this._beforePass(p);
        var l = this._flattened.length;
        for(var i=0;i<l;i++){
          var item = this._flattened[!pass.childrenFirst?i:(l-i-1)];
          pass.pass(item.item, item.parent);
        }
        this._afterPass(p);
      }
    },
    destroy:function(){
      this._data = null;
      this._flattened.length = 0;
      this._passes.length = 0;
      this._childrenSelector = null;
    }
  };

  window.Throu = Throu;
  window.ThrouFlat = ThrouFlat;
})(window);