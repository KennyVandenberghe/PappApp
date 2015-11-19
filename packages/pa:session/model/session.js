Sessions = new Mongo.Collection('sessions', {

});

Sessions.timestampable();

Sessions.allow(PA.Model.defaultAllow);

PA.registerNamespace('session', Sessions);

CollectionBehaviours.extendCollectionInstance(Sessions);

PA.Model.Session = {

};

Sessions.helpers(PA.Model.Session);

_.extend(Sessions, {
  findById: function(sessionId) {
    return Sessions.find({ _id: sessionId });
  },
  findOneById: function(sessionId) {
    return Sessions.findOne({ _id: sessionId });
  }
});

PA.Sessions = Sessions;

if (Meteor.isServer) {
  var count = 1;
  Meteor.publish('runningSession', function() {
    return Sessions.find({ ended: { $exists: false } });
  });
  Meteor.publish('endedSessions', function() {
    return Sessions.find({ ended: true });
  });
  Meteor.publish('allSessions', function() {
    return Sessions.find({});
  });
  Meteor.methods({
    createNewSession: function(sessionTitle, players, currentUser) {
      if (sessionTitle === '') {
        throw new Meteor.Error(500, 'Fill in a session title');
      }
      if (_.keys(players).length > 1) {
        var players = _.map(players, function(player) {
          player.score = 0;
          player.number = count++;
          return player;
        })
        Sessions.insert({
          title: sessionTitle,
          createdAt: new Date(),
          players: players,
          createdBy: currentUser
        });
      } else {
        throw new Meteor.Error(500, 'You need at least 2 players');
      }
    },
    selectedSession: function(sessionId) {
      return Sessions.findOne({ _id: sessionId });
    },
    finishSession: function(sessionId) {
      Sessions.update({ _id: sessionId }, { $set: { ended: true } });
    }
  });
}
