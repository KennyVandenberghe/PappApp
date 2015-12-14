Sessions = new Mongo.Collection('sessions', {

});

Sessions.timestampable();

Sessions.allow(PA.Model.defaultAllow);

PA.registerNamespace('session', Sessions);

CollectionBehaviours.extendCollectionInstance(Sessions);

PA.Model.Session = {
  getWinner: function() {
    var playerScore;
        winner;
    _.each(this.players, function(player) {
      if (!! playerScore && playerScore < player.score) {
        playerScore = playerScore;
      } else {
        playerScore = player.score;
      }
    });
    _.find(this.players, function(player) {
      if (!! playerScore && player.score === playerScore) {
        winner = player;
      }
    });
    return winner;
  },
  getSessionPlayers: function() {
    return Sessions.findOne(this._id).players;
  }
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
    var currentUser = this.userId;
    return Sessions.find({
      createdBy: currentUser,
      ended: { $exists: false }
    });
  });
  Meteor.publish('endedSessions', function() {
    var currentUser = this.userId;
    return Sessions.find({
      createdBy: currentUser,
      ended: true
    });
  });
  Meteor.publish('allSessions', function() {
    var currentUser = this.userId;
    return Sessions.find({
      createdBy: currentUser
    });
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
        });
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
