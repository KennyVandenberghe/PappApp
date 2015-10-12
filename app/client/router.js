Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function() {
  this.render('home');
});
Router.route('/createSession', function() {
  this.render('createSession');
});
Router.route('/ranking', function() {
  this.render('ranking');
});
Router.route('/sessions', function() {
  this.render('sessions');
});
Router.route('/sessions/:_id', function() {
  this.render('sessionDetail', {
    data: function() {
      Session.set('selectedSession', this.params._id);
      return Sessions.findOne(this.params._id);
    }
  });
});
