var gulp = require('gulp');
var $ = require('gulp-load-plugins');
var open = require('open');

var app={
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
}

//拷贝文件
gulp.task('lib',function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath+'vendor'))
        .pipe(gulp.dest(app.prdPath+'vendor'))
})

//拷贝html
gulp.task('html',function () {
    gulp.src('app.srcPath'+'**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
})

gulp.task('json',function () {
    gulp.src('app.srcPath'+'**/*.json')
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
})