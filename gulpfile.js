const { dest, series, src, watch } = require('gulp');
const del = require('del');
const eslint = require('gulp-eslint');
const log = require('fancy-log');
const prettier = require('gulp-prettier');
const gulpWebpack = require('webpack-stream');
const webpackCompiler = require('webpack');
const webpackConfig = require('./webpack.config')

function bundle() {
    log('Running bundler');

    return src('src/widget.ts')
        .pipe(gulpWebpack(webpackConfig, webpackCompiler, function(err, stats) { }))
        .pipe(dest('dist/'));
}

function clean() {
    log(`Cleaning up 'dist' directory`);

    return del('./dist/**', { force: true });
}

function format() {
    log('Formatting widget.html|js|json');

    return src('dist/widget.{html,json}')
        .pipe(
            prettier({
                arrowParens: 'always',
                tabWidth: 4,
                quoteProps: 'consistent',
                singleQuote: true,
                printWidth: 100,
                useTabs: false,
            })
        )
        .pipe(dest('dist/'));
}

function lint() {
    log('Linting TypeScript files');

    return src('src/**/*.ts')
        .pipe(
            eslint({
                configFile: '.eslintrc.json',
            })
        )
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function move() {
    log(`Moving widget.html|json to 'dist' directory`);

    return src('src/widget.{html,json,css}').pipe(dest('dist/'));
}

function watchFiles() {
    log('Watching widget.html|json|scss and *.ts');
    
    watch('src/widget.{html,json,css}', move);
    watch('src/**/*.ts', exports.default);
}

exports.bundle = bundle;
exports.clean = clean;
exports.lint = lint;
exports.watch = series(lint, clean, bundle, move, format, watchFiles);
exports.default = series(lint, clean, bundle, move, format);