var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app={
    srcPath:'src/',
    devPath:'build/',
    prdPath:'dist/'
}

gulp.task('build',['clean'],function () {
    return gulp.start('lib','html','less','js','json','image');
});

//拷贝文件
gulp.task('lib',function () {
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath+'vendor'))
        .pipe(gulp.dest(app.prdPath+'vendor'))
        .pipe($.connect.reload());
})

//拷贝html
gulp.task('html',function () {
    gulp.src(app.srcPath+'**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
})

gulp.task('json',function () {
    gulp.src('app.srcPath'+'**/*.json')
        .pipe(gulp.dest(app.devPath+'data'))
        .pipe(gulp.dest(app.prdPath+'data'))
        .pipe($.connect.reload());
})

gulp.task('less',function () {
    gulp.src(app.srcPath+'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath+'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath+'css'))
        .pipe($.connect.reload());
})

gulp.task('jade',function () {
    gulp.src(app.srcPath+'**/*.jade')
        .pipe($.jade())
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
})

gulp.task('js',function () {
    gulp.src(app.srcPath+'script/**/*.js')
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath+'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath+'js'))
        .pipe($.connect.reload());
})

gulp.task('image',function () {
    gulp.src(app.srcPath+'image/**/*')
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath+'image'))
        .pipe($.connect.reload());
})

//清除任务
gulp.task('clean',function () {
    gulp.src([app.devPath,app.prdPath])
        .pipe($.clean())
        .pipe($.connect.reload());
})

gulp.task('serve',['build'],function () {
    $.connect.server({
        root:[app.devPath],
        livereload: true,
        port: 1234
    });
    open('http://localhost:1234/index.html');

    gulp.watch(app.srcPath+'script/**/*.js',['js']);
    gulp.watch('bower_components/**/*',['lib']);
    gulp.watch(app.srcPath+'**/*.html',['html']);
    // gulp.watch(app.srcPath+'**/*.jade',['jade']);
    gulp.watch(app.srcPath+'data/**/*.json',['json']);
    gulp.watch(app.srcPath+'style/**/*.less',['less']);
    gulp.watch(app.srcPath+'image/**/*',['image']);
})

gulp.task('default',['serve']);
