var storedValue = 0;

Template.scoreButtons.events({
  'click button.increment': function(e) {
    var selectedPlayer = Session.get('selectedPlayer'),
        session = Sessions.findOne({ended: {$exists: false}});
        value = parseInt(e.currentTarget.value.substring(2));
        storedValue = storedValue + value;
    $('[name=valueField]').val(storedValue);
    // Meteor.call('modifyPlayerScore', selectedPlayer, session, value);
  },
  'click .decrement': function(e) {
    var selectedPlayer = Session.get('selectedPlayer'),
        session = Sessions.findOne({ended: {$exists: false}}),
        value = parseInt(e.currentTarget.value.substring(2));
        storedValue = storedValue - value;
    $('[name=valueField]').val(storedValue);
    // Meteor.call('modifyPlayerScore', selectedPlayer, session, -value);
  },
  'keyup [name=valueField]': function(e) {
    var selectedPlayer = Session.get('selectedPlayer'),
        session = Sessions.findOne({ended: {$exists: false}}),
        value = parseInt($('[name=valueField]').val());
    if (!! value && e.which === 13) {
      Meteor.call('modifyPlayerScore', selectedPlayer, session, -value);
      Meteor.call('addGameToSession', selectedPlayer, session, value);
      $('[name=valueField]').val('');
      storedValue = 0;
      Session.set('selectedPlayer', '');
    }
  },
  'click .add': function(e) {
    var selectedPlayer = Session.get('selectedPlayer'),
        sessionPlayers = Sessions.findOne({ended: {$exists: false}}).players
        player = _.find(sessionPlayers, function(player) {
          return player._id === selectedPlayer;
        }),
        playerNumber = player.number,
        value = parseInt($('[name=valueField]').val());
    $('[name=Score' + playerNumber + ']').val(value);
    $('[name=valueField]').val('');
    storedValue = 0;
    Session.set('selectedPlayer', '');
    // Meteor.call('addGameToSession', selectedPlayer, session, value);

  },
  'click .cancel': function(e) {
    storedValue = 0;
    Session.set('selectedPlayer', '');
  }
});
