Template.actionPicker.onCreated(function(){
  Session.setDefault('actionPicker', false);
});

Template.actionPicker.onRendered(function(){
  // var self = this,
  //     cc = this.find('.morph-button-wrapper');
  // if (cc) {
  //   cc._uihooks = {
  //     insertElement: function(node) {
  //       $(node).velocity({ translateY: [0, '-100%'] }, {
  //         opacity: 1, top: "50%"
  //       });
  //     },
  //     removeElement: function(node) {
  //       $(node).velocity({ translateY: '100%' }, {
  //         duration: 300,
  //         queue: false,
  //         complete: function() {
  //           $(node).remove();
  //         }
  //       });
  //     }
  //   };
  // }
});

Template.actionPicker.events({
  'click .action-picker': function(e, tpl){
     var ap = tpl.find('.action-picker'),
         state = Session.get('actionPicker'),
         subs = $('.action-picker-sub'),
         count = '-125%',
         dec = 125;


    if (! state) {
     $(ap).velocity({
       rotateZ: "360"
     }, {
       duration: 400
     });
     _.each(subs, function(sub) {
       var subAction = tpl.find(sub);
       $(subAction).velocity({
         translateY: count
       }, {
         duration: 400
       });
       count = (parseInt(count) - dec).toString() + '%';
     });
   } else {
     $(ap).velocity({
       rotateZ: "0"
     }, {
       duration: 400
     });
     _.each(subs, function(sub) {
       var subAction = tpl.find(sub);
       $(subAction).velocity({
         translateY: '0'
       }, {
         duration: 400
       });
     });
   }
   count = '-125%';
   Session.set('actionPicker', !Session.get('actionPicker'));
  }
});
