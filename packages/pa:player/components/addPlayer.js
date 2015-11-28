Template.addPlayerForm.events({
  'submit form': function(e) {
    e.preventDefault();
    var playerName = event.target.playerName.value;
    Meteor.call('insertPlayerData', playerName);
    event.target.playerName.value = '';
  }
});
