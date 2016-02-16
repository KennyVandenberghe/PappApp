Template.home.onCreated(function(){
  Meteor.subscribe('sessionPlayers');
  Meteor.subscribe('runningSession');
  Meteor.subscribe('sessionGames');
  actionPicker = new Rvn.mdlActionPicker({
    mainItem:
      {
        title: 'Lege brief',
        url: '#',
        openIcon: 'description',
        closedIcon: 'add',
        color: '#64B242'
      },

    subItems: [
      {
        title: 'Antwoordstrookje',
        url: '#',
        icon: 'message',
        color: '#12AE9A'
      },
      {
        title: 'Fotoalbum',
        url: '#',
        icon: 'camera',
        color: '#5016B8'
      },
      {
        title: 'Bijlage',
        url: '#',
        icon: 'attachment',
        color: '#B216B8'
      },
      {
        title: 'Open',
        url: '#',
        icon: 'folder',
        color: '#000000'
      }
    ]
  });
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
  },
  actionPickerContext: function() {
    return {
      mdlActionPicker: actionPicker
    };
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
