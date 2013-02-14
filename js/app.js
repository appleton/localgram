require([ 'router' ], function(Router){
  var router = new Router();

  // Catch clicks on domain relative links and send them to the router
  $('body').on('click', 'a[href^="/"]', function(ev) {
    ev.preventDefault();
    router.navigate($(this).attr('href'), { trigger: true });
  });
});
