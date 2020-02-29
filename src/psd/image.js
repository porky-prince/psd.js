// Generated by CoffeeScript 1.12.7
var Export, Image, ImageFormat, ImageMode, Module,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Module = require('./module').Module;

ImageFormat = require('./image_format');

ImageMode = require('./image_mode');

Export = require('./image_export');

module.exports = Image = (function(superClass) {
  var COMPRESSIONS, attr, fn, i, len, ref;

  extend(Image, superClass);

  Image.includes(ImageFormat.RAW);

  Image.includes(ImageFormat.RLE);

  Image.includes(ImageMode.Greyscale);

  Image.includes(ImageMode.RGB);

  Image.includes(ImageMode.CMYK);

  Image.includes(Export.PNG);

  COMPRESSIONS = ['Raw', 'RLE', 'ZIP', 'ZIPPrediction'];

  function Image(file, header) {
    this.file = file;
    this.header = header;
    this.numPixels = this.width() * this.height();
    if (this.depth() === 16) {
      this.numPixels *= 2;
    }
    this.calculateLength();
    this.pixelData = new Uint8Array(this.channelLength * 4);
    this.maskData = new Uint8Array(this.maskLength * 4);
    this.channelData = new Uint8Array(this.length + this.maskLength);
    this.opacity = 1.0;
    this.hasMask = false;
    this.startPos = this.file.tell();
    this.endPos = this.startPos + this.length;
    this.setChannelsInfo();
  }

  ref = ['width', 'height', 'channels', 'depth', 'mode'];
  fn = function(attr) {
    return Image.prototype[attr] = function() {
      return this.header[attr];
    };
  };
  for (i = 0, len = ref.length; i < len; i++) {
    attr = ref[i];
    fn(attr);
  }

  Image.prototype.setChannelsInfo = function() {
    switch (this.mode()) {
      case 1:
        return this.setGreyscaleChannels();
      case 3:
        return this.setRgbChannels();
      case 4:
        return this.setCmykChannels();
    }
  };

  Image.prototype.calculateLength = function() {
    this.length = (function() {
      switch (this.depth()) {
        case 1:
          return (this.width() + 7) / 8 * this.height();
        case 16:
          return this.width() * this.height() * 2;
        default:
          return this.width() * this.height();
      }
    }).call(this);
    this.channelLength = this.length;
    this.length *= this.channels();
    if (this.layer && this.layer.mask.size) {
      return this.maskLength = this.layer.mask.width * this.layer.mask.height;
    } else {
      return this.maskLength = 0;
    }
  };

  Image.prototype.parse = function() {
    var ref1;
    this.compression = this.parseCompression();
    if ((ref1 = this.compression) === 2 || ref1 === 3) {
      this.file.seek(this.endPos);
      return;
    }
    return this.parseImageData();
  };

  Image.prototype.parseCompression = function() {
    return this.file.readShort();
  };

  Image.prototype.parseImageData = function() {
    switch (this.compression) {
      case 0:
        this.parseRaw();
        break;
      case 1:
        this.parseRLE();
        break;
      case 2:
      case 3:
        this.parseZip();
        break;
      default:
        this.file.seek(this.endPos);
    }
    return this.processImageData();
  };

  Image.prototype.processImageData = function() {
    switch (this.mode()) {
      case 1:
        this.combineGreyscaleChannel();
        break;
      case 3:
        this.combineRgbChannel();
        break;
      case 4:
        this.combineCmykChannel();
    }
    return this.channelData = null;
  };

  return Image;

})(Module);
