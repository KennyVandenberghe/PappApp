Template.layout.helpers({
  showMask: function(){
    return Session.get('showMask');
  }
});

Template.layout.events({
  'click .logout': function(e, tpl){
    e.preventDefault();
    Meteor.logout();
  }
});
