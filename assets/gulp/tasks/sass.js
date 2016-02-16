var gulp = require('gulp');
var sass = require('gulp-sass');
var nodeSassGlobbing = require('node-sass-globbing');
//var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config=require('../config').sass;

gulp.task('sass', ['images'], function () {
  return gulp.src(config.src + "/*.scss")
    //.pipe(sourcemaps.init())
    .pipe(sass({
      outputstyle: 'nested',
      importer: nodeSassGlobbing,
      //sourcemap: true,
      includePaths: [
        config.compassPath,
        '../rvn-lib/scss'
      ]
    }).on('error', handleErrors))
    // .pipe(sourcemaps.write(config.srcMaps, {
    //   includeContent: false,
    //   sourceRoot: config.src
    // }))
    .pipe(gulp.dest(config.dest));
});
