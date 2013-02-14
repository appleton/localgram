define(function(require) {
  var ImageModel = require('models/image'),
      instagramFetch = require('helpers/instagram-fetch');

  describe('ImageModel', function() {
    beforeEach(function() {
      this.model = new ImageModel();
    });

    it('has the correct url', function() {
      expect(ImageModel.prototype.urlRoot).toEqual('/media');
    });

    it('includes the instagramFetch helper', function() {
      expect(ImageModel.prototype.fetch).toEqual(instagramFetch);
    });

    describe('#parse', function() {
      it('returns attrs when there is no data property', function() {
        var attrs = {};
        expect(this.model.parse(attrs)).toEqual(attrs);
      });

      it('returns attrs.data when there is a data property', function() {
        var attrs = { data: 'hello' };
        expect(this.model.parse(attrs)).toEqual(attrs.data);
      });
    });
  });
});