define(function(require) {
  var fetch = require('helpers/instagram-fetch'),
      constants = require('constants'),
      Backbone = require('backbone');

  describe('instagramFetch helper', function() {
    beforeEach(function() {
      spyOn(Backbone.Model.prototype, 'fetch');
      spyOn(Backbone.Collection.prototype, 'fetch');
      this.model = new ( Backbone.Model.extend({ url: 'beans' }) )();
      spyOn(this.model, 'sync');
      this.opts = {};
    });

    it('adds data.client_id', function() {
      fetch.call(this.model, this.opts);
      expect(this.opts.data.client_id).toEqual(constants.IG_CLIENT_ID);
    });

    it('adds dataType', function() {
      fetch.call(this.model, this.opts);
      expect(this.opts.dataType).toEqual('jsonp');
    });

    it('prepends the URL when it is a string', function() {
      fetch.call(this.model, this.opts);
      expect(this.opts.url).toEqual(constants.API_ROOT + this.model.url);
    });

    it('prepends the URL when it is a function', function() {
      this.model.url = function() { return 'beans'; };
      fetch.call(this.model, this.opts);
      expect(this.opts.url).toEqual(constants.API_ROOT + this.model.url());
    });

    it('calls super when instance is a model', function() {
      fetch.call(this.model, this.opts);
      expect(Backbone.Model.prototype.fetch).toHaveBeenCalledWith(this.opts);
      expect(Backbone.Collection.prototype.fetch).not.toHaveBeenCalled();
    });

    it('calls super when instance is a collection', function() {
      var collection = new ( Backbone.Collection.extend() )();
      fetch.call(collection, this.opts);
      expect(Backbone.Collection.prototype.fetch).toHaveBeenCalledWith(this.opts);
      expect(Backbone.Model.prototype.fetch).not.toHaveBeenCalled();
    });
  });
});