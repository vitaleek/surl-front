import Ember from 'ember';

export default Ember.Controller.extend({
	tags: null,
	desc: null,
	url: null,
	init: function() {
		this._super();
		var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
		
		socket.on('open', this.myOpenHandler, this);
		socket.on('message', this.myMessageHandler, this);
		socket.on('close', function(event) {console.log('closed');}, this);
  },

  myOpenHandler: function(event) {
    console.log('Connected to server');
		var description = readCookie("Description");
		var t = readCookie("Tags");
		var t_arr = JSON.parse(t);
		
		
		var u = readCookie("ShortLink");
		
		this.set('tags', t_arr);
		//alert(t_arr+'_____'+this.tags);
		
		this.set('desc', description);
		//alert(description+ '_____'+this.desc);
		this.set('url', u);
		//alert(u+ '_____'+this.url+'!!!!!!!!!!');
  },

  myMessageHandler: function(event) {
    
  },

  actions: {
    
	linkList(tag) {
		createCookie("tag", tag);
		window.location.href = "/listlink";
				
	},
  }
});

//--------------------
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else {var expires = "";}
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)===' ') {c = c.substring(1,c.length);}
			if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
  //--------------------
