import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    var model = this.get('store').find('event', params.event_id);
    return model;
  },
  afterModel: function(model){
    var currentUserEventPromise;
    if (this.get('session.content.user') !== undefined){
      currentUserEventPromise = this.get('store').find('userEvent', {
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
    }
    else{
      currentUserEventPromise = new Ember.RSVP.Promise(function(resolve, reject){
        resolve();
      });
    }
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
    return Ember.RSVP.all([currentUserEventPromise, eventComments]).then(function(results){
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
