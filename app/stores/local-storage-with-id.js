import LocalStorage from 'simple-auth/stores/local-storage';

export default LocalStorage.extend({
  persist: function(data) {
    if (data.user.toJSON){
      data.user = data.user.toJSON({includeId:true});
    }
    data = JSON.stringify(data || {});
    localStorage.setItem(this.key, data);
    this._lastData = this.restore();
  },
});
