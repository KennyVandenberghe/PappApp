Template.ranking.onCreated(function(){
   Meteor.subscribe('sessionPlayers');
});

Template.ranking.helpers({
  players: function() {
    return Players.find({}, { sort: { score: 1, name: 1 } });
  }
});
