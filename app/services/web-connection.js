import Ember from 'ember';

export default Ember.Service.extend({
	
	
	
	
	
	
	
	webSocket: "ws://localhost:8080/EchoChamber/echo",
	init(){
		this._super(...arguments);
		//this.webSocket = new WebSocket("ws://localhost:8080/EchoChamber/echo");	
		
	},	
	
	doit(){
		//this.webSocket = new WebSocket("ws://localhost:8080/EchoChamber/echo");	
		this.webSocket.send('HELLO!!!!!');
	},
	
	logIn(){
		//this.webSocket = new WebSocket("ws://localhost:8080/EchoChamber/echo");		
		var log = document.getElementById("login").value;
		var pass = document.getElementById("password").value;
				
		if ((log === '')||(pass === ''))
			{alert ('Check fields "Login/Password"');}
		else {
			var jsonobj = {Object: "USER_rtubcxedhhb", Login: log, Password: pass};
			var logpass = JSON.stringify(jsonobj);
			this.webSocket.send(logpass);
		}
		
		this.webSocket.onmessage = function(event){
			if (event.data === 'SUCCESSFUL') {window.location.href = "/logon";}
			if (event.data === 'WRONG_PASS') {alert('Check input, password wrong!');}
			if (event.data === 'NO_USER') {alert('No such user in database!');}				
        };
	}
	
	
});
