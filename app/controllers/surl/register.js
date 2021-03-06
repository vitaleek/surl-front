import Ember from 'ember';

export default Ember.Controller.extend({
	
	init: function() {
		this._super();
		var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
		socket.on('open', this.myOpenHandler, this);
		socket.on('message', this.myMessageHandler, this);
		socket.on('close', function(event) {console.log('closed');}, this);
  },
  login: '',

  myOpenHandler: function(event) {
    console.log('Connected to server');
	
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
		if (event.data === 'NO_USER') {
			alert('User added to database successfully.');
			eraseCookie("login");
			eraseCookie("shortlink");
			
			createCookie("login", this.login);
			window.location.href = "/logon";
			}
		
		if (event.data === 'USER_IN_BASE') {alert('This Login already in the database. Please, try another one.');}
  },

  actions: {
    
	regOn: function(){
				var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
				var log = document.getElementById("login").value;
				var pass = document.getElementById("password").value;
				
				if ((log === '')||(pass === ''))
					{alert ('Please, fill fields "Login/Password"');}
				else {
					var jsonobj = {Object: "USER_reg", Login: log, Password: pass};
					var logpass = JSON.stringify(jsonobj);
					socket.send(logpass);
					this.set('login', log);
					
				}
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