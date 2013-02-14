define(function(require) {
  var // Libraries
      _ = require('underscore'),
      Backbone = require('backbone'),

      // Decorators
      cleanBefore = require('helpers/index').cleanBefore,

      // Models
      ImageModel = require('models/image'),

      // Collections
      Images = require('collections/images'),

      // Views
      SearchFormView = require('views/search-form'),
      ImageView = require('views/image'),
      ImagesView = require('views/images'),

      // Instances
      mediator = require('mediator'),
      imagesCollection = new Images();

  // Init gloabl views
  new SearchFormView({ collection: imagesCollection });

  return Backbone.Router.extend({
    initialize: function() {
      mediator.on('navigation', _.bind(this.navigate, this) );
      Backbone.history.start({ pushState: true });
    },

    routes: {
      'images/:id': 'image',
      '': 'index'
    },

    image: cleanBefore(function(id) {
      // Check if we already have model data
      var model = imagesCollection.get(id);

      // Fetch it from the API if we don't
      if (!model) {
        model = new ImageModel({ id: id });
        model.fetch();
      }

      // Init a new top level view
      this.currentView = new ImageView({
        id: id,
        model: model
      });
    }),

    index: cleanBefore(function() {
      // Init a new top level view
      this.currentView = new ImagesView({ collection: imagesCollection });
    })
  });
});
