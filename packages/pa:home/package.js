Package.describe({
  name: 'pa:home',
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
  api.versionsFrom('1.1.0.2');
  var c = 'client',
      s = 'server',
      cs = [c, s];

  api.use([
    'pa:core',
    'pa:session',
    'underscore',
    'momentjs:moment',
    'dburles:collection-helpers@1.0.2',
    'sewdn:collection-behaviours@0.2.0'
  ], cs);

  api.use([
    'ui',
    'templating',
    'iron:router'
  ], c);

  api.addFiles([
    'components/home.html',
    'components/home.js',
    'router.js'
  ], c);
});
