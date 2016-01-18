Package.describe({
  name: 'rvn:overlay',
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
    'templating',
    'percolate:velocityjs',
    'underscore',
    'reactive-dict',
    'reactive-var',
    'session'
  ], c);

  api.use([
    'mongo'
  ], cs);

  api.use([
    'pa:core',
    'underscore',
    'momentjs:moment'
  ], cs);

  api.addFiles([
    'components/overlay.html',
    'components/overlay.js'
  ], c);

  api.export('Overlay');
});
