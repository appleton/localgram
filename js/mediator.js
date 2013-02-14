// A global singleton object for publishing events
// This is a good way to communicate between objects without a direct reference

define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone');

  return _.clone(Backbone.Events, {});
});