// Ensure the previous top level view is disposed of completely

define(function(require) {
  var _ = require('underscore'),
      before = require('helpers/before');

  return before(function(){
    if (this.currentView) {
      this.currentView.remove();

      if (this.currentView.children) {
        _(this.currentView.children).invoke('remove');
      }

      delete this.currentView;
    }
  });
});