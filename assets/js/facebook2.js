if ((typeof cordova == 'undefined') && (typeof Cordova == 'undefined')) alert('Cordova variable does not exist. Check that you have included cordova.js correctly');
if (typeof CDV == 'undefined') alert('CDV variable does not exist. Check that you have included cdv-plugin-fb-connect.js correctly');
if (typeof FB == 'undefined') alert('FB variable does not exist. Check that you have included the Facebook JS SDK file.');

FB.Event.subscribe('auth.login', function(response) {
   alert('auth.login event');
});

FB.Event.subscribe('auth.logout', function(response) {
   alert('auth.logout event');
});

FB.Event.subscribe('auth.sessionChange', function(response) {
   alert('auth.sessionChange event');
});

FB.Event.subscribe('auth.statusChange', function(response) {
   alert('auth.statusChange event');
});

function initFB() {
	
	try {
		alert('Device is ready! Make sure you set your app_id below this alert.');
		FB.init({ appId: "405225646214042", nativeInterface: CDV.FB, useCachedDialogs: false });
		
	} catch (e) {
		alert(e);
	}
	
}

function getLoginStatus() {
    FB.getLoginStatus(function(response) {
		if (response.status == 'connected') {
			alert('logged in');
		} else {
			alert('not logged in');
		}
	});
}

function login() {
    FB.login(
             function(response) {
             if (response.session) {
             alert('logged in');
             } else {
             alert('not logged in');
             }
             },
             { scope: "email" }
             );
}

function me() {
    FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
           if (response.error) {
           alert(JSON.stringify(response.error));
           } else {
           var data = document.getElementById('data');
		   fdata=response.data;
		   console.log("fdata: "+fdata);
           response.data.forEach(function(item) {
                                 var d = document.createElement('div');
                                 d.innerHTML = "<img src="+item.picture+"/>"+item.name;
                                 data.appendChild(d);
                                 });
           }
		var friends = response.data;
		console.log(friends.length); 
		for (var k = 0; k < friends.length && k < 200; k++) {
	        var friend = friends[k];
	        var index = 1;

	        friendIDs[k] = friend.id;
	        //friendsInfo[k] = friend;
		}
		console.log("friendId's: "+friendIDs);
           });
}

function facebookWallPost() {
    console.log('Debug 1');
	var params = {
	    method: 'feed',
	    name: 'Facebook Dialogs',
	    link: 'https://developers.facebook.com/docs/reference/dialogs/',
	    picture: 'http://fbrell.com/f8.jpg',
	    caption: 'Reference Documentation',
	    description: 'Dialogs provide a simple, consistent interface for applications to interface with users.'
	  };
	console.log(params);
    FB.ui(params, function(obj) { console.log(obj);});
}