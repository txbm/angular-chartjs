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
      
  require('gulp-help')(gulp);

  function _reloadPkgFile() {
    delete require.cache[require.resolve('./package.json')];
    pkg = require('./package.json');
  }

  gulp.task('jshint', 'JSHints the source', function (done) {
    gulp.src(jsSrcGlob)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .on('finish', done);
  });

  gulp.task('test-js', 'Tests the JS source.', function (done) {
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

  gulp.task('build-js', 'Builds the JS source.',  [], function (done) {
    gulp.src(jsSrcGlob)
    .pipe(plugins.concat('angular-chartjs.js'))
    .pipe(gulp.dest('dist'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename('angular-chartjs.min.js'))
    .pipe(gulp.dest('dist'))
    .on('end', done);
  });
  
  gulp.task('watch-js', 'Watches and builds the JS source', [], function () {
    gulp.watch(jsSrcGlob, ['build-js']);
  });

  gulp.task('serve', 'Fire up a dev server', function () {
    plugins.connect.server({
      root: 'demo',
      port: 8000
    });
  });

  gulp.task('develop', 'Fire up a dev server and watch for source changes',  ['serve'], function () {
    gulp.watch(jsSrcGlob, ['build-js']);
  });

})();