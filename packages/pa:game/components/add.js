Template.addGame.onCreated(function(){
   Meteor.subscribe('runningSession');
});

Template.addGame.helpers({
  showSelectedPlayer: function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return Players.findOne(selectedPlayer);
  },
  selectedClass: function() {
    var playerId = this._id,
    selectedPlayer = Session.get('selectedPlayer');
    if (playerId === selectedPlayer) {
      return 'selected';
    }
  },
  session: function() {
    return Sessions.findOne({ended: {$exists: false}});
  }
});

Template.addGame.events({
  'click .player': function() {
    var playerId = this._id,
    currentSelectedPlayer = Session.get('selectedPlayer');
    if (currentSelectedPlayer === playerId) {
      Session.set('selectedPlayer', '');
    } else {
      Session.set('selectedPlayer', playerId);
    }
  },
  'click .add-game': function() {
    var players = [],
        session = Sessions.findOne({ended: {$exists: false}}),
        sessionId = session._id;
    _.each(session.players, function(player) {
      var playerScore = parseInt($('[name=Score' + player.number + ']').val()),
          p = _.extend({}, {
            playerId: player._id,
            name: player.name,
            score: playerScore
          });
      players.push(p);
      Meteor.call('modifyPlayerScore', player._id, session, playerScore);
      $('[name=Score' + player.number + ']').val(0);
    });
    Meteor.call('insertGame', sessionId, players);
    Router.go('/');
  }
});
