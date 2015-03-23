import Ember from 'ember';

export default Ember.ObjectController.extend({
  uploadStatus: function(){
    if (this.get('photosBeingUploaded') === undefined){
      return null;
    }
    else if (this.get('photosBeingUploaded') === 0){
      return 'Uploads successful! Your photos have been added :)';
    }
    else {
      return this.get('photosBeingUploaded') + ' photos being uploaded, please wait...';
    }
  }.property('photosBeingUploaded'),
  currentUserEvents: function(){
    return this.get('userEvents').filterBy('parseUser.username', this.get('session.user.username'));
  }.property('userEvents.[]', 'userEvents.@each.parseUser.username'),
  firstCurrentUserEvent: function(){
    return this.get('currentUserEvents').toArray()[0];
  }.property('currentUserEvents.[]'),
  actions: {
    uploadFiles: function(evt){
      var files = $('#files')[0].files;
      if (files.length === 0){
        alert('You did not select any files');
        return false;
      }
      else {
        var userPhotoACL = {
            "*": {
              "read": true
            }
          };
        userPhotoACL[this.get('session.user.id')] = {
          write: true
        };
        var uploadPhotoAjax = function(eventController, file){
           var serverUrl = 'https://api.parse.com/1/files/' + file.name;
           $.ajax({
                  type: "POST",
                  beforeSend: function(request) {
                    request.setRequestHeader("X-Parse-Application-Id", eventController.container.lookup('adapter:application').get('applicationId'));
                    request.setRequestHeader("X-Parse-REST-API-Key", eventController.container.lookup('adapter:application').get('restApiId'));
                    request.setRequestHeader("Content-Type", file.type);
                  },
                  url: serverUrl,
                  data: file,
                  processData: false,
                  contentType: false,
                  success: function(data) {
                    var photo = eventController.store.createRecord('photo', {
                      event: eventController.model,
                      parseUser: eventController.get('store').getById('parseUser', eventController.get('session.user.id')),
                      userName: eventController.get('session.user.username'),
                      url: data.url,
                      ACL: userPhotoACL
                    });
                    photo.save().then(function(){
                      eventController.set('photosBeingUploaded', eventController.get('photosBeingUploaded') - 1);
                    });
                  },
                  error: function(data) {
                    alert('error uploading photo');
                  }
                });
        };
        this.set('photosBeingUploaded', files.length);
        for (var i = 0, f; f = files[i]; i++) {
          uploadPhotoAjax(this, f);
        }
      }
    },
    join: function(){
      var userEvent;
      if(!this.get('firstCurrentUserEvent')){
        var userEventACL = {
            "*": {
              "read": true
            }
          };
        userEventACL[this.get('session.user.id')] = {
          write: true
        };
        userEvent = this.store.createRecord('userEvent', {
          event: this.get('model'),
          parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
          ACL: userEventACL
        });
      }
      else{
        userEvent = this.get('firstCurrentUserEvent');
      }
      userEvent.set('attending', true);
      this.send('saveUserEvent', userEvent);
      return false;
    },
    leave: function(){
      var userEvent = this.get('firstCurrentUserEvent');
      userEvent.set('attending', false);
      this.send('saveUserEvent', userEvent);
      return false;
    },
    comment: function(){
      var commentText = this.get('commentText');
      var commentACL = {
          "*": {
            "read": true
          }
        };
      commentACL[this.get('session.user.id')] = {
        write: true
      };
      var comment = this.store.createRecord('comment',{
        event: this.get('model'),
        parseUser: this.get('store').getById('parseUser', this.get('session.user.id')),
        userName: this.get('store').getById('parseUser', this.get('session.user.id')).get('username'),
        text: commentText,
        ACL: commentACL
      });
      this.set('commentText','');
      this.send('saveComment', comment);
    },
    morePhotos: function(){
      this.set('numPhotosToShow', this.get('numPhotosToShow')+12);
    }
  }
});
