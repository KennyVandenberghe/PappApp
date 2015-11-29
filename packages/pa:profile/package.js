Package.describe({
  name: 'pa:profile',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  var c = 'client',
      s = 'server',
      cs = [c, s];

      api.use([
        'mongo'
      ], cs);

      api.use([
        'pa:core',
        'underscore',
        'momentjs:moment',
        'dburles:collection-helpers@1.0.2',
        'sewdn:collection-behaviours@0.2.0'
      ], cs);

      api.use([
        'ui',
        'templating',
        'iron:router',
        'deps'
      ], c);

  api.addFiles([
    'model/profile.js'
  ], s);
});
