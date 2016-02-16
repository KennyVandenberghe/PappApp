Package.describe({
  name: 'rvn:mdl',
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
    'ui',
    'templating',
    'zodiase:mdl',
    'percolate:velocityjs',
    'reactive-var',
    'rvn:light'
  ], c);

  api.use([
    'underscore'
  ], c);

  api.addFiles([
    'mdl/card.html',
    'components/player-card.html',
    'components/actionPicker/actionPicker.html',
    'components/actionPicker/actionPicker.js'
  ], c);
});
