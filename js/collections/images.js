define(function(require) {
  var Backbone = require('backbone'),
      instagramFetch = require('helpers/index').fetch,
      ImageModel = require('models/image');

  return Backbone.Collection.extend({
    url: '/media/search',

    model: ImageModel,

    fetch: instagramFetch,

    parse: function(attrs) {
      return attrs.data;
    }
  });
});
