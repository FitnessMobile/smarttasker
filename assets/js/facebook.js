// GLOBAL VARS
var my_client_id = "405225646214042", // YOUR APP ID
	my_secret = "7c278bfde3f2f806e8cdf44a3f561844", // YOUR APP SECRET 
	my_redirect_uri = "https://www.facebook.com/connect/login_success.html", // LEAVE THIS
	my_type ="user_agent", my_display = "touch"; // LEAVE THIS
var facebook_token = "fbToken"; // OUR TOKEN KEEPER
var client_browser;
// FACEBOOK
var Facebook = {
	init:function(){

		var authorize_url = "https://graph.facebook.com/oauth/authorize?";
		 authorize_url += "client_id=" + my_client_id;
		 authorize_url += "&redirect_uri=" + my_redirect_uri;
		 authorize_url += "&display=" + my_display;
		 authorize_url += "&scope=publish_stream,offline_access"
		 
		 // Open Child browser and ask for permissions
		 window.plugins.childBrowser.onLocationChange = function(loc){
		 	//console.log(loc);
			Facebook.facebookLocChanged(loc, false, false);
		 };
	
		window.plugins.childBrowser.showWebPage(authorize_url, { showLocationBar: false });

	},
	facebookLocChanged:function(loc, post, params){
		
		if (loc.indexOf("https://www.facebook.com/connect/login_success.html") == 0) {

			var fbCode2 = loc.replace(/^.*?\=/, '');
			
			fbCode2 = fbCode2.replace("#_=_","");
			
			token_url = 'https://graph.facebook.com/oauth/access_token?client_id='+my_client_id+'&client_secret='+my_secret+'&code='+fbCode2+'&redirect_uri=https://www.facebook.com/connect/login_success.html';
			
			$.ajax({
				url:token_url,
				data: {},
				dataType: 'text',
				type: 'POST',
				success: function(data, status){
					//console.log('success');
					window.plugins.childBrowser.close();
					// We store our token in a localStorage Item called facebook_token
					localStorage.setItem(facebook_token, data.split("=")[1]);
					if (post) {
						var url = 'https://graph.facebook.com/me/feed?access_token='+localStorage.getItem(facebook_token);
						for(var key in params){
							if(key == "message"){
								url = url+"&"+key+"="+escape(params[key]);
							}
							else {
								url = url+"&"+key+"="+encodeURIComponent(params[key]);
							}
						}
						var req = Facebook.request(url);
					} else {
						app.login(true);	
					}
					
				},
				error: function(error) {
					app.deliverError('FB get data error on url: ' + token_url, '68');
					window.plugins.childBrowser.close();
				}
			});
		}
	},
	request:function(url){
 
		// Create our request and open the connection
		var req = new XMLHttpRequest(); 
		req.open("POST", url, true);
		
		req.send(null); 
		return req;
	},
	post:function(_fbType,params){
		
		if(!localStorage.getItem(facebook_token)) {
			
			var authorize_url = "https://graph.facebook.com/oauth/authorize?";
			authorize_url += "client_id=" + my_client_id;
			authorize_url += "&redirect_uri=" + my_redirect_uri;
			authorize_url += "&display=" + my_display;
			authorize_url += "&scope=publish_stream,offline_access"
			 
			// Open Child browser and ask for permissions
			window.plugins.childBrowser.onLocationChange = function(loc){
			 	//console.log(loc);
				Facebook.facebookLocChanged(loc, true, params);
			};
		
			window.plugins.childBrowser.showWebPage(authorize_url, { showLocationBar: false });
			
		} else {
			
			var url = 'https://graph.facebook.com/me/'+_fbType+'?access_token='+localStorage.getItem(facebook_token);
			for(var key in params){
				if(key == "message"){
					url = url+"&"+key+"="+escape(params[key]);
				}
				else {
					url = url+"&"+key+"="+encodeURIComponent(params[key]);
				}
			}
			var req = Facebook.request(url);
			
		}

 
	},
	get: function() {
		data = {};
		
		$.getJSON('https://graph.facebook.com/me/?access_token=' + localStorage.getItem(facebook_token), function(result) {

			data.fb_id = result.id;
			data.firstname = result.first_name;
			data.lastname = result.last_name;
			data.sex = result.gender;
			data.mail = '';
			app.doLogin(data.fb_id, data);
		
		});
		
		//var req = Facebook.request('https://graph.facebook.com/me/?access_token=' + localStorage.getItem(facebook_token));
		//return req;
	},
	success:function(){
 
		//console.log("DONE!");
 
	}
};

function getQueryVariable(url, variable) {
    var query = url.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    //console.log('Query variable %s not found', variable);
}