define(function(require) {
  var Backbone = require('backbone'),
      instagramFetch = require('helpers/index').fetch;

  return Backbone.Model.extend({
    urlRoot: '/media',

    fetch: instagramFetch,

    parse: function(attrs) {
      return (attrs.data ? attrs.data : attrs);
    }
  });
});