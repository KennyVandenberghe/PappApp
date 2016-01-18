Template.addGame.onCreated(function(){
   Meteor.subscribe('runningSession');
   Meteor.subscribe('sessionPlayers');
   Session.setDefault('selectedPlayer', "");
});

Template.addGame.helpers({
  showSelectedPlayer: function() {
    var selectedPlayer = Session.get('selectedPlayer');
    if (!! selectedPlayer) {
      return true;
    }
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
    var playerId = this.data._id,
    currentSelectedPlayer = Session.get('selectedPlayer');
    if (currentSelectedPlayer === playerId) {
      Session.set('selectedPlayer', '');
    } else {
      Session.set('selectedPlayer', playerId);
    }
    Overlay.open('scoreField', this);
  },
  'click .add-game': function() {
    var players = [],
        session = Sessions.findOne({ended: {$exists: false}}),
        sessionId = session._id;
    _.each(session.players, function(player) {
      var playerScore = parseInt($('[name=Score' + player.number + ']').text()),
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

Template.scoreField.helpers({
  selectedPlayer: function() {
    var selectedPlayer = Session.get('selectedPlayer');
    if (!! selectedPlayer) {
      return Players.findOne({_id: selectedPlayer});
    }
  }
});

Template.scoreField.events({
  'click .add': function(e) {
    var selectedPlayer = Session.get('selectedPlayer'),
        sessionPlayers = Sessions.findOne({ended: {$exists: false}}).players
        player = _.find(sessionPlayers, function(player) {
          return player._id === selectedPlayer;
        }),
        playerNumber = player.number,
        value = parseInt($('[name=valueField]').val());
    $('[name=Score' + playerNumber + ']').text(value);
    $('[name=valueField]').val('');
    storedValue = 0;
    if ($('[name=Score' + playerNumber + ']').text().indexOf('-') != -1) {
      $('[name=Score' + playerNumber + ']').removeClass('negative');
      $('[name=Score' + playerNumber + ']').addClass('positive');
    } else {
      $('[name=Score' + playerNumber + ']').prepend('+');
      $('[name=Score' + playerNumber + ']').removeClass('positive');
      $('[name=Score' + playerNumber + ']').addClass('negative');
    }
    Session.set('selectedPlayer', '');
    // Meteor.call('addGameToSession', selectedPlayer, session, value);
    Overlay.close();
  }
});
