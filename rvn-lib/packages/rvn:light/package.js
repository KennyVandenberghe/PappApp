Package.describe({
  summary: "Rvn package Light. ",
  version: "1.0.0",
  name: "rvn:light"
});

Package.onUse(function(api) {
  var c = 'client',
      s = 'server',
      cs = [c, s];

  api.add_files([
    'namespace.js'
  ], c);

  api.export('Rvn', c);
});
