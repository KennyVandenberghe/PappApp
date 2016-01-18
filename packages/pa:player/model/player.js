Users = Meteor.users;

Players = new Mongo.Collection('players', {

});

Players.timestampable();

Players.allow(PA.Model.defaultAllow);

PA.registerNamespace('player', Players);

CollectionBehaviours.extendCollectionInstance(Players);

PA.Model.Player = {
  gamesWon: function() {
    var playerId = this._id,
        count = 0;
    _.each(PA.Games.find({}).fetch(), function(game) {
      if (game.getWinner().playerId === playerId) {
        count++;
      }
    });
    return count;
  },
  sessionsWon: function() {
    var playerId = this._id,
        count = 0;
    _.each(PA.Sessions.find({}).fetch(), function(session) {
      if (session.getWinner()._id === playerId) {
        count++;
      }
    });
    return count;
  },
  totalGames: function() {
    return PA.Games.find({'players.playerId': this._id}).count();
  },
  totalSessions: function() {
    return PA.Sessions.find({'players._id': this._id}).count();
  }
};

Players.helpers(PA.Model.Player);

_.extend(Players, {
  findById: function(playerId) {
    return Players.find({ _id: playerId });
  },
  findOneById: function(playerId) {
    return Players.findOne({ _id: playerId });
  }
});

PA.Players = Players;

if(Meteor.isServer) {
  Meteor.publish('sessionPlayers', function() {
    var currentUserId = this.userId;
    return Players.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    insertPlayerData: function(name) {
      var currentUserId = Meteor.userId();
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
      var currentUserId = Meteor.userId(),
          sessionId = session._id;
      Sessions.update({ _id: sessionId, 'players._id': selectedPlayer }, { $inc: { 'players.$.score': scoreValue } });
      Players.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: { score: scoreValue } });
    }
  });
}
