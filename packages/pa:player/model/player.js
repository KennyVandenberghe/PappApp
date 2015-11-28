Users = Meteor.users;

Players = new Mongo.Collection('players', {

});

Players.timestampable();

Players.allow(PA.Model.defaultAllow);

PA.registerNamespace('player', Players);

CollectionBehaviours.extendCollectionInstance(Players);

PA.Model.Player = {

};

Players.helpers(PA.Model.Player);

_.extend(Players, {
  findById: function(playerId) {
    return Players.find({ _id: playerId });
  },
  findOneById: function(playerId) {
    return Players.findOne({ _id: playerId });
  }
});

PA.Players = Players;

if(Meteor.isServer) {
  Meteor.publish('sessionPlayers', function() {
    var currentUserId = this.userId;
    return Players.find({ createdBy: currentUserId });
  });

  Meteor.methods({
    insertPlayerData: function(name) {
      var currentUserId = Meteor.userId();
      count++;
      if (name) {
        Players.insert({
          name: name,
          score: 0,
          createdBy: currentUserId
        });
      } else {
        throw new Meteor.Error(500, 'Fill in a username');
      }
    },
    removePlayerData: function(selectedPlayer) {
      var currentUserId = Meteor.userId();
      Players.remove({ _id: selectedPlayer, createdBy: currentUserId });
    },
    removeAllPlayerData: function() {
      var currentUserId = Meteor.userId();
      Players.remove({ createdBy: currentUserId });
    },
    modifyPlayerScore: function(selectedPlayer, session, scoreValue) {
      console.log(selectedPlayer, session, scoreValue);
      var currentUserId = Meteor.userId(),
          sessionId = session._id;
      Sessions.update({ _id: sessionId, 'players._id': selectedPlayer }, { $inc: { 'players.$.score': scoreValue } });
      Players.update({ _id: selectedPlayer, createdBy: currentUserId }, { $inc: { score: scoreValue } });
    }
  });  
}
