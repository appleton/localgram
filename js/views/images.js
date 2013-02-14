define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Handlebars = require('handlebars'),
      template = Handlebars.compile( require('text!templates/images.hbs') );

  return Backbone.View.extend({
    tagName: 'ul',

    attributes: {
      class: 'thumbnails'
    },

    initialize: function() {
      _.bindAll(this);
      this.listenTo(this.collection, 'reset', this.render);

      // Render now if there's something to show
      if (this.collection.length) { this.render(); }
    },

    render: function() {
      this.$el.html( template(this.collection.toJSON()) );
      $('#main').html(this.el);
    }
  });
});