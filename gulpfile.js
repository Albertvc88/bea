const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        rename = require("gulp-rename"),
        autoprefixer = require('gulp-autoprefixer'),
        browserSync = require('browser-sync').create();

function style() {
    return  gulp.src([
                './dist/scss/**/*.scss'
            ])
            .pipe(sass())
            .pipe(gulp.dest('./bea-html/css'))
            .pipe(browserSync.stream());
}
function copycss() {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ])
    .pipe(gulp.dest('./bea-html/css/components/bootstrap'))
    .pipe(browserSync.stream());
}
function js() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
    ])
    .pipe(gulp.dest('./bea-html/js'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
            baseDir: './bea-html'
        }
    });
    gulp.watch([
            './dist/scss/**/*.scss'
        ] , gulp.series(style));
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
    gulp.watch('./dist/js/**/*.js').on('change', browserSync.reload);
    gulp.watch("./dist/**/*.html", gulp.series(html));
    gulp.watch([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
    ] , gulp.series(js));
}
function html() {
    return gulp.src('./dist/*.html')
           .pipe(gulp.dest('./bea-html'));        
}
//exports.style = style;
//exports.html = html;
//exports.watch = watch;

gulp.task('build', gulp.parallel(js, html, style, copycss));
gulp.task('default', gulp.series('build', watch));
