App.Router = Ember.Router.extend({
  location: 'hash'
});

App.Router.map(function(){
  this.route('index', {path: '/'});
  this.route('blog', {path: '/blog'});
});

App.IndexRoute = Ember.Route.extend({
  redirect: function(){
    this.transitionTo('blog');
  }
});

App.BlogRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('blogPost');
  }
});
