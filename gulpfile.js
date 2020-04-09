// generated on 2020-03-21 using generator-webapp 4.0.0-8
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const fs = require('fs');
const mkdirp = require('mkdirp');
const browserSync = require('browser-sync');
const del = require('del');
const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const { webpackDev, webpackProd } = require('./webpack.config');
const { argv } = require('yargs');

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const webpackConfiguration = isProd ? webpackProd : webpackDev;

const TailwindExtractor = (content) => {
	return content.match(/[A-z0-9-:\/]+/g);
}

function styles() {
	return src('app/styles/*.scss', {
		sourcemaps: !isProd,
	})
		.pipe($.plumber())
		.pipe($.sass.sync({
			outputStyle: 'expanded',
			precision: 10,
			includePaths: ['.']
		}).on('error', $.sass.logError))
		.pipe($.postcss([
			tailwindcss(),
			autoprefixer()
		]))
		.pipe($.if(isProd, $.purgecss({
			content: ["app/**/*.pug"],
			extractors: [
				{
					extractor: TailwindExtractor,
					extensions: ['pug']
				}
			],
			whitelist: [
				'mode-dark'
			],
		})))
		.pipe(dest('.tmp/styles', {
			sourcemaps: !isProd,
		}))
		.pipe(server.reload({ stream: true }));
};

function scripts() {
	return src('app/scripts/main.js')
		.pipe($.plumber())
		.pipe(webpackStream(webpackConfiguration), webpack)
		.pipe(dest('.tmp/scripts'))
		.pipe(server.reload({ stream: true }));
};

const lintBase = (files, options) => {
	return src(files)
		.pipe($.eslint(options))
		.pipe(server.reload({ stream: true, once: true }))
		.pipe($.eslint.format())
		.pipe($.if(!server.active, $.eslint.failAfterError()));
}
function lint() {
	return lintBase('app/scripts/**/*.js', { fix: true })
		.pipe(dest('app/scripts'));
};

function views() {
	return src('app/*.pug')
		.pipe($.plumber())
		.pipe($.pug({ pretty: true }))
		.pipe(dest('.tmp'))
		.pipe(server.reload({ stream: true }));
}

function html() {
	return src(['app/*.html', '.tmp/*.html'])
		.pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
		.pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
		.pipe($.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })])))
		.pipe($.if(/\.html$/, $.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: { compress: { drop_console: true } },
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		})))
		.pipe(dest('dist'));
}

function images() {
	return src('app/images/**/*', { since: lastRun(images) })
		.pipe($.imagemin())
		.pipe($.responsive(
			{
				'*': [
					{
						rename: { suffix: '-full' }
					},
					{
						width: 100,
						rename: { suffix: '-placeholder' }
					}
				]
			}
		))
		.pipe($.if(!isProd, dest('.tmp/images'), dest('dist/images')));
};

function fonts() {
	return src('app/fonts/**/*.{eot,svg,ttf,woff,woff2}')
		.pipe($.if(!isProd, dest('.tmp/fonts'), dest('dist/fonts')));
};

function extras() {
	return src([
		'app/*',
		'!app/*.html',
		'!app/*.pug',
	], {
		dot: true
	}).pipe(dest('dist'));
};

function clean() {
	return del(['.tmp', 'dist'])
}

function measureSize() {
	return src('dist/**/*')
		.pipe($.size({ title: 'build', gzip: true }));
}

const build = series(
	clean,
	parallel(
		lint,
		series(parallel(views, styles, scripts), html),
		images,
		fonts,
		extras
	),
	measureSize
);

function startAppServer() {
	server.init({
		notify: false,
		port,
		server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/node_modules': 'node_modules'
			}
		}
	});

	watch([
		'app/*.html',
		'app/images/**/*',
		'.tmp/fonts/**/*'
	]).on('change', server.reload);

	watch('app/**/*.pug', views);
	watch('app/styles/**/*.scss', styles);
	watch('app/scripts/**/*.js', scripts);
	watch('app/fonts/**/*', fonts);
}

function startDistServer() {
	server.init({
		notify: false,
		port,
		server: {
			baseDir: 'dist',
			routes: {
				'/node_modules': 'node_modules'
			}
		}
	});
}

let serve;
if (isDev) {
	serve = series(clean, parallel(views, styles, scripts, fonts, images), startAppServer);
} else if (isProd) {
	serve = series(build, startDistServer);
}

exports.serve = serve;
exports.build = build;
exports.default = build;
