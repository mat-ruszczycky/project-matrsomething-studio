// Plugins
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const htmlbeautify = require('gulp-html-beautify');

// Register handlebar-layouts with handlebars
const layouts = require('handlebars-layouts');
layouts.register(plugins.hb.handlebars);

// ES6 Transpiler
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// GulpConfig
const GulpConfig = {
	task: {
		buildContent: 'html',
		buildPresenation: 'css',
		buildBehaviors: 'js',
		buildAssets: 'assets'
	},
	basePath: {
		source: {
			assets: 'assets/',
			data: 'data/',
			hbs: 'src/hbs/',
			styles: 'src/styles/',
			scripts: 'src/scripts/'
		},
		destination: {
			assets: 'dist/',
			hbs: 'dist/',
			styles: 'dist/assets/built/styles/',
			scripts: 'dist/assets/built/scripts/'
		}
	}
};

// Paths
const paths = {
	assets: {
		source: [
			GulpConfig.basePath.source.assets + '**/*',
		],
		destination: GulpConfig.basePath.destination.assets
	},
	data: GulpConfig.basePath.source.data + '**/*.{js,json}',
	content: {
		source: [
			GulpConfig.basePath.source.hbs + '**/index*.{html,hbs}',
			GulpConfig.basePath.source.hbs + '**/*.hbs',
			GulpConfig.basePath.source.hbs + 'shared/helpers/**/*.js'
		],
		destination: GulpConfig.basePath.destination.hbs
	},
	presentation: {
		source: [
			GulpConfig.basePath.source.styles + '*.{css,scss}',
			GulpConfig.basePath.source.styles + '**/*.{css,scss}'
		],
		destination: GulpConfig.basePath.destination.styles
	},
	behavior: {
		source: [
			GulpConfig.basePath.source.scripts + 'main.js',
			GulpConfig.basePath.source.scripts + '**/*.js',
			GulpConfig.basePath.source.scripts + '**/**/*.js'
		],
		destination: GulpConfig.basePath.destination.scripts
	},
	modules: [
		'./node_modules/bootstrap/scss/'
	]
};

// Task: Generate HTML markup from HBS with hbs-layouts available
gulp.task(GulpConfig.task.buildContent, function() {
	gulp.src(paths.content.source[0])
		.pipe(plugins.hb({
			data: paths.data,
			partials: paths.content.source[1],
			helpers: [
				'./node_modules/handlebars-layouts/index.js',
				paths.content.source[2]
			],
			templateOptions: {
				preventIndent: true
			}
		}))
		.pipe(plugins.rename({
			extname: '.html',
			suffix: ''
		}))
		.pipe(htmlbeautify({
			"indent_size": 4,
			"indent_char": " ",
			"eol": "\n",
			"indent_level": 0,
			"indent_with_tabs": false,
			"preserve_newlines": true,
			"max_preserve_newlines": 10,
			"jslint_happy": false,
			"space_after_anon_function": false,
			"brace_style": "collapse",
			"keep_array_indentation": false,
			"keep_function_indentation": false,
			"space_before_conditional": true,
			"break_chained_methods": false,
			"eval_code": false,
			"unescape_strings": false,
			"wrap_line_length": 0,
			"wrap_attributes": "auto",
			"wrap_attributes_indent_size": 4,
			"end_with_newline": false
		}))
		.pipe(gulp.dest(paths.content.destination));
});

// Task: Generate SCSS styles
gulp.task(GulpConfig.task.buildPresenation, function() {
	gulp.src(paths.presentation.source)
		.pipe(plugins.plumber())
		.pipe(plugins.sass({
			outputStyle: 'compressed',
			includePaths: paths.modules
		}))
		.on('error', plugins.sass.logError)
		.pipe(plugins.rename({
			suffix: '.built'
		}))
		.pipe(gulp.dest(paths.presentation.destination));
});

// Task: Generate JS allowing for modules & ES6 transpiling
gulp.task(GulpConfig.task.buildBehaviors, function() {
	browserify({
			entries: paths.behavior.source[0],
			debug: true
		})
		.transform("babelify", {
			presets: ["es2015"]
		})
		.bundle()
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(plugins.uglify())
		.pipe(plugins.rename({
			suffix: '.built'
		}))
		.pipe(gulp.dest(paths.behavior.destination))
});

// Task: Move assets into `dist`
gulp.task(GulpConfig.task.buildAssets, function() {
	gulp.src(paths.assets.source[0], {
			dot: true
		})
		.pipe(gulp.dest(paths.assets.destination));
});

// Task: Standard build
gulp.task('default', [
	GulpConfig.task.buildAssets,
	GulpConfig.task.buildContent,
	GulpConfig.task.buildPresenation,
	GulpConfig.task.buildBehaviors
]);

// Task: Standard watch
gulp.task('watch', function() {
	gulp.watch([paths.content.source, paths.data], [GulpConfig.task.buildContent]);
	gulp.watch(paths.presentation.source, [GulpConfig.task.buildPresenation]);
	gulp.watch(paths.behavior.source, [GulpConfig.task.buildBehaviors]);
});
