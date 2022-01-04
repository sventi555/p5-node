const browserify = require('browserify');
const del = require('del');
const gulp = require('gulp');
const connect = require('gulp-connect');
const open = require('gulp-open');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

gulp.task('clean', async (cb) => {
  await del('output/');
  cb();
});

gulp.task('build', () => {
  return browserify('src/sketch.js', { debug: true })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('output/'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  return gulp.watch('src/sketch.js', gulp.parallel('build'));
});

gulp.task('serve', () => {
  return connect.server({
    root: './',
    port: '8080',
    livereload: true
  });
});

gulp.task('open', () => {
  return gulp.src('index.html')
    .pipe(open({
      uri: 'http://localhost:8080'
    }));
});

gulp.task('default', gulp.parallel('build', 'serve', 'open', 'watch'));