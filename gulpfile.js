var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var react = require('gulp-react');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var pump = require('pump');
var combinedStream = require('combined-stream');
var os = require('os');

gulp.task('js-copy', function () {
  gulp.src('./src/webApiClients/**/*.js')
        .pipe(gulp.dest('./src/dist/webApiClients'));
  gulp.src('./src/stores/**/*.js')
        .pipe(gulp.dest('./src/dist/stores'));
  gulp.src('./src/classes/**/*.js')
		.pipe(gulp.dest('./src/dist/classes'));
  gulp.src('./src/actions/**/*.js')
        .pipe(gulp.dest('./src/dist/actions'));
  return gulp.src('./src/client.js')
        .pipe(gulp.dest('./src/dist'));
});

gulp.task('jsx-transform', function () {
  return gulp.src('./src/components/**/*.jsx')
        .pipe(react({harmony: false, es6module: true}).on('error', console.error.bind(console)))
        .pipe(gulp.dest('./src/dist/components'));
});

function compileApp(watch) {
  var bundler = browserify('./src/dist/client.js', { debug: true });
  
  var bundleStream = combinedStream.create();
  bundleStream.append(bundler.bundle());

  function rebundle() {
    bundleStream
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./src/dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
};

gulp.task('rbuild',['build'], function (cb) {
  pump([
        gulp.src('./src/dist/bundle.js'),
        uglify(),
        gulp.dest('./src/dist/minified')
    ],
    cb
  );
});

function watch() {
  return compileApp(true);
};

gulp.task('build', ['js-copy', 'jsx-transform'], function() { return compileApp(); });
gulp.task('watch', ['js-copy', 'jsx-transform'], function() { return watch(); });

gulp.task('default', ['watch']);
