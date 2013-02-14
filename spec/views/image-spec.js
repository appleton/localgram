define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      ImageView = require('views/image');

  describe('ImageView', function() {
    beforeEach(function() {
      // Create object under test
      this.view = new ImageView({ model: new Backbone.Model() });
      spyOn(_, 'bindAll');
    });

    describe('#initialize', function() {
      it('binds all method contexts', function() {
        this.view.initialize();
        expect(_.bindAll).toHaveBeenCalledWith(this.view);
      });

      it('binds to model changes', function() {
        spyOn(this.view, 'listenTo');
        this.view.initialize();
        expect(this.view.listenTo)
          .toHaveBeenCalledWith(this.view.model, 'change', this.view.render);
      });

      it('calls #render', function() {
        spyOn(this.view, 'render');
        this.view.initialize();
        expect(this.view.render).toHaveBeenCalled();
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