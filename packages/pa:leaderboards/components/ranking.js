Template.ranking.onCreated(function(){
   Meteor.subscribe('sessionPlayers');
   Meteor.subscribe('allSessions');
   Meteor.subscribe('allGames');
});

Template.ranking.helpers({
  players: function() {
    return Players.find({}, { sort: { score: 1, name: 1 } });
  }
});
