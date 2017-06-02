import Ember from 'ember';

export default Ember.Controller.extend({
	init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
    socket.on('open', this.myOpenHandler, this);
    socket.on('message', this.myMessageHandler, this);
    socket.on('close', function(event) {console.log('closed');}, this);
  },
  message: '',

  myOpenHandler: function(event) {
    console.log('On open event has been called: ' + event);
  },

  myMessageHandler: function(event) {
    console.log('Message: ' + event.data);
		if (event.data === 'SUCCESSFUL') {alert('Your URL added successfilly to database!');  
			window.location.href = "/logon";}
		if (event.data === 'IN_BASE') {alert('This URL is already in base!');}
  },

  actions: {
    sendButtonPressed: function() {
      var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
      socket.send('Hello Websocket World');
    },
	
	sendNewUrl(){
				var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
				var url = document.getElementById("url").value;
				var description = document.getElementById("description").value;
				var tag_array = new Array(5);
				tag_array[1] = document.getElementById("tag1").value;
				tag_array[2] = document.getElementById("tag2").value;
				tag_array[3] = document.getElementById("tag3").value;
				tag_array[4] = document.getElementById("tag4").value;
				tag_array[5] = document.getElementById("tag5").value;
				
				if ((url === '')||(description === ''))
					{alert ('Check fields "url/description"');}
				else {
					if ((tag_array[1] === '')&&(tag_array[2] === '')&&(tag_array[3] === '')&&(tag_array[4] === '')&&(tag_array[5] === '')){
					alert ('Enter at least one tag word!');}
						
					else{
						var log = readCookie("login");
						
						var l = 0;
						var jsonobj ={Object: "LINK_fdlkhferhjhvt", LongLink: url, ShortLink: "", UserLogin: log, Description: description};
						
						tag_array.forEach(function(item, i, tag_array){
							if (!(item === '')) {
								l++;
							}
						})
						
						var t_arr = new Array(l);
						l = 0;
						tag_array.forEach(function(item, i, tag_array){
							if (!(item === '')) {
								t_arr[l] = tag_array[i];
								l++;
							}
						})
						jsonobj = {Object: "LINK_fdlkhferhjhvt", LongLink: url, ShortLink: "", UserLogin: log, Description: description, Tags: t_arr, Redirect: 0};
						var link = JSON.stringify(jsonobj);
						socket.send(link);
					}
				}
			}
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
