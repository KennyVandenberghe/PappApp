Meteor.subscribe('sessionPlayers');
Meteor.subscribe('runningSession');
Template.home.helpers({
  selectedClass: function() {
    var playerId = this._id,
    selectedPlayer = Session.get('selectedPlayer');
    if (playerId === selectedPlayer) {
      return 'selected';
    }
  },
  showSelectedPlayer: function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return Players.findOne(selectedPlayer);
  },
  runningSession: function() {
    return Sessions.findOne({ended: {$exists: false}});
  }
});

Template.home.events({
  'click .player': function() {
    var playerId = this._id,
    currentSelectedPlayer = Session.get('selectedPlayer');
    if (currentSelectedPlayer === playerId) {
      Session.set('selectedPlayer', '');
    } else {
      Session.set('selectedPlayer', playerId);
    }
  },
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
  }
});
