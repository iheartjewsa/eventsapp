import EventsRoute from 'eventsapp/routes/events';
import ResetScrollMixin from 'eventsapp/mixins/reset_scroll';

export default EventsRoute.extend(ResetScrollMixin, {
  controllerName: 'events',
});