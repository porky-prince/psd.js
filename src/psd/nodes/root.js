// Generated by CoffeeScript 1.12.7
var Group, Layer, Node, Root, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

_ = require('lodash');

Node = require('../node');

Group = require('./group');

Layer = require('./layer');

module.exports = Root = (function(superClass) {
  extend(Root, superClass);

  Root.layerForPsd = function(psd) {
    var i, layer, len, prop, ref;
    layer = {};
    ref = Node.PROPERTIES;
    for (i = 0, len = ref.length; i < len; i++) {
      prop = ref[i];
      layer[prop] = null;
    }
    layer.top = 0;
    layer.left = 0;
    layer.right = psd.header.width;
    layer.bottom = psd.header.height;
    return layer;
  };

  Root.prototype.type = 'root';

  function Root(psd1) {
    this.psd = psd1;
    Root.__super__.constructor.call(this, Root.layerForPsd(this.psd));
    this.buildHeirarchy();
  }

  Root.prototype.documentDimensions = function() {
    return [this.width, this.height];
  };

  Root.prototype.depth = function() {
    return 0;
  };

  Root.prototype.opacity = function() {
    return 255;
  };

  Root.prototype.fillOpacity = function() {
    return 255;
  };

  Root.prototype["export"] = function() {
    var ref, ref1;
    return {
      children: this._children.map(function(c) {
        return c["export"]();
      }),
      document: {
        width: this.width,
        height: this.height,
        resources: {
          layerComps: ((ref = this.psd.resources.resource('layerComps')) != null ? ref["export"]() : void 0) || [],
          resolutionInfo: ((ref1 = this.psd.resources.resource('resolutionInfo')) != null ? ref1["export"]() : void 0) || [],
          guides: [],
          slices: []
        }
      }
    };
  };

  Root.prototype.buildHeirarchy = function() {
    var currentGroup, i, layer, len, parent, parseStack, ref;
    currentGroup = this;
    parseStack = [];
    ref = this.psd.layers;
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      if (layer.isFolder()) {
        parseStack.push(currentGroup);
        currentGroup = new Group(layer, _.last(parseStack));
      } else if (layer.isFolderEnd()) {
        parent = parseStack.pop();
        parent.children().push(currentGroup);
        currentGroup = parent;
      } else {
        currentGroup.children().push(new Layer(layer, currentGroup));
      }
    }
    return this.updateDimensions();
  };

  return Root;

})(Node);
