import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  redirects: {
    
    
    'login'       : 'edit'
    
  }
});

Router.map(function() {
    this.route('surl', { path: '/' }, function() {
      this.route('login', function() {
        this.route('logon', function() {
          this.route('shorter');
          this.route('statistics');
          this.route('edit');
        });
      });
      this.route('register');
      this.route('logon', function() {});
      this.route('info');
      this.route('shorter');
      this.route('statistics');
      this.route('tags');
      this.route('listlink');
      this.route('redirect');
      this.route('edit');
    });
});

export default Router;
