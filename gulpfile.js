var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
  var server = gls.new('./bin/www');
  server.start();

  // 'lib/front/**/*.js', 'public/js/**/*.js', 
  gulp.watch(['views/**/*.jade'], function(file) {
    server.notify.apply(server, [file]);
  });

  gulp.watch(['src/back/**/*.js', 'app.js'], function() {
    server.start.bind(server)();
  });

});

gulp.task('default', ['serve']);
