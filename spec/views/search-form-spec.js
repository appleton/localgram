/*global fixtures*/

define(function(require) {
  var SearchFormView = require('views/search-form'),
      mediator = require('mediator');

  describe('SearchFormView', function() {
    beforeEach(function() {
      // Stub view dependencies
      this.el = $(fixtures.form)[0];
      this.collection = {
        on: jasmine.createSpy(),
        fetch: jasmine.createSpy()
      };

      // Create object under test
      this.view = new SearchFormView({
        el: this.el,
        collection: this.collection
      });
    });

    describe('events', function() {
      it('binds form submit', function() {
        expect(this.view.events.submit).toEqual('getLocation');
      });
    });

    describe('#initialize', function() {
      it('binds collection request event to #disable', function() {
        this.view.initialize();
        expect(this.collection.on)
          .toHaveBeenCalledWith('request', this.view.disable);
      });

      it('binds collection reset event to #enable', function() {
        this.view.initialize();
        expect(this.collection.on)
          .toHaveBeenCalledWith('reset', this.view.enable);
      });

      it('binds collection reset event to #showResults', function() {
        this.view.initialize();
        expect(this.collection.on)
          .toHaveBeenCalledWith('reset', this.view.showResults);
      });
    });

    describe('#enable', function() {
      it('enables the button', function() {
        $(this.el).find('button').attr('disabled', 'disabled');
        this.view.enable();
        expect($(this.el).find('button').attr('disabled')).toBeUndefined();
      });
    });

    describe('#disable', function() {
      it('disables the button', function() {
        $(this.el).find('button').removeAttr('disabled');
        this.view.disable();
        expect($(this.el).find('button').attr('disabled')).toEqual('disabled');
      });
    });

    describe('#getLocation', function() {
      beforeEach(function() {
        // TODO: this doesn't work in phantomjs
        // Implement a shim in support folder
        this.actualLocation = navigator.geolocation;
        navigator.geolocation = { getCurrentPosition: jasmine.createSpy() };
      });

      afterEach(function() {
        navigator.geolocation = this.actualLocation;
      });

      it('calls ev.preventDefault', function() {
        var ev = { preventDefault: jasmine.createSpy() };
        this.view.getLocation(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
      });

      it('gets the location', function() {
        spyOn(navigator.geolocation, 'getCurrentPosition');
        this.view.getLocation();
        expect(navigator.geolocation.getCurrentPosition)
          .toHaveBeenCalledWith(this.view.fetch);
      });
    });

    describe('#fetch', function() {
      it('calls collection#fetch', function() {
        var position = { coords: { latitude: 1, longitude: 1 } };
        this.view.fetch(position);
        expect(this.collection.fetch).toHaveBeenCalledWith({
          data: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            distance: $(this.el).find('input').val() * 1000
          }
        });
      });
    });

    describe('#showResults', function() {
      it('triggers a mediator event', function() {
        spyOn(mediator, 'trigger');
        this.view.showResults();
        expect(mediator.trigger)
          .toHaveBeenCalledWith('navigation', '/', { trigger: true });
      });
    });
  });
});
