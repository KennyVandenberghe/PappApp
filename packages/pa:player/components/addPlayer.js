Template.addPlayerForm.events({
  'submit form': function(e) {
    e.preventDefault();
    if (!! event.target.playerName) {
      var playerName = event.target.playerName.value;
    }
    if (!! playerName) {
      Meteor.call('insertPlayerData', playerName);
      event.target.playerName.value = '';
    }
    Overlay.close();
  }
});
