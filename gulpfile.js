/** ============================================================================
    Project: Web Components
    ----------------------------------------------------------------------------
    @description: Projeto para estudos de Web Components
    @author: EdnilsonRobert <frontend@ednilsonrobert.dev>
============================================================================= */

/** VARIABLES =============================================================== */
/*global require exports __dirname*/
const path = require('path');
const browsersync = require('browser-sync');
const gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      notify = require('gulp-notify');

let insertIcon = (icon) => {
  return path.join(__dirname, `${paths.icons}/${icon}`);
};

let paths = {
  root: './',
  icons: './resources',
  src: './src',
  css: './src/css',
  components: './src/components'
};

let app = {
  name: 'Web Components',
  appID: 'Web Components'
};

let messages = {
  gulp: {
    isRunning: {
      title: app.name,
      message: 'GulpJS is running and works like a charm.',
      icon: insertIcon('icon-gulp.png'),
      appID: app.appID
    }
  },
  html: {
    update: {
      title: 'HTML',
      message: 'O arquivo HTML foi atualizado.',
      icon: insertIcon('icon-success.png'),
      appID: app.appID
    }
  },
  css: {
    update: {
      title: 'CSS',
      message: 'O arquivo CSS foi atualizado.',
      icon: insertIcon('icon-success.png'),
      appID: app.appID
    }
  },
  js: {
    update: {
      title: 'Javascript',
      message: 'Um arquivo JS foi atualizado.',
      icon: insertIcon('icon-success.png'),
      appID: app.appID
    },
    failure: {
      title: 'Javascript',
      message: 'Há um arquivo .js com erro. Verifique o terminal.',
      icon: insertIcon('icon-error.png'),
      appID: app.appID
    }
  }
};


/** NOTIFY ================================================================== */
let htmlUpdated = () => {
  return gulp.src('.').pipe(notify(messages.html.update));
};
let cssUpdated = () => {
  return gulp.src('.').pipe(notify(messages.css.update));
};
let jsUpdated = () => {
  return gulp.src('.').pipe(notify(messages.js.update));
};
let jsFailed = () => {
  return gulp.src('.').pipe(notify(messages.js.failure));
};


/** JAVASCRIPT ============================================================== */
let lintJS = () => {
  return gulp
    .src(['./gulpfile.js', `${paths.components}/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()
      .on('error', () => { jsFailed(); }))
    .pipe(jsUpdated())
    .pipe(browsersync.reload({ stream: true }));
};


/** BROWSER SYNC ============================================================ */
let pageReload = () => {
  return gulp
    .src(paths.root)
    .pipe(browsersync.reload({ stream: true }));
};
exports.pageReload = pageReload;

let dev = () => {
  browsersync.init({
    server: {
      baseDir: paths.src,
      index: 'index.html'
    },
    port: 3000
  });

  gulp.src(paths.root).pipe(notify(messages.gulp.isRunning));
  gulp.watch(`${paths.src}/**/*.html`, gulp.series(pageReload, htmlUpdated));
  gulp.watch(`${paths.css}/*.css`, gulp.series(pageReload, cssUpdated));
  gulp.watch(`${paths.components}/**/*.js`, gulp.series(lintJS));
};
exports.dev = dev;


/** TASK DEFAULT ============================================================ */
gulp.task('default', gulp.series(dev), () => {
  console.log('>>> GulpJS works like a charm.');
});
