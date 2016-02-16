Rvn.mdlActionPicker = function(options) {
  this.options = _.extend({
    mainItem: {},
    subItems: []
  }, options);
  this.mainItem = new ReactiveVar(this.options.mainItem);
  this.subItems = new ReactiveVar(this.options.subItems);
  this.open = new ReactiveVar(false);
  this.activeItem = new ReactiveVar();
};

_.extend(Rvn.mdlActionPicker.prototype, {
  setMainItem: function(item) {
    this.mainItem.set(item);
  },
  getMainItem: function() {
    return this.mainItem.get();
  },
  setSubItems: function(items) {
    this.subItems.set(items);
  },
  getSubItems: function() {
    return this.subItems.get();
  },
  isOpen: function() {
    return !! this.open.get();
  },
  open: function() {
    this.open.set(true);
  },
  close: function() {
    this.open.set(false);
  },
  toggleActionPicker: function() {
    this.open.set(!this.open.get());
  },
  getActiveItem: function() {
    return this.activeItem.get();
  },
  setActiveItem: function(name) {
    this.activeItem.set(name);
  }
});

Template.mdlActionPicker.onCreated(function(){
  if (this.data && this.data.mdlActionPicker) {
    this.mdlActionPicker = this.data.mdlActionPicker;
  } else {
    this.mdlActionPicker = new Rvn.mdlActionPicker(this.data);
  }
});

Template.mdlActionPicker.helpers({
  isOpen: function() {
    var tpl = Template.instance();
    return tpl.mdlActionPicker.isOpen();
  },
  getMainItem: function() {
    return this.mdlActionPicker.getMainItem();
  },
  getSubItems: function() {
    return this.mdlActionPicker.getSubItems();
  },
  renderActive: function() {
    var tpl = Template.instance();
    return tpl.mdlActionPicker.getActiveItem() === this.title ? '-active' : '';
  },
  getActiveItem: function() {
    return this.mdlActionPicker.getActiveItem();
  },
  getUrl: function() {
    var tpl = Template.instance();
    if (tpl.mdlActionPicker.isOpen()) {
      return this.url;
    }
    return '';
  }
});

Template.mdlActionPicker.events({
  'click .main-action': function(e, tpl){
     var ap = tpl.find('.main-action'),
         state = tpl.mdlActionPicker.isOpen(),
         subs = $('.sub'),
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
     Meteor.setTimeout(function(){
       _.each($('.action-label'), function(al) {
         $(al).velocity('fadeIn', {
           duration: 400
         });
       });
     }, 100);
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
     _.each($('.action-label'), function(al) {
       $(al).velocity('fadeOut', {
         duration: 400
       });
     });
   }
   count = '-125%';
   tpl.mdlActionPicker.toggleActionPicker();
  }
});
