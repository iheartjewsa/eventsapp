import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params){
    var model = this.get('store').find('event', params.event_id);
    return model;
  },
  afterModel: function(model){
    var currentUserEvent = this.get('store').find('userEvent', {
      where: {
        parseUser: {
          "__type":  "Pointer",
          "className": "_User",
          "objectId": this.get('session.user.id')
        },
        event: {
          "__type":  "Pointer",
          "className": "Event",
          "objectId": model.get('id')
        }
      }
    });
    var eventComments = this.get('store').find('comment', {
      where: {
        event: {
          "__type":  "Pointer",
          "className": "Event",
          "objectId": model.get('id')
        }
      },
      include: 'parseUser'
    });
    return Ember.RSVP.all([currentUserEvent, eventComments]).then(function(results){
      return results[1].store.find('parseUser', {
        where: {
          objectId: {
            '$in': results[1].mapBy('data.parseUser.id').uniq()
          }
        }
      });
    });
  },
  actions: {
    saveUserEvent: function(userEvent){
      userEvent.save();
    },
    saveComment: function(comment){
      comment.save();
    }
  }
});
