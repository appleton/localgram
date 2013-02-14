define(function(require) {
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Router = require('router'),
      mediator = require('mediator');

  describe('Router', function() {
    beforeEach(function() {
      spyOn(Backbone.history, 'start');
      this.router = new Router();
    });

    describe('#initialize', function() {
      beforeEach(function() {
        this.fn = function() {};
        spyOn(_, 'bind').andReturn(this.fn);
      });

      it('binds the scope for #navigate', function() {
        this.router.initialize();
        expect(_.bind).toHaveBeenCalledWith(this.router.navigate, this.router);
      });

      it('binds to mediator navigation event', function() {
        spyOn(mediator, 'on');
        this.router.initialize();
        expect(mediator.on).toHaveBeenCalledWith('navigation', this.fn);
      });

      it('calls Backbone.history.start', function() {
        this.router.initialize();
        expect(Backbone.history.start).toHaveBeenCalledWith({ pushState: true });
      });
    });

    describe('routes', function() {
      it('routes to images/show', function() {
        expect(this.router.routes['images/:id']).toEqual('image');
      });

      it('routes to index', function() {
        expect(this.router.routes['']).toEqual('index');
      });
    });
  });
});
