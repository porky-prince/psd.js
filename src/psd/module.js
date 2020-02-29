// Generated by CoffeeScript 1.7.1
var Module, moduleKeywords,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

moduleKeywords = ['extended', 'included'];

exports.Module = Module = (function() {
  function Module() {}

  Module["extends"] = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this[key] = value;
      }
    }
    if ((_ref = obj.extended) != null) {
      _ref.call(this, this);
    }
    return this;
  };

  Module.includes = function(obj) {
    var key, value, _ref;
    for (key in obj) {
      value = obj[key];
      if (__indexOf.call(moduleKeywords, key) < 0) {
        this.prototype[key] = value;
      }
    }
    if ((_ref = obj.included) != null) {
      _ref.call(this, this);
    }
    return this;
  };

  Module.delegate = function() {
    var args, source, target, _i, _len, _results;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    target = args.pop();
    _results = [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      source = args[_i];
      _results.push(this.prototype[source] = target.prototype[source]);
    }
    return _results;
  };

  Module.aliasFunction = function(to, from) {
    return this.prototype[to] = (function(_this) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.prototype[from].apply(_this, args);
      };
    })(this);
  };

  Module.aliasProperty = function(to, from) {
    return Object.defineProperty(this.prototype, to, {
      get: function() {
        return this[from];
      },
      set: function(val) {
        return this[from] = val;
      }
    });
  };

  Module.included = function(func) {
    return func.call(this, this.prototype);
  };

  return Module;

})();