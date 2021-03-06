'use strict';
const gulp = require('gulp');
const csslint = require('gulp-csslint');
const htmlhint = require("gulp-htmlhint");
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const connect = require('gulp-connect');

const paths = {
  src: 'src', dst: './',
  css:   ['demo/*.css', 'demo/**/*.css',
          'test/*.css', 'test/**/*.css'],
  html:  ['demo/*.html', 'demo/**/*.html',
          'test/*.html', 'test/**/*.html'],
  js:    ['demo/*.js',   'demo/**/*.js',
          'test/*.js',   'test/**/*.js',
          'src/*.js',    'src/**/*.js'],
  jssrc: ['src/*.js',    'src/**/*.js']
};


gulp.task('css-lint', function() {
  return gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(connect.reload());
});

gulp.task('html-hint', _ => {
  return gulp.src(paths.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(connect.reload());
});

gulp.task('js-eslint', _ => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(connect.reload());
});

gulp.task('js-copy', _ => {
  return gulp.src(paths.jssrc)
    .pipe(babel())
    .pipe(gulp.dest(paths.dst));
});

gulp.task('watch', _ => {
  gulp.watch(paths.js, ['js-eslint']);
  gulp.watch(paths.css, ['css-lint']);
  gulp.watch(paths.html, ['html-hint']);
  gulp.watch(paths.jssrc, ['js-copy']);
});

gulp.task('connect', function() {
  connect.server({
    root: paths.dst,
    livereload: true
  });
});

gulp.task('default', [
  'js-eslint',
  'css-lint',
  'html-hint',
  'js-copy',
  'watch',
  'connect'
]);

