var OverlayClass = function() {
  var self = this;
	this.tpl = new ReactiveVar();
	this.tpl.set(false);
}

_.extend(OverlayClass.prototype, {
	isOpen: function() {
		return !this.tpl.get() === false;
	},
	renderTemplate: function() {
		return this.tpl.get();
	},
	open: function(tpl, options) {
    Session.set('showMask', true);
		this.tpl.set(tpl, options); //options were not included at first
	},
	close: function() {
    Session.set('showMask', false);
		this.tpl.set(false);
	}
});

Rvn.overlay = new OverlayClass();
Template.overlay.onCreated(function() {

});

Template.overlay.onRendered(function(){
  var self = this,
      componentHandler = window.componentHandler,
      cc = this.find('.overlay-wrapper');
  if (cc) {
    cc._uihooks = {
      insertElement: function(node, next) {
        $(node).insertBefore(next).velocity({ translateY: [0, '100%'] }, {
          easing: [ 200, 20 ],
          duration: 1400,
          queue: false,
        });
      },
      removeElement: function(node) {
        $(node).velocity({ translateY: '100%' }, {
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

Template.overlay.helpers({
	isOpen: function() {
		return Rvn.overlay.isOpen();
	},
	renderTemplate: function() {
		return Rvn.overlay.renderTemplate();
	}
});

Template.overlay.events({
	'click .close': function(e, tpl){
		 Rvn.overlay.close();
	}
});
