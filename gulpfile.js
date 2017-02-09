'use strict'

var gulp = require('gulp'),
    px2rem = require('gulp-px3rem'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyHTML = require('gulp-minify-html');


gulp.task('minifycss', function() {
    return gulp.src('public/build/*.css')      //压缩的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifycss())   //执行压缩
        .pipe(gulp.dest('public/dist'));  //输出
});

gulp.task('minifyjs', function() {
    return gulp.src('public/js/*.js')
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('public/dist'));  //输出
});


gulp.task('clean', function(cb) {
    del([ 'public/dist/*'], cb)
});



gulp.task('default', function() {
    gulp.start('clean','flex','minifycss','minifyjs');
});


gulp.task("flex", function () {
    return gulp.src('public/css/*.css')
        .pipe(px2rem())
        .pipe(gulp.dest('public/build'));
});


gulp.task('watch', function(){
    gulp.watch('public/css/*.css', ['flex']);
});