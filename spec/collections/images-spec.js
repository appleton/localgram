define(function(require) {
  var Images = require('collections/images'),
      instagramFetch = require('helpers/instagram-fetch');

  describe('Images', function() {
    beforeEach(function() {
      this.collection = new Images();
    });

    it('has the correct url', function() {
      expect(Images.prototype.url).toEqual('/media/search');
    });

    it('includes the instagramFetch helper', function() {
      expect(Images.prototype.fetch).toEqual(instagramFetch);
    });

    describe('#parse', function() {
      it('returns attrs.data', function() {
        var attrs = { data: ['lol', 'wut'] };
        expect( this.collection.parse(attrs) ).toEqual(attrs.data);
      });
    });
  });
});