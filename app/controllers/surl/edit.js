import Ember from 'ember';

export default Ember.Controller.extend({
	linkset: null,
	
	init: function() {
		this._super();
		var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');	
		socket.on('open', this.myOpenHandler, this);
		socket.on('message', this.myMessageHandler, this);
		socket.on('close', function() {console.log('closed');}, this);
	},
	message: '',

	  myOpenHandler: function() {
		var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
		var shortlink = readCookie("shortlink");
		//alert(shortlink);
		var jsonobj = {Object: "LINKREQUEST_alryeudh", Shortlink: shortlink};
		var shlink = JSON.stringify(jsonobj);
		socket.send(shlink);
	  },

	  myMessageHandler: function(event) {
			var rs = JSON.parse(event.data);
			//alert(rs.ShortLink);
			this.set('linkset', rs); 	
	  },
	  
	  actions: {
		  sendNewLink(){
				var log = readCookie("login");
				var rs = this.get('linkset');
				var socket = this.get('websockets').socketFor('ws://localhost:8080/EchoChamber/echo');
				var description = document.getElementById("description").value;
				var tag_array = new Array(5);
				tag_array[1] = document.getElementById("tag1").value;
				tag_array[2] = document.getElementById("tag2").value;
				tag_array[3] = document.getElementById("tag3").value;
				tag_array[4] = document.getElementById("tag4").value;
				tag_array[5] = document.getElementById("tag5").value;
				var t_arr = new Array(l);
				if (description ===''){
					alert('Description will not be changed!');
					description = this.get('linkset').Description;
					}
				if ((tag_array[1] === '')&&(tag_array[2] === '')&&(tag_array[3] === '')&&(tag_array[4] === '')&&(tag_array[5] === '')){
					alert ('Tags will not be changed!');
					t_arr = this.get('linkset').Tags;
					}
				else {
					var l = 0;

					tag_array.forEach(function(item, i, tag_array){
						if (!(item === '')) {
							l++;
						}
					})
						
				
					l = 0;
					tag_array.forEach(function(item, i, tag_array){
						if (!(item === '')) {
							t_arr[l] = tag_array[i];
							l++;
						}
					})
				}	
				
				var jsonobj = {Object: "LINKFIX_rtedfred", LongLink: rs.LongLink, ShortLink: rs.ShortLink, UserLogin: log, Description: description, Tags: t_arr, Redirect: rs.Redirect};
				var link = JSON.stringify(jsonobj);
				socket.send(link);
				alert("Link succesfully updated");
				window.location.href = "/logon";
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
