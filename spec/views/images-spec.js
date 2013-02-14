define(function(require) {
  var _ = require('underscore'),
      ImagesView = require('views/images');

  describe('ImagesView', function() {
    beforeEach(function() {
      // Stub view dependencies
      this.collection = {
        on: jasmine.createSpy(),
        each: jasmine.createSpy(),
        toJSON: jasmine.createSpy()
      };

      // Create object under test
      this.view = new ImagesView({
        collection: this.collection
      });
    });

    describe('#initialize', function() {
      it('binds to collection reset event', function() {
        // Stubbing underscore.bindAll as it changes the view methods
        // which kills the listenTo spy
        spyOn(_, 'bindAll');
        spyOn(this.view, 'listenTo');
        this.view.initialize();
        expect(this.view.listenTo)
          .toHaveBeenCalledWith(this.collection, 'reset', this.view.render);
      });
    });

    describe('#render', function() {
      it('replaces the element contents', function() {
        spyOn(this.view.$el, 'html');
        this.view.render();
        expect(this.view.$el.html).toHaveBeenCalled();
      });

      it('appends the element to #main', function() {
        var htmlSpy = jasmine.createSpy();
        spyOn(window, '$').andReturn({ html: htmlSpy });
        this.view.render();
        expect($).toHaveBeenCalledWith('#main');
        expect(htmlSpy).toHaveBeenCalledWith(this.view.el);
      });
    });
  });
});