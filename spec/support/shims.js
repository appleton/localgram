(function(){
  if ('geolocation' in navigator) { return; }
  navigator.geolocation = {
    getCurrentPosition: function(cb) {
      cb({
        coords: { latitude: 1, longitude: 1 }
      });
    }
  };
}());
