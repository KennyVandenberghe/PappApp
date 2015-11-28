PA = {
  Validators: {},
  Schemas: {},
  Namespaces: {},
  Model: {
    defaultAllow: {
      'insert': function(id, doc) {
        // only allow insert from methods
        return false;
      },
      'update': function(id, doc) {
        // only allow updates if you are owner
        return !! this.userId && doc.userId === this.userId;
      },
      'remove': function(id, doc) {
        // only allow removals from methods
        return false;
      }
    }
  }
};
