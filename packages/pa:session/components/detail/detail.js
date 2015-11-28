Template.sessionDetail.onCreated(function() {
  Tracker.autorun(function() {
    Meteor.subscribe('selectedSession', Session.get('selectedSession'));
  })
});

Template.sessionDetail.helpers({
  session: function() {
    return Sessions.findOne({ _id: Session.get('selectedSession') });
  }
});
