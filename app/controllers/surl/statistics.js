import Ember from 'ember';

export default Ember.Controller.extend({
	
	_rs: null,
	onUrl: null,
	init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {console.log('closed');}, this);
  },
  message: '',

  myOpenHandler: function(event) {
	var log = readCookie("login");
    var jsonobj = {Object: "STATISTICS_ghjklhg", Login: log};
	var link = JSON.stringify(jsonobj);
	var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
	socket.send(link);
  },

  myMessageHandler: function(event) {
		var resultset = JSON.parse(event.data);
		this.set('_rs', resultset);		
  },
 
  actions: {
	  
	  toMemory(element) {

		createCookie('shortlink',element.ShortLink);  
		window.location.href = "/edit";
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
