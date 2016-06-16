Games = new Mongo.Collection('games', {

});

Games.timestampable();

Games.allow(PA.Model.defaultAllow);

PA.registerNamespace('game', Games);

CollectionBehaviours.extendCollectionInstance(Games);

PA.Model.Game = {
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
      if ((!! playerScore || playerScore === 0) && player.score === playerScore) {
        winner = player;
      }
    });
    return winner;
  }
};

Games.helpers(PA.Model.Game);

_.extend(Games, {
  findById: function(gameId) {
    return Games.find({ _id: gameId });
  },
  findOneById: function(gameId) {
    return Games.findOne({ _id: gameId });
  }
});

PA.Games = Games;
if(Meteor.isServer) {
  Meteor.publish('sessionGames', function() {
    var session = Sessions.findOne({ ended: { $exists: false } });
    if (!! session && !! session._id) {
      return Games.find({sessionId: session._id});
    }
  });
  Meteor.publish('allGames', function() {
    return Games.find({});
  });

  Meteor.methods({
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
      // _.each(players, function(player) {
      //   if(player.score === 0) {
      //     throw new Meteor.Error(500, 'player score cannot be 0');
      //   }
      // });
      Games.insert({
        sessionId: sessionId,
        players: players,
        createdAt: new Date()
      });
    }
  });
}
