define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      constants = require('constants');

  return function(options) {
    // Always include client_id token in requests
    options || (options = {});
    options.data || (options.data = {});
    options.data.client_id = constants.IG_CLIENT_ID;

    // The API is jsonp only
    options.dataType = 'jsonp';

    // Prepend the URL with the base path to keep models & collections dry
    options.url = constants.API_ROOT + (_.isFunction(this.url) ? this.url() : this.url);

    // Call super for the correct base class
    return Backbone[(this instanceof Backbone.Model ? 'Model' : 'Collection')]
      .prototype.fetch.call(this, options);
  };
});