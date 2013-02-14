// before decorator
// Use:
//   var myFn = before(function(){ /* Stuff to do before */ });
//   var anotherFn = myFn(function() {/* Stuff to do after myFn */}));

define(function() {
  return function before(decoration) {
    return function (method) {
      return function () {
        decoration.apply(this, arguments);
        return method.apply(this, arguments);
      };
    };
  };
});
