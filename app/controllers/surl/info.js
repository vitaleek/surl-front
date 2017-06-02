import Ember from 'ember';

export default Ember.Controller.extend({
	rs: null,
	init: function() {
		this._super();
		var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
		socket.on('open', this.myOpenHandler, this);
		socket.on('message', this.myMessageHandler, this);
		socket.on('close', function(event) {console.log('closed');}, this);
  },

  myOpenHandler: function(event) {
    console.log('Connected to server');
	
  },

  myMessageHandler: function(event) {
    var resultset = JSON.parse(event.data);
	//this.set('rs', resultset);
	if (resultset.LongLink === ""){
		alert('No such link in base');}
	
	else{
		eraseCookie("Description");
		eraseCookie("Tags");
		eraseCookie("ShortLink");
		createCookie("Description",resultset.Description);
		createCookie("Tags",JSON.stringify(resultset.Tags));
		createCookie("ShortLink",resultset.ShortLink);
		window.location.href = "/tags";
	}	
  },

  actions: {
    
	getInfo: function(){
				var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
				var url = document.getElementById("url").value;
				
				
				if (url === '')
					{alert ('Field input cannot be empty!');}
				else {
					var jsonobj = {Object: "URL_getinfo", LongLink: "", ShortLink: url, UserLogin: "", Description: "", Tags: [], Redirect: 0};
					var logpass = JSON.stringify(jsonobj);
					socket.send(logpass);	
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