// Generated by CoffeeScript 1.12.7
var Descriptor, LayerInfo, SolidColor,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LayerInfo = require('../layer_info');

Descriptor = require('../descriptor');

module.exports = SolidColor = (function(superClass) {
  extend(SolidColor, superClass);

  SolidColor.shouldParse = function(key) {
    return key === 'SoCo';
  };

  function SolidColor(layer, length) {
    SolidColor.__super__.constructor.call(this, layer, length);
    this.r = this.g = this.b = 0;
  }

  SolidColor.prototype.parse = function() {
    this.file.seek(4, true);
    this.data = new Descriptor(this.file).parse();
    this.r = Math.round(this.colorData()['Rd  ']);
    this.g = Math.round(this.colorData()['Grn ']);
    return this.b = Math.round(this.colorData()['Bl  ']);
  };

  SolidColor.prototype.colorData = function() {
    return this.data['Clr '];
  };

  SolidColor.prototype.color = function() {
    return [this.r, this.g, this.b];
  };

  return SolidColor;

})(LayerInfo);
