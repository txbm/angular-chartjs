(function () {
  'use strict';

  var gulp = require('gulp'),
      plugins = require('gulp-load-plugins')(),
      deps = require('source-deps'),
      karma = require('karma').server,
      jsSrcGlob = [
        'src/js/*.js'
      ],
      jsSpecGlob = 'src/js/spec/**/*.js',
      depFiles = deps({
        packagers: ['bower'],
        overrides: {
          'Chart.js': ['Chart.min.js']
        },
        order: [
          'Chart.js',
          'angular',
          'angular-mocks'
        ],
        includeDevPackages: true
      });


  gulp.task('test-js', function (done) {
    var karmaConfig = {
          browsers: ['PhantomJS'],
          frameworks: ['mocha', 'chai'],
          files: depFiles.concat(
            jsSrcGlob,
            jsSpecGlob
          ),
          reporters: ['mocha'],
          singleRun: true
        };

    karma.start(karmaConfig, done);
  });

  gulp.task('build-js', [], function (done) {
    gulp.src(jsSrcGlob)
    .pipe(plugins.concat('angular-chartjs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('angular-chartjs.min.js'))
    .pipe(gulp.dest('dist'))
    .on('end', done);
  });

  gulp.task('serve', function () {
    plugins.connect.server({
      root: 'demo',
      port: 8000
    });
  });

  gulp.task('develop', ['serve'], function () {
    gulp.watch(jsSrcGlob, ['build-js']);
  });

})();