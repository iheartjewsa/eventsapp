import Ember from 'ember';
import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import ResetScrollMixin from 'eventsapp/mixins/reset_scroll';

export default Ember.Route.extend(UnauthenticatedRouteMixin, ResetScrollMixin, {
});
