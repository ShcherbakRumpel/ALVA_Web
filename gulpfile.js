const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 5 versions', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('src/css'))
        // .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

// gulp.task('scripts', () =>  {
//     return gulp.src([
//         'src/libs/jquery/dist/jquery.min.js',
//         'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
//     ])
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('src/js'));
// });

// gulp.task('css-libs', ['sass'], () =>  {
//     return gulp.src('src/css/libs.css')
//         .pipe(cssnano())
//         .pipe(rename({suffix: '.min'}))
//         .pipe(gulp.dest('src/css'));
// });

// gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], () =>  {
gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('src/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    // gulp.watch('src/*.html', browserSync.reload);
    gulp.watch("src/js/**/*.js").on('change', browserSync.reload);
    // gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('clean', () => {
    return del.sync('build');
});

gulp.task('img', () => {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/images'))
});

gulp.task('build', ['clean', 'img', 'sass'], () => {

    const buildCss = gulp.src([
            'src/css/main.css',
            // 'src/css/font-awesome.min.css'
        ])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'))

    const buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('build/fonts'))

    const buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('build/js'))

    const buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('build'));

});

gulp.task('clear', (callback) => {
    return cache.clearAll();
})

gulp.task('default', ['watch']);