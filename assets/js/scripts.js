/*

*FB to fix
*post to fb task
*radio, checkbox task
*group tasks
*stats info - store in db ?
*map bug ?
*bank account
*prize

*/
var app = {};
var stats = {};

var user = {};
var task = {};
var sub_tasks = {};
var homeLoaded = false;
var timer1 = {};
var db = {};
var data = {};

//var facebook = forge.facebook;
//var flurry = forge.flurry;

var facebook = {};
var flurry = {};

window.onerror = function (msg, url, line) {
	if (window.device.platform != 'Generic') {
   		error_data = {};
	   	error_data.function = app.curFunction;
	   	error_data.error = msg;
	   	error_data.file = url;
	   	error_data.line = line;
	   
	   	error_data.device_name = window.device.name;
	   	error_data.device_platform = window.device.platform;
	   	error_data.device_version = window.device.version;
	   
	   	error_data.data = {};
	   	error_data.data.data = data;
	   	error_data.data.user = user;
	   
	   	$.get(app.serverUrl + '?action=reportAnError', error_data, function(result) {
	   		if(result.success)
	   			console.log('Error reported');
	   	}, 'jsonp');
	}
}

app = {
	navigated: false,
	profileToLoad: false,
	position: {},
	serverUrl: 'http://projects.efley.ee/smarttasker/server.php',
	curFunction: 'init',
	mapView: false, 
	
	init: function() {

		localStorage.removeItem('user_id');
		//localStorage.removeItem(facebook_token);
		
		db = window.openDatabase("smarttasker", "1.0", "SmartTasker", 200000);
		
		if (localStorage.getItem('user_id')) {
			user.id = localStorage.getItem('user_id');
			db.transaction(queryUserId, errorDB);
		} else {
			app.login(false);
		}
		
		if (!localStorage.getItem('company_id') || localStorage.getItem('company_id') == 0) {
			$('#profile_password').hide();
			$('.private-tasks').parent().hide();
		} else {
			$('#profile_password').show();
			$('.private-tasks').parent().show();
		}
		
		if(localStorage.getItem('mail'))
			$('#mail').val(localStorage.getItem('mail'))
		if(localStorage.getItem('password')) {
			$('#password').val(localStorage.getItem('password'))
			$('#keepLoggedIn').attr('checked', 'checked');
		}
		
	},
	
	navigate: function(page, init_function) {
		app.curFunction = 'navigate';
		
		$('.not-logged-in').removeClass('not-logged-in').addClass('logged-in');
		$('.logged-in').find('h2').show();
		
		switch(page) {
			case 'home.html':
				$('.logged-in').attr('id', 'mainPage');
				$('.logged-in').find('h2').html('Menüü');
				$('.back-btn').hide();
				margin = 100;
			break;
			case 'tasks.html':
				//document.addEventListener("offline", onOffline, false);
				$('.back-btn').show();
				margin = 200;
			break;
			case 'task.html':
				$('.back-btn').show();
				$('.detailed-content').html('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
				margin = 300;
			break;
			case 'sub.html':
				$('.back-btn').show();
				margin = 400;
			break;
			
		}
		
		document.addEventListener("offline", function() {
			//alert('online!');
		}, false);
		
		if(init_function)
			app[init_function]();
		
		$('.content').css({
			webkitTransform: "translate3d(-"+(margin/5)+"%, 0, 0)"
		});

	},
	
	login: function(fromFb) {
		app.curFunction = 'login';
		
		$('.login-form-wrap').find('h3').click(function(e) {
			if($('.login-form-wrap').hasClass('small'))
				$('.login-form-wrap').removeClass('small');
			else
				$('.login-form-wrap').addClass('small');
				
			$('#loginForm').toggle();
		});
		
		if (!localStorage.getItem(facebook_token)){
			$("#login").click(function(){
				Facebook.init();
			});
		
		} else {
			$("#login").click(function(){
				token = localStorage.getItem(facebook_token);
				//console.log('exists: ' + token);
				Facebook.get();
			});
		}
		
		if(fromFb)
			Facebook.get();

		$('#loginBtn').click(function(e) {
			////console.log('wdf');
			e.preventDefault();
			error = false;
			if($('#mail').val() == '') {
				error = true;
				$('#mail').css('border-color', 'red');
			} else {
				$('#mail').css('border-color', 'gray');
			}
			if($('#password').val() == '') {
				error = true;
				$('#password').css('border-color', 'red');
			} else {
				$('#password').css('border-color', 'gray');
			}

			if(error == false) {
				if ($('#keepLoggedIn').is(':checked')) {
					localStorage.setItem('mail', $('#mail').val());
					localStorage.setItem('password', $('#password').val());
				} else {
					localStorage.removeItem('mail');
					localStorage.removeItem('password');
				}
				data = {};
				data.fb_id = false;		
				data.mail = $('#mail').val();
				data.password = $('#password').val();
				
				app.doLogin(false, data);
				
			}			
		});
		
	},
	
	/*
	* check the logic..
	*/
	
	doLogin: function(fb_id, data) {
		
		app.curFunction = 'doLogin';
	
		//console.log(data);
		$.get(app.serverUrl + '?action=userLogin', data, function(result) {
			//console.log(result);
			if	(result.id) {
				user.id = result.id;

				user.accepted = 0;
				user.done = 0;
				user.rejected = 0;
				user.money = 0;
				user.prizes = 0;

				if(result.user_new && fb_id) {
				
					localStorage.removeItem('company_id');
					
					user.firstname = data.firstname;
					user.lastname = data.lastname;
					user.sex = data.sex;
					user.mail = '';
					user.fb_id = fb_id;
					user.company_id = false;
					
					db.transaction(insertUser, errorDB, successUser);
					
					$('.private-tasks').parent().hide();
					
					app.preLoadHome();
					
				} else if(fb_id) {
					
					user.mail = '';
					user.firstname = result.firstname;
					user.lastname = result.lastname;
					user.sex = result.sex;
					user.fb_id = result.facebook;
					user.company_id = false;
					/*if(result.company_id) {
						$('.private-tasks').parent().show();
					} else {*/
						$('.private-tasks').parent().hide();
						localStorage.removeItem('company_id');	
					//}
					
					//console.log('we got here!');
						
					db.transaction(queryUserId, errorDB);
					
					
				} else {
					localStorage.setItem('company_id', result.company_id);
					user.mail = data.mail;
					user.firstname = result.firstname;
					user.lastname = result.lastname;
					user.sex = result.sex;
					user.fb_id = result.facebook;
					user.company_id = result.company_id;
					
					$('.private-tasks').parent().show();
					
					db.transaction(queryUserId, errorDB);
					
				}

				localStorage.setItem('user_id', user.id);
				
				
			} else if(fb_id == false) {
				$('#mail').css('border-color', 'red');
				$('#password').css('border-color', 'red');
			}
		}, "jsonp");
	
	},
	
	preLoadHome: function() {
		
		app.curFunction = 'preLoadHome';
		
		//console.log('Welcome home:');
		
		if(!homeLoaded) {
			homeLoaded = true;

			user.private_new = 0;
			user.public_new = 0;
			user.denied_new = 0;
			user.prizes_new = 0;

			app.navigate('home.html', 'loadHome');
			
			if (user.company_id) {
				app.trackUser();
			}
		}
		
	},
	loadHome: function() {
		
		$('.dir-btn').hide();
		$('.list-btn').hide();
		$('.map-btn').hide();
		$('.refresh-btn').show();
		
		app.curFunction = 'loadHome';
	
		$('header').find('h1').html('Kodu');
		
		data = {};
		data.id = user.id;
		
		app.parseHome();
		
		$('.refresh-btn').unbind('click');
		$('.refresh-btn').click(function(e) {
			e.preventDefault();
			$('.refresh-btn').hide();
			$('.refreshing-btn').show();
			app.parseHome();
		});
		
		
		
	},
	
	parseHome: function() {
	
		$.get(app.serverUrl + '?action=getUserStats', data, function(result) {
		
			user.private_new = result.getPrivate;
			user.public_new = result.getPublic;
			user.unfinished_new = result.getUnfinished;
			user.denied_new = result.getDenied;
			user.prizes_new = user.prizes;
			
			user.money = result.money;
			user.prizes_new = result.prizes;
			user.rejected = user.denied_new;

			$('.mainmenu').find('a').each(function(i, item) {
				//console.log($(item).attr('rel'));
				if ($(item).attr('rel') == 'getPrivate') {
					if (user.private_new > 0) $(item).find('.note').html(user.private_new).show();
					else $(item).find('.note').hide();
				} else if ($(item).attr('rel') == 'getPublic') {
					
					if (user.public_new > 0) {
					
						$(item).find('.note').html(user.public_new).show();
					
						if(parseInt(user.public_new) > 100) 
							$(item).find('.note').css('width', '22px');
						else 
							$(item).find('.note').css('width', '15px');
							
						
					} else {
						$(item).find('.note').hide();
					}
				} else if ($(item).attr('rel') == 'getUnfinished') {
					if (user.unfinished_new > 0) $(item).find('.note').html(user.unfinished_new).show();
					else $(item).find('.note').hide();
				} else if ($(item).attr('rel') == 'getDenied') {
					if (user.denied_new > 0) $(item).find('.note').html(user.denied_new).show();
					else $(item).find('.note').hide();
				} else if ($(item).attr('rel') == 'getPrizes') {
					if (user.prizes_new > 0) $(item).find('.note').html(user.prizes_new).show();
					else $(item).find('.note').hide();
				}
			});
			
		}, 'jsonp');
			
		$('.refresh-btn').show();
		$('.refreshing-btn').hide();
			
		$('.mainmenu').find('a').unbind('click');
		$('.mainmenu').find('a').click(function(e) {
			$('.tasklist-content').hide();
			$('.statistics-content').hide();
			$('.prizes-content').hide();
			$('.profile-content').hide();
			
			e.preventDefault();
			app.tasksType = $(this).attr('rel');
			if(app.tasksType != 'getStats' && app.tasksType != 'getPrizes' && app.tasksType != 'getProfile')
				app.navigate('tasks.html', 'loadTasks');
			else
				app.navigate('tasks.html', 'loadCustom');
		});
		
	},
	
	loadCustom: function() {
		
		app.curFunction = 'loadCustom';
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			e.preventDefault();
			app.navigate('home.html', 'loadHome');
		});
		if (app.tasksType == 'getStats') {
			$('.statistics-content').show();
			$('#stats_accepted').html(user.accepted);
			$('#stats_done').html(user.done);
			$('#stats_rejected').html(user.denied_new);
			//alert('wdf');
			$('#stats_money').html(user.money + '€');
			$('#stats_prizes').html(user.prizes_new);
		} else if (app.tasksType == 'getPrizes') {
			$('.prizes-content').html('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
			$('.prizes-content').show();
			data = {};
			data.user = user.id;
			$.get(app.serverUrl + '?action=getUserPrizes', data, function(result) {
				$('.prizes-content').html('');
				if(result.length) {
					$.each(result, function(i, item) {
						template = $('.task-prize-template');
						template.find('.prize-thumb').attr('src', 'http://projects.efley.ee/smarttasker/prizes/' + item.id + '.jpg');
						template.find('.task-name').html(item.name);
						template.find('.distance').html(item.distance);
						template.find('.distance-value').html(item.distance_value);
						
						template.find('.deadline').html(item.deadline);
						template.find('.time-left').html(item.time_left);
						
						$('.prizes-content').prepend(template.html());
						
					});
				} else {
					$('.prizes-content').html('<h3>Auhinnad puuduvad</h3>');
				}
			
			}, 'jsonp');
			
		} else if (app.tasksType == 'getProfile') {
			if (user.company_id) {
				$('#profile_password').show();
			}
			$('.profile-content').show();
			$('#profile_firstname').val(user.firstname);
			$('#profile_lastname').val(user.lastname);
			$('#profile_mail').val(user.mail);
			if(user.bank == 'undefined' || !user.bank)
				user.bank = '';
				
			$('#profile_bank').val(user.bank);
			
			if(user.sex == 'female') {
				$('#sex_female').attr('checked', 'checked');
			} else {
				$('#sex_male').attr('checked', 'checked');
			}
			
			$('#saveProfileBtn').unbind('click');
			$('#saveProfileBtn').click(function(e) {
				e.preventDefault();
				user.firstname = $('#profile_firstname').val();
				user.lastname = $('#profile_lastname').val();
				user.mail = $('#profile_mail').val();
				user.bank = $('#profile_bank').val();
				user.password = $('#profile_password').val();
				user.sex = $('input[name="sex"]:checked').val();
				app.updateUser();
				app.navigate('home.html');
			});
			
		}
	},
	
	loadTasks: function() {
		$('.refresh-btn').hide();
		$('.dir-btn').hide();
		$('.list-btn').hide();
		
		app.curFunction = 'loadTasks';
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			e.preventDefault();
			app.navigate('home.html', 'loadHome');
		});	
		
		$('.logged-in').attr('id', 'tasksListPage');
		$('.logged-in').find('h2').html('Tegevused');
		
		$('.tasklist-content').show();
		$('.tasklist-content').html('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
		
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position) {

				app.position = position;
				
				data = {};
				data.user = user.id;
				data.type = app.tasksType;
				
				data.lat = position.coords.latitude;
				data.lng = position.coords.longitude;
				
				$.get(app.serverUrl + '?action=getTasks', data, function(results) {
					if(results.length) {
					$('.tasklist-content').html('<div id="tasksMap"></div>');

						$('.map-btn').show();
						
						locations = [];
						
						var latlngbounds = new google.maps.LatLngBounds();

						
						$.each(results, function(i, item) {
							if(item.address) {
								locations[i] = [item.name, item.latitude, item.longitude, item.id, 'tasks', i];
								var n = new google.maps.LatLng(item.latitude, item.longitude);
								latlngbounds.extend(n);
							}

							template = $('.tasklist').find('.task-prize-template');
							template.find('a').attr('rel', item.id);
							template.find('.task-name').html(item.name);
							template.find('.time-left').html(item.end);
							if (item.address) {
								
								if(parseInt(item.distance) > 1000) {
									temp_distance = Math.round(parseInt(item.distance)/1000);
									temp_distance = temp_distance + 'km';
								} else {
									temp_distance = item.distance + 'm';
									
								}
								template.find('.distance-value').html(temp_distance);
								temp_address = item.address.replace(', Eesti Vabariik', '');
									template.find('.address').html(temp_address);
									
								template.find('.distance').show();
								template.find('.address').show();
								
							} else {
								template.find('.distance').hide();
								template.find('.address').hide();
							}
							
							
							$('.tasklist-content').append(template.html());
							if(item.prize_type == 'cash') {
								if(item.is_public && item.is_public != '0') {
									$('.tasklist-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">' + item.prize_sum + '€</strong>');
								} else {
									$('.tasklist-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">&nbsp;</strong>');
								}
							} else {
								$('.tasklist-content').find('.prize-wrap:last').html('<span class="label">Auhind</span><img class="prize-thumb" src="http://projects.efley.ee/smarttasker/prizes/' + item.id + '.jpg" width="25" height="25">');
							}
						});
						$('.map-btn').unbind('click');
						$('.map-btn').click(function() {
						
							app.mapView = true;
						
							$('.list-btn').show();
							$('.map-btn').hide();
							$('#tasksMap').show();
							$('#tasksMap').css({
								'width': '100%',
								'height': '380px'
							});
							$('.tasklist-content').find('a').hide();
							var mapOptions = {
								zoom: 15,
								center: new google.maps.LatLng(app.position.coords.latitude, app.position.coords.longitude),
								mapTypeId: google.maps.MapTypeId.ROADMAP
							}
							var map = new google.maps.Map(document.getElementById("tasksMap"), mapOptions);

							setMarkers(map, locations);
							setTimeout(function() {
								var myloc = new google.maps.Marker({
								    clickable: false,
								    icon: new google.maps.MarkerImage('http://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
										new google.maps.Size(22,22),
								        new google.maps.Point(0,18),
								        new google.maps.Point(11,11)),
								    shadow: null,
								    zIndex: 999,
								    map: map
								});
								var me = new google.maps.LatLng(app.position.coords.latitude, app.position.coords.longitude);
								
								latlngbounds.extend(me);
								map.setCenter(latlngbounds.getCenter());
								map.fitBounds(latlngbounds); 
								
								myloc.setPosition(me);
							}, 200);

						});
						$('.list-btn').unbind('click');
						$('.list-btn').click(function() {
						
							app.mapView = false;
						
							$('.map-btn').show();
							$('.list-btn').hide();
							$('#tasksMap').hide();
							$('.tasklist-content').find('a').show();
						});
						
						if(app.mapView)
							$('.map-btn').click();
						
					} else {
						$('.tasklist-content').html('<h3>Ülesanded puuduvad</h3>');
					}
					
					$('.tasklist').find('a').click(function(e) {
						app.currentTask = $(this).attr('rel');
						e.preventDefault();
						app.navigate('task.html', 'loadTask');
					});
				
				}, 'jsonp');
				
			}, function(error) {
				alert('Pead lubama applikatsioonil asukohta näha');
			});
		}
		

	},
	
	loadTask: function() {
	
		$('.map-btn').hide();
		$('.list-btn').hide();
	
		app.curFunction = 'loadTask';
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			e.preventDefault();
			app.navigate('tasks.html', 'loadTasks');
		});	
		
		$('.confirmTasks').hide();
		
		$('body').animate({ scrollTop: 0 }, 100);
		
		data = {};
		data.user = user.id;
		data.task = app.currentTask;
		
		$.get(app.serverUrl + '?action=getTask', data, function(item) {
			
			task = item;
			
			$('.detailed-content').html('');
			$('.started-content').html('<h3>Puuduvad ülesanded</h3>');
			
			$('.logged-in').find('h2').html(item.name);

			$('.list').html('');
			template = $('.detailed-task').find('.task-prize-template');
			
			template.find('.task-name').html(item.name);
			template.find('.time-left').html(item.end);
			template.find('.desc').html(item.description);
			
			if (item.address) {
				$('.detailed-task').find('#taskMap').show();
				$('.detailed-task').find('.address').show();
			} else {
				$('.detailed-task').find('#taskMap').hide();
				$('.detailed-task').find('.address').hide();
			}
			
			template.find('.address').html(item.address);
			if(item.object)
				template.find('.address').prepend(item.object + ', ');

			$('.detailed-content').append(template.html());
			/*if(item.prize_type == 'cash') {
				$('.detailed-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">' + item.prize_sum + '€</strong>');
			} else {
				
			}*/
			
			if(item.prize_type == 'cash') {
				if(item.is_public && item.is_public != '0') {
					$('.detailed-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">' + item.prize_sum + '€</strong>');
				} else {
					$('.detailed-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">&nbsp;</strong>');
				}
			} else {
				$('.detailed-content').find('.prize-wrap:last').html('<span class="label">Auhind</span><img class="prize-thumb" src="http://projects.efley.ee/smarttasker/prizes/' + item.id + '.jpg" width="43" height="43">');
			}
			
			if(item.subs.length) {
				$('.started-content').html('');
				$.each(item.subs, function(i, sub){
					sub_tasks[sub.id] = sub;

					$('.list').append('<li>' + sub.name + '</li>');
					sub_template = $('.detailed-task').find('.sub-task-template');
					sub_template.find('.task-name').html(sub.name);
					sub_template.find('a').attr('rel', sub.id);
					if(sub.answer)
						sub_template.find('a').css('color', 'green').addClass('done').find('.arrow-icon').hide();
					else
						sub_template.find('a').css('color', '#888').removeClass('done').find('.arrow-icon').show();
						
					$('.started-content').append(sub_template.html());

				});
			}
			
			$('.detailed-content').show();
			$('.started-content').hide();
			data = {};
			data.user = user.id;
			data.task = item.id;
			
			if (item.status && item.status != false) {
				if (item.status == 'rejected')
					$('.startTask:first').html('Alusta uuesti ülesannet');
				else
					$('.startTask:first').html('Jätka ülesannet');
				$('.startTask:first').click(function() {
					app.startTask();
				});
			} else {
				$('.startTask:first').html('Alusta ülesannet');
				$('.startTask:first').click(function() {
					
					$.get(app.serverUrl + '?action=startTask', data, function(result) {
						if (result.success) {
							app.startTask();
							user.accepted = parseInt(user.accepted) + 1;
							app.updateUser();
						} else {
							alert('Midagi läks valesti serveris, proovi uuesti.');
						}
						//start auto tracking user :) muahaha..
						
					}, 'jsonp');
				});
			}

			//console.log(app.position.coords);
			var directionsDisplay;
			var directionsService = new google.maps.DirectionsService();
			
			setTimeout(function() {
				if(item.address) {
					$('.dir-btn').show();
					
					var latlngbounds = new google.maps.LatLngBounds();
					
					directionsDisplay = new google.maps.DirectionsRenderer();
					var currentLoc = new google.maps.LatLng(app.position.coords.latitude, app.position.coords.longitude);
					var destination = new google.maps.LatLng(item.latitude, item.longitude);
					
					//var n = new google.maps.LatLng(item.latitude, item.longitude);
					latlngbounds.extend(destination);
					
					var mapOptions = {
						zoom: 15,
						center: new google.maps.LatLng(item.latitude, item.longitude),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					var map = new google.maps.Map(document.getElementById("taskMap"), mapOptions);
					directionsDisplay.setMap(map);
					
					setTimeout(function() {
						var myloc = new google.maps.Marker({
						    clickable: false,
						    icon: new google.maps.MarkerImage('http://maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
	                            new google.maps.Size(22,22),
	                            new google.maps.Point(0,18),
	                            new google.maps.Point(11,11)),
						    shadow: null,
						    zIndex: 999,
						    map: map
						});
						var me = new google.maps.LatLng(app.position.coords.latitude, app.position.coords.longitude);
						myloc.setPosition(me);
						
						latlngbounds.extend(me);
						map.setCenter(latlngbounds.getCenter());
						map.fitBounds(latlngbounds); 
						
					}, 200);
					
					locations = [];
					locations[0] = [item.name, item.latitude, item.longitude, item.id];
					
					setMarkers(map, locations);
					
					$('.dir-btn').click(function() {
						
					  var request = {
					    origin:currentLoc,
					    destination:destination,
					    travelMode: google.maps.TravelMode.DRIVING
					  };
					  directionsService.route(request, function(result, status) {
					    if (status == google.maps.DirectionsStatus.OK) {
					      directionsDisplay.setDirections(result);
					    }
					  });
						
					});
				
				}
				
			}, 200);
		
		}, 'jsonp');
		
		$('.logged-in').attr('id', 'taskView');
		$('.logged-in').find('h2').html('Tegevus');
			
	},
	
	startTask: function() {
	
		$('.dir-btn').hide();
	
		app.curFunction = 'startTask';
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			e.preventDefault();
			app.navigate('tasks.html', 'loadTasks');
		});	
		
		$('.confirmTasks').show();
		
		$('.detailed-content').hide();
		$('.started-content').fadeIn();

		$('.captured-image').attr('src', '').hide();

		var i = 0;
		
		if (app.finishedTask) {
			
			$('.started-content').find('a').each(function() {
				if ($(this).attr('rel') == app.finishedTask) {
					$(this).css('color', 'green').addClass('done').find('.arrow-icon').hide();
				}
				if ($(this).hasClass('done')) {
					i++;
				}
			});

		} else {
			$('.started-content').find('a').each(function() {
				
				if ($(this).hasClass('done')) {
					i++;
				}
			});
		}
		
		if (i == $('.started-content').find('a').length) {
			$('.confirmTasks').removeClass('disabled');
			$('.confirmTasks').unbind('click');
			$('.confirmTasks').click(function(e) {
				e.preventDefault();
				data = {};
				data.user = user.id;
				data.task = app.currentTask;
				
				$.get(app.serverUrl + '?action=finishTask', data, function(result) {
					if (result.success) {
						if(!user.bank || user.bank == 'null' || !user.mail || user.mail == 'null')
							navigator.notification.alert('Teil on sisestama pangakonto ja/või e-mail, sisestage mõlemad profiili alt', null, 'Teade!');
							user.done = parseInt(user.done) + 1;
							app.updateUser();
					
						app.navigate('home.html', 'loadHome');
					} else {
						alert('Midagi läks valesti serveris, proovi uuesti.');
					}
					//start auto tracking user :) muahaha..
					
				}, 'jsonp');

			});
		} else {
			$('.confirmTasks').addClass('disabled');
			$('.confirmTasks').unbind('click');
			$('.confirmTasks').click(function(e) {
				navigator.notification.alert('Peate täitma kõik alamülesanded, et kinnitada see ülesanne');
			});
		}
		
		$('.started-content').find('a').unbind('click');
		$('.started-content').find('a').click(function(e) {
			if ($(this).hasClass('done')) {
				app.currentSub = parseInt($(this).attr('rel'));
				navigator.notification.confirm('Soovid kustutada eelmise vastuse ja uuesti täita ?', function(button) {
					//console.log('button + ' + button);
					if(button == 1 || button == 'undefined')
						app.navigate('sub.html', 'loadSub');
				}, 'Teade', 'Jah, Ei');
			} else {
				app.currentSub = parseInt($(this).attr('rel'));
				app.navigate('sub.html', 'loadSub');
			}
		});

		/*
		* update databases with started task stuff
		*/
	},
	
	loadSub: function() {
		app.curFunction = 'loadSub';
		$('.captured-image').hide();
		
		$('#subAnswer').val('');
		$('#rating').val('');
		
		$('.sub-content').find('.confirmTask').addClass('disabled');
		$('.sub-content').find('.postFB').addClass('disabled');
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			
			e.preventDefault();
			navigator.notification.confirm('Tagasi minnes kaotad siinse info, oled kindel?', function(button) {
				if(button == 1)
					app.navigate('task.html', 'startTask');
			}, 'Teade', 'Ok, Tühista');
			
		});	
		//$('.logged-in').find('h2').html(sub_tasks[app.currentSub].name);
		$('.sub-content').find('h3').html(sub_tasks[app.currentSub].name);
		
		$('.' + sub_tasks[app.currentSub].type).find('.tip').html(sub_tasks[app.currentSub].description);
		
		$('.sub-content').find('p').hide();
		
		$('.' + sub_tasks[app.currentSub].type).show();
		if (sub_tasks[app.currentSub].type == 'radio' || sub_tasks[app.currentSub].type == 'checkbox') {
			$('.multi').show();
		}
		
		$('.' + sub_tasks[app.currentSub].type).find('.doPic').unbind('click');
		$('.' + sub_tasks[app.currentSub].type).find('.doPic').click(function(e) {
			e.preventDefault();
			captureImage();
		});
		$('.' + sub_tasks[app.currentSub].type).find('.postFB').unbind('click');
		$('.' + sub_tasks[app.currentSub].type).find('.postFB').click(function(e) {
			e.preventDefault();
			uploadFile(app.imageURI);
		});
		
		
		//tracking
		
		setTimeout(function() {
			var mapOptions = {
				zoom: 15,
				center: new google.maps.LatLng(app.position.coords.latitude, app.position.coords.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			var sub_map = new google.maps.Map(document.getElementById("sub_map"), mapOptions);
				
			locations = [];
			locations[0] = [sub_tasks[app.currentSub].name, sub_tasks[app.currentSub].lat, sub_tasks[app.currentSub].long, sub_tasks[app.currentSub].id];
				
			setMarkers(sub_map, locations);
		}, 200);
		
		
		//radios and checks
		
		if (sub_tasks[app.currentSub].type == 'radio' || sub_tasks[app.currentSub].type == 'checkbox') {
			$('.options').html('');
			//console.log('OK!!');
			$.each(sub_tasks[app.currentSub].options, function(i, option){
				//console.log('option'); 
				$('.options').append('<input type="' + sub_tasks[app.currentSub].type + '" name="' + sub_tasks[app.currentSub].id + '" value="' + option + '" /> <span>' + option + '</span><br />');
			});
		}
		
		$('.sub-content').find('.confirmTask').unbind('click');
		
		app.updateTask(sub_tasks[app.currentSub].type);
	},
	
	updateTask: function(type) {
	
		app.curFunction = 'updateTask';
	
		anotherCaller = false;
		
		data = {};
		data.task = app.currentTask;
		data.sub_task = app.currentSub;
		data.user = user.id;
		
		
		//update and do the task..
		switch(type) {
			case 'pic':
				anotherCaller = true;
				$('.sub-content').find('.confirmTask').click(function(e) {
					uploadFile(app.imageURI);
				});
				break;
			case 'pic_fb':
				data.answer = 'jpg';
				break;
			case 'question':
				$('#subAnswer').keyup(function() {
					if($('#subAnswer').val().length > 0) {
						$('.sub-content').find('.confirmTask').removeClass('disabled');
					} else {
						$('.sub-content').find('.confirmTask').addClass('disabled');
					}
				});
				
				break;
			case 'select':
				$('#rating').change(function() {
					if($('#rating').val() > 0) {
						$('.sub-content').find('.confirmTask').removeClass('disabled');
					} else {
						$('.sub-content').find('.confirmTask').addClass('disabled');
					}
				});
				
				break;
			case 'radio':
				$('.options').find('input').click(function() {
					$('.sub-content').find('.confirmTask').removeClass('disabled');
				});
				/*
				* just post answer
				*/
				break;
			case 'checkbox':
				$('.options').find('input').click(function() {
					if($('.options').find('input:checked').length)
						$('.sub-content').find('.confirmTask').removeClass('disabled');
					else
						$('.sub-content').find('.confirmTask').addClass('disabled');
				});
				/*
				* just post answer
				*/
				break; 
			case 'tracking':
				/*
				* TEST THIS STUFF!
				*/
				app.checkTracking();
				break;
		
		}

		if (!anotherCaller) {
			$('.sub-content').find('.confirmTask').click(function(e) {

				if (type == 'question') {
					data.answer = $('#subAnswer').val();
				} else if (type == 'select') {
					data.answer = $('#rating').val();
				} else if (type == 'radio') {
					data.answer = $('.options').find('input:checked').val();
				} else if (type == 'checkbox') {
					data.answer = '';
					$('.options').find('input:checked').each(function(i, value) {
						data.answer = data.answer + $(this).val() + ', ';
					});
				}
				
				if ($(this).hasClass('disabled')) {
					navigator.notification.alert('Täida ülesanne esmalt!', null, 'Teade!');
				} else {
					
					if (navigator.geolocation) {

						navigator.geolocation.getCurrentPosition(function(position) {

							app.position = position;
							data.lat = position.coords.latitude;
							data.lng = position.coords.longitude;
							
							app.sendAnswer(data);
						});
					}
				}
			});

		}

	},
	checkTracking: function() {
		//alert('checking..');
		app.curFunction = 'checkTracking';
		if (navigator.geolocation) {
			
			navigator.geolocation.getCurrentPosition(function(position) {
				//console.log(sub_tasks[app.currentSub]);
				app.position = position;
				app.updateUser();
				distance = distance(position.coords.latitude, sub_tasks[app.currentSub].lat, position.coords.longitude, sub_tasks[app.currentSub].long);
				console.log(distance);
				if (distance < 50) {
					alert('Asukohas!!!');
					$('.sub-content').find('.confirmTask').removeClass('disabled');
				} else {
					setTimeout(function() {
						app.checkTracking();
					}, 10000);
				}
				
			});
			
		}
			
	},
	
	sendAnswer: function(data) {
		app.curFunction = 'sendAnswer';
		$.get(app.serverUrl + '?action=doTask', data, function(result) {
			if (result.success) {
				app.finishedTask = data.sub_task;
				app.navigate('task.html', 'startTask');	
			} else {
				alert('Midagi läks valesti serveris, proovi uuesti.');
			}
			//start auto tracking user :) muahaha..
			
		}, 'jsonp');
		
	},
	
	trackUser: function() {
		//console.log('tracked!!');
		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(function(position) {	
				app.position = position;
				
				app.updateUser();
					
			});
		}
		
		setTimeout(function() {
			app.trackUser();
		}, 60000);
		
	},
	
	updateUser: function() {
		app.curFunction = 'updateUser';
		dbUser = {};
		dbUser = user;
		
		if(app.position.coords) {
			dbUser.latitude = app.position.coords.latitude;
			dbUser.longitude = app.position.coords.longitude;
		}
		
		$.get(app.serverUrl + '?action=updateUser', dbUser, function(result) {
			if (result.success) {
				db.transaction(updateUser, errorDB, function(){
					//console.log('User fully updated!');
				});
			} else {
				//console.log('Error updating user..');
			}
			//start auto tracking user :) muahaha..
			
		}, 'jsonp');
		
	},
	
	deliverError: function(msg, line) {

		error_data = {};
	   	error_data.function = app.curFunction;
	   	error_data.error = msg;
	   	error_data.file = 'scripts.js';
	   	error_data.line = line;
	   
	   	error_data.device_name = window.device.name;
	   	error_data.device_platform = window.device.platform;
	   	error_data.device_version = window.device.version;
	   
	   	error_data.data = {};
	   	error_data.data.data = data;
	   	error_data.data.user = user;
	   	
		$.get(app.serverUrl + '?action=reportAnError', error_data, function(result) {
	   		if(result.success)
	   			console.log('Error reported');
	   	}, 'jsonp');
		
	}

}

function distance(lat1, lat2, lon1, lon2) {
	
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = (R * c)/1000;
	
}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

function postToFacebook(image_id, name, description) {
	
	// Define our message!
	var msg = name;

	// Define the part of the Graph you want to use.
	var _fbType = 'feed';

	// This example will post to a users wall with an image, link, description, text, caption and name.
	// You can change

	var params = {};
		params['message'] = 'Lahendasin just ülesande!';
		params['name'] = 'SmartTasker';
		params['description'] = description;
		params['_link'] = "http://www.smarttasker.ee";
		params['picture'] = "http://projects.efley.ee/smarttasker/pictures/" + image_id + ".jpg";
		params['caption'] = name;

		console.log(params);

	// When you're ready send you request off to be processed!
	Facebook.post(_fbType,params);	
}

function onOffline() {
    navigator.notification.alert('Edasi minekuks pead olema online', null, 'Teade!');
    app.navigate('home.html');
}

function successHandler() {
	//console.log('GA success');
}

function errorHandler(e) {
	//console.log('E: ' + e);
}

//Google maps stuff
function setMarkers(map, locations) {
	//console.log(locations);
	for (var i = 0; i < locations.length; i++) {
		var location = locations[i];
		var myLatLng = new google.maps.LatLng(location[1], location[2]);
	
		var marker = new google.maps.Marker({
	   		position: myLatLng,
	    	map: map,
	    	title: location[0],
	    	id: location[3],
	    	zIndex: location[5]
		});
		if(location[4] == 'tasks') {
			google.maps.event.addListener(marker, 'click', function() {
				app.currentTask = location[3];
				app.navigate('task.html', 'loadTask');
			});
		}
		
	}
  
}

// Called when capture operation is finished
//
function captureSuccess(imageURI) {
	
	sub_task = app.currentSub;
	
	if (imageURI != null) {
		app.imageURI = imageURI;
		$('.captured-image').attr('src', imageURI).show();
		if (sub_tasks[sub_task].type == 'pic_fb') 
			$('.sub-content').find('.postFB').removeClass('disabled');
		else
			$('.sub-content').find('.confirmTask').removeClass('disabled');
    }
}

// Called if something bad happens.
// 
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error;
    navigator.notification.alert(msg, null, 'Uh oh!');
}

// A button will call this function
function captureImage() {
	navigator.camera.getPicture(captureSuccess, captureError, {
		quality : 50, 
		destinationType: destinationType.FILE_URI,
		targetWidth: 1280,
			targetHeight: 960
	});
}

// Upload files to server
function uploadFile(mediaFile) {
	
	$('.pic_fb').append('<img src="assets/ajax-loader.gif" class="ajax-loader" style="position:absolute;top:100px;left:45%;" />');
	$('.pic').append('<img src="assets/ajax-loader.gif" class="ajax-loader" style="position:absolute;top:100px;left:45%;" />');
		
	u_user = user.id;
	u_task = app.currentTask;
	u_sub_task = app.currentSub;

	var options = new FileUploadOptions();
	options.fileKey="file";
	options.fileName=mediaFile.substr(mediaFile.lastIndexOf('/')+1);
	options.mimeType="image/jpeg";
	options.chunkedMode = false;

    var ft = new FileTransfer(),
    path = mediaFile;
    
    if (navigator.geolocation) {

		navigator.geolocation.getCurrentPosition(function(position) {

			app.position = position;
    
		    upload_url = app.serverUrl + "?action=uploadPhoto&callback=123&user=" + u_user + "&task=" + u_task + "&sub_task=" + u_sub_task + "&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude;
		    //console.log(path);
		    console.log(upload_url);
		    
		    try {
		
			    ft.upload(path, upload_url,
			        function(result) {
			        	//console.log(result.response);
						if (parseInt(result.response)) {
						
							$('.pic_fb').find('.ajax-loader').remove();
							$('.pic').find('.ajax-loader').remove();
							
							if (sub_tasks[sub_task].type == 'pic_fb') {
								console.log('what');
								console.log(task);
								console.log(result.response);
								postToFacebook(parseInt(result.response), task.name, sub_tasks[app.currentSub].description);
								$('.sub-content').find('.confirmTask').removeClass('disabled');
							} else {
								app.finishedTask = u_sub_task;
								app.navigate('task.html', 'startTask');
							}
							
						} else {
							
							$('.pic_fb').find('.ajax-loader').remove();
							$('.pic').find('.ajax-loader').remove();
		
							navigator.notification.alert('Serveri poolne viga!', null, 'Teade!');
							app.deliverError(result.response, '1118');
						}
						
			        },
			        function(error) {
			        	navigator.notification.alert('Error uploading file ' + path + ': ' + error.code, null, 'Uh oh!');
			            //console.log('Error uploading file ' + path + ': ' + error.code);
			        }, options
				);
			} catch(e) {
				alert(e);
			}  
		});
	} 
}

function uploadFile2(mediaFile, user, task, sub_task) {
	$.get(app.serverUrl + "?action=uploadPhoto&callback=123&user=" + user + "&task=" + task + "&sub_task=" + sub_task, {}, function(result) {
		//$('.sub-content').find('.confirmTask').removeClass('disabled');
		
		response = $.parseJSON(result);
		
			if (response.success == true) {
		
				if (sub_tasks[sub_task].type == 'pic_fb') {
					postToFacebook(response.id, task.name, sub_tasks[app.currentSub].description);
					$('.sub-content').find('.confirmTask').removeClass('disabled');
				} else {
					app.finishedTask = sub_task;
					app.navigate('task.html', 'startTask');
				}
				
			} else {
				navigator.notification.alert('Serveri poolne viga!', null, 'Teade!');
			}
	});
}