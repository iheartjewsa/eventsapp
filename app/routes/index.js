import Ember from 'ember';
import ResetScrollMixin from 'eventsapp/mixins/reset_scroll';

export default Ember.Route.extend(ResetScrollMixin, {
  beforeModel: function() {
   this.transitionTo('welcome');
  }
});
