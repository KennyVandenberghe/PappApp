var gulp = require('gulp'),
    rename = require("gulp-rename"),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    config = require('../config').iconfont,
    runTimestamp = Math.round(Date.now()/1000);

gulp.task('iconfont', function(){
  gulp.src([config.src])
    .pipe(iconfont({
      fontName: config.fontName, // required
      appendUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
      normalize: true
    }))
    .on('glyphs', function(glyphs, options) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return { name: glyph.name, codepoint: glyph.unicode[0].charCodeAt(0) };
        }),
        fontName: config.fontName,
        fontPath: config.path, // set path to font (from your CSS file if relative)
        className: config.class // set class name in your CSS
      };
      gulp.src(config.template)
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename: config.sassMixin}))
        .pipe(gulp.dest(config.sass)); // set path to export your CSS
    })
    .pipe(gulp.dest(config.dest));
});
