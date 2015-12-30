/* jshint node: true */
'use strict';

var fs = require('fs'),
  path = require('path');

module.exports = {
  name: 'ember-cli-pure-bootstrap',
  included: function(app) {
    this._super.included(app);

    var base = path.join(app.bowerDirectory, '/bootstrap'),
      dirs = fs.readdirSync(base),
      dist = '/dist';

    if (dirs.indexOf('dist') < 0) {
      dist = path.join(
        dirs.filter(function(dir) { return dir.startsWith('bootstrap-'); }).pop(),
        dist
      );
    }

    app.import(path.join(base, dist, '/css/bootstrap.min.css'));
    app.import(path.join(base, dist, '/js/bootstrap.min.js'));
  }
};
