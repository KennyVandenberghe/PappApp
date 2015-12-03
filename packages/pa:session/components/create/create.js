var playerIds = [],
    players = [],
    playersDep = new Tracker.Dependency();

Template.createSession.onCreated(function(){
   Meteor.subscribe('allSessions');
   Meteor.subscribe('sessionPlayers');
});

Template.createSession.onRendered(function(){
  
});
Template.createSession.helpers({
  players: function(){
    return Players.find({});
  },
  selected: function() {
    playersDep.depend();
    var playerId = this._id;
    if (playerIds.indexOf(playerId) !== -1) {
      return '-selected';
    }
  },
  enoughPlayers: function() {
    playersDep.depend();
    if (playerIds.length >= 2) {
      return true;
    }
  },
  sessionTitle: function() {
    return 'Session #' + (Sessions.find().count() + 1);
  }
});
Template.createSession.events({
  'click .create': function(){
    var sessionTitle = $('[name="sessionTitle"]').val(),
        currentUser = Meteor.userId();
    _.each(playerIds, function(playerId) {
      var player = Players.findOne({_id: playerId}, {fields: {_id: 1, name: 1, score: 1}});
      players.push(player);
    });
    Meteor.call('createNewSession', sessionTitle, players, currentUser, function(err, go) {
      if (! err) {
        Router.go('/');
      } else {
        console.log(err);
      }
    });
    players = [];
  },
  'click .player': function() {
    var playerId = this._id;
    if (playerIds.indexOf(playerId) !== -1) {
      var index = playerIds.indexOf(playerId);
      playerIds.splice(index, 1);
      playersDep.changed();
      return;
    }
    playerIds.push(playerId);
    playersDep.changed();
  },
  'click .remove': function() {
    var selectedPlayer = this._id,
        c = confirm('Are you sure to remove this player?');
    if (c === true) {
      Meteor.call('removePlayerData', selectedPlayer);
    } else {
      return;
    }
  },
  'click .add-toggle': function(e, t) {
    Overlay.open('addPlayerForm');
  }
});
