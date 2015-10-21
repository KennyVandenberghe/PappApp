var count = 1;
Meteor.publish('sessionPlayers', function() {
  var currentUserId = this.userId;
  return Players.find({ createdBy: currentUserId });
});
Meteor.publish('runningSession', function() {
  return Sessions.find({ ended: { $exists: false } });
});
Meteor.publish('endedSessions', function() {
  return Sessions.find({ ended: true });
});
Meteor.publish('allSessions', function() {
  return Sessions.find({});
});
Meteor.publish('sessionGames', function() {
  var session = Sessions.findOne({ ended: { $exists: false } });
  return Games.find({sessionId: session._id});
});
Meteor.methods({
  insertPlayerData: function(name) {
    var currentUserId = Meteor.userId();
    count++;
    if (name) {
      Players.insert({
        name: name,
        score: 0,
        createdBy: currentUserId
      });
    } else {
      throw new Meteor.Error(500, 'Fill in a username');
    }
  },
  removePlayerData: function(selectedPlayer) {
    var currentUserId = Meteor.userId();
    Players.remove({ _id: selectedPlayer, createdBy: currentUserId });
  },
  removeAllPlayerData: function() {
    var currentUserId = Meteor.userId();
    Players.remove({ createdBy: currentUserId });
  },
  modifyPlayerScore: function(selectedPlayer, session, scoreValue) {
    console.log(selectedPlayer, session, scoreValue);
    var currentUserId = Meteor.userId(),
        sessionId = session._id;
    Sessions.update({ _id: sessionId, 'players._id': selectedPlayer }, { $inc: { 'players.$.score': scoreValue } });
    Players.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: { score: scoreValue } });
  },
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
  },
  // addGameToSession: function(playerId, session, value) {
  //   var games = {};
  //   _.extend(games, { score: value })
  //   Sessions.update({
  //     _id: session._id,
  //     'players._id': playerId
  //   }, {
  //     $addToSet: {
  //       'players.$.games': games
  //     }
  //   });
  // },
  insertGame: function(sessionId, players) {
    _.each(players, function(player) {
      if(player.score === 0) {
        throw new Meteor.Error(500, 'player score cannot be 0');
      }
    });
    Games.insert({
      sessionId: sessionId,
      players: players,
      createdAt: new Date()
    });
  }
});
