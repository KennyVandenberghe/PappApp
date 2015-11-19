Template.sessions.onCreated(function(){
  Meteor.subscribe('endedSessions');
});
Template.sessions.helpers({
  sessions: function() {
    return Sessions.find({ended: true});
  }
});
