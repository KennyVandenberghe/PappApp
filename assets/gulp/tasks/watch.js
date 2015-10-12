/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp  = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.sass.src + "/**/*.scss",   ['sass']);
  //TODO: add extra sass lib folders
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.iconfont.src, ['iconfont']);
  gulp.watch(config.fonts.src, ['fonts']);
});
