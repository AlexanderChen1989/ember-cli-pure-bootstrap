/*jshint node:true*/
module.exports = {
  description: 'ember-cli-pure-bootstrap',

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function(options) {
    return this.addBowerPackageToProject('bootstrap');
  }
};
