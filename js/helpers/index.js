define(function(require) {
  return {
    before: require('helpers/before'),
    fetch: require('helpers/instagram-fetch'),
    cleanBefore: require('helpers/clean-before')
  };
});