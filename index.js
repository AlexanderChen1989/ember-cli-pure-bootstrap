/* jshint node: true */
'use strict';

var fs = require('fs'),
  path = require('path'),
  extend = require('util')._extend;

var defaultOptions = {
    importBootstrapTheme: false,
    importBootstrapJS: true,
    importBootstrapCSS: true,
    importBootstrapFont: true
};

module.exports = {
  name: 'ember-cli-pure-bootstrap',
  included: function(app) {
    this._super.included(app);

    var emberCLIVersion = app.project.emberCLIVersion();
    if (emberCLIVersion < '0.0.41') {
        throw new Error('ember-cli-bootstrap requires ember-cli version 0.0.41 or greater.\n');
    }

    var base = path.join(app.bowerDirectory, '/bootstrap'),
      dirs = fs.readdirSync(base),
      dist = '/dist';

    if (dirs.indexOf('dist') < 0) {
      dist = path.join(
        dirs.filter(function(dir) { return dir.startsWith('bootstrap-'); }).pop(),
        dist
      );
    }

    var options         = extend(defaultOptions, app.options['ember-cli-pure-bootstrap']);
    var bootstrapPath   = path.join(base, dist);

    // Import js from bootstrap
    if (options.importBootstrapJS) {
      app.import(path.join(bootstrapPath, 'js/bootstrap.js'));
    }

    // Import css from bootstrap
    if (options.importBootstrapCSS) {
        app.import(path.join(bootstrapPath, 'css/bootstrap.css'));
        app.import(path.join(bootstrapPath, 'css/bootstrap.css.map'), {destDir: 'assets'});
    }

    if (options.importBootstrapTheme) {
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css'));
      app.import(path.join(bootstrapPath, 'css/bootstrap-theme.css.map', {destDir: 'assets'}));
    }

    // Import glyphicons
    if (options.importBootstrapFont) {
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.eot'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.svg'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.ttf'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff'), { destDir: '/fonts' });
      app.import(path.join(bootstrapPath, 'fonts/glyphicons-halflings-regular.woff2'), { destDir: '/fonts' });
    }
  }
};
