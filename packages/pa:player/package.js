Package.describe({
  name: 'pa:player',
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
    'ui',
    'templating',
    'iron:router',
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
    'momentjs:moment',
    'dburles:collection-helpers@1.0.2',
    'sewdn:collection-behaviours@0.2.0'
  ], cs);


  api.addFiles([
    'model/player.js'
  ], cs);

  api.addFiles([
    'components/addPlayer.html',
    'components/addPlayer.js',
    'components/overlay.html',
    'components/overlay.js',
    'router.js'
  ], c);

  api.export('Players');
  api.export('Overlay');
});
