Template.home.onCreated(function(){
  Meteor.subscribe('sessionPlayers');
  Meteor.subscribe('runningSession');
  Meteor.subscribe('sessionGames');
});
Template.home.helpers({
  runningSession: function() {
    return PA.Sessions.findOne({ended: {$exists: false}});
  },
  sessionGames: function() {
    var session = Sessions.findOne({ended: {$exists: false}}),
        games = PA.Games.find({sessionId: session._id, 'players.playerId': this._id}).fetch(),
        playerScores = [],
        self = this;
    _.map(games, function(game) {
      _.each(game.players, function(player) {
        if (player.playerId === self._id) {
          var playerScore = player.score;
          playerScores.push(_.extend({}, {
            playerId: player.playerId,
            score: player.score
          }));
        }
      });
    });
    return playerScores;
  }
});

Template.home.events({
  'click .remove-all': function() {
    var c = confirm ('Are you sure to remove all players?');
    if (c === true) {
      Meteor.call('removeAllPlayerData');
    } else {
      return;
    }
  },
  'click .finish': function() {
    var currentSession = this._id;
    Meteor.call('finishSession', currentSession);
  },
  'click .new': function() {
    Router.go('/createSession');
  },
  'click .add-game': function() {
    Router.go('/addGame');
  }
});
