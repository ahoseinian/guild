var gulp = require('gulp');
var gls = require('gulp-live-server');

gulp.task('serve', function() {
    var server = gls.new('./bin/www');
    server.start();

    gulp.watch(['static/**/*.css', 'static/**/*.html'], function(file) {
        server.notify.apply(server, [file]);
    });
    gulp.watch('app.js', server.start.bind(server)); //restart my server 

    // Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn` 
    // gulp.watch('app.js', function() {
    //     server.start.bind(server)()
    // });
});

gulp.task('default', ['serve']);