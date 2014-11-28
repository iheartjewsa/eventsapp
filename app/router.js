import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome');
  this.route('signup');
  this.route('login');
  this.resource('events');
  this.resource('event',  {path: '/events/:event_id' });
});

export default Router;
