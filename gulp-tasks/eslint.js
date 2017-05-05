import gulp from 'gulp';
import eslint from 'gulp-eslint';

const config = {
  src: [
    'app/**/*.jsx',
    'app/*.js',
    'server/*.js',
    'server.js',
    'index.js',
    'webpack.config.js',
  ],
};

gulp.task('eslint', () =>
  gulp.src(config.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
