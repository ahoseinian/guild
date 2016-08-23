var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
  var server = gls.new('./bin/www'); 
  server.start();

  gulp.watch(['lib/front/**/*.js', 'lib/front/**/*.jsx', 'views/**/*.jade'], function(file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch(['./src/back/**/*.js', 'app.js'], function() {
    server.start.bind(server)();
  });

});

gulp.task('default', ['serve']);
