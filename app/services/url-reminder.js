import Ember from 'ember';

export default Ember.Service.extend({
	url: '*******start of thr service!!!!!*******',
	
	init() {
		this._super(...arguments);
		//this.set('url','');
	},
	
	urlToMemory(arg){
			this.set('url', arg);
			alert("Hello from service!!!   "+this.url.ShortLink);
	},
	urlFromMemory(){
		alert("Hello from service!!!   "+this.url.ShortLink);
			return this.get('url');
			
	}
});
