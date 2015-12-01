Template.addPlayerForm.onCreated(function(){
  Session.set('addPlayer', false);
});

Template.addPlayerForm.onRendered(function(){
  var self = this,
      componentHandler = window.componentHandler,
      cc = this.find('.add-wrapper');
  if (cc) {
    cc._uihooks = {
      insertElement: function(node, next) {
        $(node).insertBefore(next).velocity({ translateX: [0, '-100%'] }, {
          easing: [ 200, 20 ],
          duration: 1400,
          queue: false,
        });
      },
      removeElement: function(node) {
        $(node).velocity({ translateX: '-100%' }, {
          duration: 300,
          queue: false,
          complete: function() {
            $(node).remove();
          }
        });
      }
    };
  }
});

Template.addPlayerForm.helpers({
  showAddPlayer: function(){
    return Session.equals('addPlayer', true);
  }
});

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
  },
  'click .add-toggle': function(e, t) {
    Session.set('addPlayer', !Session.get('addPlayer'));
  }
});
