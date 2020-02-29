// Generated by CoffeeScript 1.12.7
var ResourceSection, _;

_ = require('lodash');

module.exports = ResourceSection = (function() {
  var RESOURCES;

  function ResourceSection() {}

  RESOURCES = [require('./resources/layer_comps'), require('./resources/layer_links'), require('./resources/resolution_info')];

  ResourceSection.factory = function(resource) {
    var Section, i, len;
    for (i = 0, len = RESOURCES.length; i < len; i++) {
      Section = RESOURCES[i];
      if (Section.prototype.id !== resource.id) {
        continue;
      }
      return _.tap(new Section(resource), function(s) {
        return s.parse();
      });
    }
    return null;
  };

  return ResourceSection;

})();