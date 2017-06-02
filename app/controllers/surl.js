import Ember from 'ember';

export default Ember.Controller.extend({
	
	
	actions: {
	  
		deleteCookie() {
			eraseCookie("login");
			eraseCookie("Description");
			eraseCookie("Tags");
			eraseCookie("ShortLink");
			eraseCookie("tag");
		}
	}
});
//------------------------------
function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else {var expires = "";}
		document.cookie = name+"="+value+expires+"; path=/";
	}
function eraseCookie(name) {
		createCookie(name,"",-1);
	}