import Ember from 'ember';

export default Ember.View.extend({
  detectTouch: function(){
    document.documentElement.className += 
      (("ontouchstart" in document.documentElement) ? ' touch' : ' no-touch');
  }.on('didInsertElement')
});
