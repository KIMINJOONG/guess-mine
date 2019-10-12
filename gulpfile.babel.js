import gulp from "gulp";
import sass from "gulp-sass";
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-csso';
import del from 'del';
import browserify from 'gulp-browserify';

sass.compiler = require('node-sass');

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'src/static/js',
    watch: 'assets/js/**/*.js'
  }
};

const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));

  
const js = () =>
    gulp
      .src(paths.js.src)
      .pipe(browserify())
      .pipe(gulp.dest(path.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
}

const clean = () => del(['src/static']);

const dev = gulp.series([clean, styles, js, watchFiles]);

export default dev;