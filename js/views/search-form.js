define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      mediator = require('mediator');

  return Backbone.View.extend({
    el: 'form.geolocate',

    events: {
      'submit': 'getLocation'
    },

    initialize: function() {
      _.bindAll(this);
      this.collection.on('request', this.disable);
      this.collection.on('reset', this.enable);
      this.collection.on('reset', this.showResults);
    },

    enable: function() {
      this.$('button').removeAttr('disabled');
    },

    disable: function() {
      this.$('button').attr('disabled', 'disabled');
    },

    getLocation: function(ev) {
      if (ev && ev.preventDefault) { ev.preventDefault(); }
      navigator.geolocation.getCurrentPosition(this.fetch);
    },

    fetch: function(position) {
      this.collection.fetch({
        data: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          distance: (this.$('input[name=distance]').val() || 1) * 1000
        }
      });
    },

    showResults: function() {
      mediator.trigger('navigation', '/', { trigger: true });
    }
  });
});
