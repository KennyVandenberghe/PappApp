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
