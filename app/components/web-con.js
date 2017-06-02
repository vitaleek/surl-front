import Ember from 'ember';

export default Ember.Component.extend({
	webConnection: Ember.inject.service('web-connection'),
	
	actions:{
		doit(){
			this.get('webConnection').doit();
		}
	}
	
	
});
