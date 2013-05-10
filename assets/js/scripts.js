var app = {};
var stats = {};
var user = {};
var task = {};
var sub_tasks = {};
var homeLoaded = false;
var timer1 = {};
var db = {};
var data = {};
var trackingTimer;
var lang = 'et';

var translations = [];
translations.et = [];

translations.et['mainmenu'] = 'Menüü';
translations.et['facebook_login']   = 'Facebook login';
translations.et['or_login_company']  = 'Logi sisse firma alt';
translations.et['remember_me']  = 'Jäta mind meelde';
translations.et['login']  = 'Logi sisse';
translations.et['private_tasks']  = 'Kohustuslikud ülesanded';
translations.et['public_tasks']  = 'Täida ülesanne';
translations.et['unfinished_tasks']  = 'Lõpetamata ülesanded';
translations.et['rejected_tasks']  = 'Tagasi lükatud ülesanded';
translations.et['stats']  = 'Statistika';
translations.et['won_prizes']  = 'Võidetud auhinnad';
translations.et['profile']  = 'Profiil';
translations.et['tasks']  = 'Ülesanded';
translations.et['tasks_accepted']  = 'Vastu võetud ülesandeid:';
translations.et['tasks_done']  = 'Täidetud ülesandeid:';
translations.et['tasks_rejected']  = 'Tagasi lükatud ülesandeid:';
translations.et['money_won']  = 'Teenitud raha:';
translations.et['prizes_won']  = 'Võidetud auhindu:';
translations.et['no_prizes_yet']  = 'Auhinnad puuduvad';
translations.et['change_your_data']  = 'Sinu andmed';
translations.et['firstname']  = 'Eesnimi';
translations.et['lastname']  = 'Perekonnanimi';
translations.et['account_nr']  = 'Pangakonto number';
translations.et['mail']  = 'E-mail';
translations.et['password']  = 'Parool';
translations.et['sex']  = 'Sugu';
translations.et['male']  = 'Mees';
translations.et['female']  = 'Naine';
translations.et['save']  = 'Salvesta';
translations.et['prize']  = 'Auhind';
translations.et['prizes']  = 'Auhinnad';
translations.et['deadline'] = 'Tähtaeg: ';
translations.et['distance'] = 'Kaugus: ';
translations.et['start_task']  = 'Alusta ülesannet';
translations.et['confirm']  = 'Kinnita';
translations.et['task_description']  = 'Ülesande kirjeldus';
translations.et['take_a_pic']  = 'Tee pilt';
translations.et['post_to_facebook']  = 'Postita pilt Facebooki';
translations.et['choose']  = 'Vali';
translations.et['comment']  = 'Kommentaar';
translations.et['have_to_be_distance']  = 'Pead olema 50m raadiuses, hetkel: ';
translations.et['start_task_again']  = 'Alusta ülesannet uuesti';
translations.et['continue_task']  = 'Jätka ülesannet';
translations.et['start_task']  = 'Alusta ülesannet';
translations.et['error_on_server']  = 'Serveri viga, palun proovi uuesti.';
translations.et['no_tasks']  = 'Ülesanded puuduvad';
translations.et['insert_account'] = 'Sul puudub pangakonto number või e-mail, sisesta need profiili alt';
translations.et['no_location_rights'] = 'Pead lubama rakendusel asukohta lugeda!';

translations.et['cancel_last_and_start_over'] = 'Oled kindel, et soovid uuesti alustada?';
translations.et['going_back_deletes'] = 'Tagasi minnes kaotad kogu siinse info.';
translations.et['message'] = 'Teada';
translations.et['cancel'] = 'Tühista';

translations.en = [];
translations.en['mainmenu']  = 'Menu';
translations.en['facebook_login']  = 'Facebook login';
translations.en['or_login_company']  = 'Login as company';
translations.en['remember_me']  = 'Remember me';
translations.en['login']  = 'Log in';
translations.en['private_tasks']  = 'Mandatory tasks';
translations.en['public_tasks']  = 'Fill a task';
translations.en['unfinished_tasks']  = 'Unfinished tasks';
translations.en['rejected_tasks']  = 'Rejected tasks';
translations.en['stats']  = 'Statistics';
translations.en['won_prizes']  = 'Prizes won';
translations.en['profile']  = 'Profile';
translations.en['tasks']  = 'Tasks';
translations.en['tasks_accepted']  = 'Tasks accepted:';
translations.en['tasks_done']  = 'Tasks completed:';
translations.en['tasks_rejected']  = 'Tasks rejected:';
translations.en['money_won']  = 'Earnings:';
translations.en['prizes_won']  = 'Prizes won:';
translations.en['no_prizes_yet']  = 'No prizes yet';
translations.en['change_your_data']  = 'Your data';
translations.en['firstname']  = 'Name';
translations.en['lastname']  = 'Surname';
translations.en['account_nr']  = 'Bank account number';
translations.en['mail']  = 'E-mail';
translations.en['password']  = 'Password';
translations.en['sex']  = 'Sex';
translations.en['male']  = 'Male';
translations.en['female']  = 'Female';
translations.en['save']  = 'Save';
translations.en['prize']  = 'Prize';
translations.en['prizes']  = 'Prizes';
translations.en['deadline']  = 'Deadline: ';
translations.en['distance']  = 'Distance: ';
translations.en['start_task']  = 'Start a task';
translations.en['confirm']  = 'Confirm';
translations.en['task_description']  = 'Task description';
translations.en['take_a_pic']  = 'Take a picture';
translations.en['post_to_facebook']  = 'Post to Facebook';
translations.en['choose']  = 'Choose';
translations.en['comment']  = 'Comment';
translations.en['have_to_be_distance']  = 'You have to be in 50m radius, currently: ';
translations.en['start_task_again']  = 'Restart a task';
translations.en['continue_task']  = 'Continue';
translations.en['start_task']  = 'Start a task';
translations.en['error_on_server']  = 'Server error, please try again.';
translations.en['no_tasks']  = 'No tasks';
translations.en['insert_account'] = 'You are missing bank account/e-mail, please insert them under profile';
translations.en['no_location_rights'] = 'You must allow application to read your location!';

translations.en['cancel_last_and_start_over'] = 'Are you sure that you want to start over again?';
translations.en['going_back_deletes'] = 'Going back deletes current info';
translations.en['message'] = 'Notification';
translations.en['cancel'] = 'Cancel';

translations.ru = [];
translations.ru['mainmenu']  = 'Менью';
translations.ru['facebook_login']  = 'Логин  в Facebook';
translations.ru['or_login_company']  = 'Зайти черз фирму';
translations.ru['remember_me']  = 'Запомнить';
translations.ru['login']  = 'Войдите';
translations.ru['private_tasks']  = 'Обязанности';
translations.ru['public_tasks']  = 'Выполнить задание';
translations.ru['unfinished_tasks']  = 'Незавершенные задачи';
translations.ru['rejected_tasks']  = 'Перенесённые задания';
translations.ru['stats']  = 'Статистика';
translations.ru['won_prizes']  = 'Награда';
translations.ru['profile']  = 'Профиил';
translations.ru['tasks']  = 'Задания';
translations.ru['tasks_accepted']  = 'Взятые задания:';
translations.ru['tasks_done']  = 'Выполненные задания:';
translations.ru['tasks_rejected']  = 'Отсроченые задания:';
translations.ru['money_won']  = 'Заработаннõе  деньги:';
translations.ru['prizes_won']  = 'Награда:';
translations.ru['no_prizes_yet']  = 'Награды отсутствуют';
translations.ru['change_your_data']  = 'Твои данные';
translations.ru['firstname']  = 'Имя';
translations.ru['lastname']  = 'Фамилия';
translations.ru['account_nr']  = 'Банковский счёт';
translations.ru['mail']  = 'Электронная почта';
translations.ru['password']  = 'Пароль';
translations.ru['sex']  = 'Пол';
translations.ru['male']  = 'Мужчина';
translations.ru['female']  = 'Женщина';
translations.ru['save']  = 'Сохрани';
translations.ru['prize']  = 'Награда';
translations.ru['prizes']  = 'Награды';
translations.ru['deadline']  = 'Срок: ';
translations.ru['distance']  = 'Pасстояние: ';
translations.ru['start_task']  = 'Начать выполнять задание';
translations.ru['confirm']  = 'Сохрани';
translations.ru['task_description']  = 'Описание задания';
translations.ru['take_a_pic']  = 'Сделать фотографию';
translations.ru['post_to_facebook']  = 'Загрузи фотографию в Facebook';
translations.ru['choose']  = 'Выбери';
translations.ru['comment']  = 'Комментарий';
translations.ru['have_to_be_distance']  = 'Должен находится в радиусе 50 м: ';
translations.ru['start_task_again']  = 'Начат задание заново';
translations.ru['continue_task']  = 'Продолжить выполнение задания';
translations.ru['start_task']  = 'Начат задание';
translations.ru['error_on_server']  = 'Ошибка сервера, пожалуйста попробуй ещё раз.';
translations.ru['no_tasks']  = 'Задания отсутствуют';
translations.ru['insert_account'] = 'У вас не хватает банковского счета/электронной почты, пожалуйста, введите их в профиле';
translations.ru['no_location_rights'] = 'Вы должны разрешить приложению читать ваше местоположение';

translations.ru['cancel_last_and_start_over'] = 'Вы уверены, что хотите начать заново?';
translations.ru['going_back_deletes'] = 'Возвращаясь удаляет текущую информацию';
translations.ru['message'] = 'Уведомление';
translations.ru['cancel'] = 'Отменить';

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
	   
	   	$.get(app.serverUrl + '?action=reportAnError', error_data, function(result) {}, 'jsonp');
	}
}

app = {

	navigated: false,
	profileToLoad: false,
	position: {},
	//serverUrl: 'http://projects.efley.ee/smarttasker/server.php',
	serverUrl: 'http://www.smarttasker.com/app/server.php',
	curFunction: 'init',
	mapView: false, 
	isOneAnswer: false,
	isContinues: false,
	
	init: function() {
		localStorage.removeItem('cdv_fb_session');
		//alert('without FB');
		//console.log(FB);
		$('#login').append('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
		setTimeout(function() {
			$('#login').remove('.ajax-loader');
			//alert('INITING FB');
			try {
				FB.init({ appId: "405225646214042", nativeInterface: CDV.FB, useCachedDialogs: false });
			} catch (e) {
				app.deliverError(e, '216');
			}
			
		}, 1500);
	
		if (localStorage.getItem('lang')) {
			lang = localStorage.getItem('lang');
			$('.' + lang + '-flag').addClass('active');
		}
	
		app.translateApp();

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
		$('.flag').unbind('click');
		$('.flag').click(function(e) {
			e.preventDefault();
			$('.flag').removeClass('active');
			$(this).addClass('active');
			lang = $(this).attr('rel');
			localStorage.setItem('lang', lang);
			app.translateApp();
		});
		
	},
	
	translateApp: function() {
		$('.translate').each(function(i, item) {
			if ($(this).hasClass('placeholder')) {
				$(this).attr('placeholder', translations[lang][$(this).data('keyword')]);
			} else if ($(this).hasClass('value')) {
				$(this).val(translations[lang][$(this).data('keyword')]);
			} else {
				$(this).html(translations[lang][$(this).data('keyword')]);
			}
		});	
	},
	
	navigate: function(page, init_function) {
		app.curFunction = 'navigate';
		
		$('.not-logged-in').removeClass('not-logged-in').addClass('logged-in');
		$('.logged-in').find('h2').show();
		
		switch(page) {
			case 'home.html':
				$('.logged-in').attr('id', 'mainPage');
				$('.logged-in').find('h2').html(translations[lang]['mainmenu']);
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
		try {
			$("#login").click(function(e) {
				e.preventDefault();
				FB.getLoginStatus(function(response) {
					app.curFunction = 'FBLOGINSTATUS';
					if (response.status == 'connected') {
						app.getFacebookMe();
					} else {
						app.authFacebook();
					}
				});
			});
		} catch(e) {
			app.deliverError(e, '216');
		}

		$('#loginBtn').click(function(e) {
			//console.log('wdf');
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
	
	authFacebook: function() {
		app.curFunction = 'AUTHFB';
		FB.login(
			function(response) {
				//console.log(response);
				data = response;
				if (response.session) {
					app.getFacebookMe();
				} else {
					app.getFacebookMe();
				}
			},
			{ scope: "email" }
		);
			
	},
	
	getFacebookMe: function() {
		app.curFunction = 'facebookMe';
		
		FB.api('/me', { },  function(response) {
			if (response.error) {
				//alert(JSON.stringify(response.error));
				app.authFacebook();
			} else {
				console.log(response);
				data.fb_id = response.id;
				data.firstname = response.first_name;
				data.lastname = response.last_name;
				data.sex = response.gender;
				data.mail = '';
				app.doLogin(data.fb_id, data);
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
	
		$('.logged-in').find('h2').html(translations[lang]['mainmenu']);
		
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
			user.rejected = result.rejected;

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
		$('.refresh-btn').hide();
		
		app.curFunction = 'loadCustom';
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			e.preventDefault();
			app.navigate('home.html', 'loadHome');
		});
		if (app.tasksType == 'getStats') {
			$('.logged-in').find('h2').html(translations[lang]['stats']);
			$('.statistics-content').show();
			$('#stats_accepted').html(user.accepted);
			$('#stats_done').html(user.done);
			$('#stats_rejected').html(user.rejected);
			//alert('wdf');
			$('#stats_money').html(user.money + '€');
			$('#stats_prizes').html(user.prizes_new);
		} else if (app.tasksType == 'getPrizes') {
			$('.logged-in').find('h2').html(translations[lang]['prizes']);
			$('.prizes-content').html('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
			$('.prizes-content').show();
			data = {};
			data.user = user.id;
			$.get(app.serverUrl + '?action=getUserPrizes', data, function(result) {
				$('.prizes-content').html('');
				if(result.length) {
					$.each(result, function(i, item) {
						template = $('.prizes-prize-template');
						template.find('.prize-thumb').attr('src', 'http://www.smarttasker.com/admin/gift_pics/' + item.id + '.jpg');
						template.find('.task-name').html(item.name);
						template.find('.distance-name').html(item.distance_name);
						template.find('.distance-value').html(item.distance_value);
						
						template.find('.deadline-name').html(item.deadline_name);
						template.find('.time-left').html(item.time_left);
						
						$('.prizes-content').prepend(template.html());
						
					});
				} else {
					$('.prizes-content').html('<h3>' + translations[lang]['no_prizes_yet'] + '</h3>');
				}
			
			}, 'jsonp');
			
		} else if (app.tasksType == 'getProfile') {
			$('.logged-in').find('h2').html(translations[lang]['profile']);
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
	
		has_map = false;
	
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
		$('.logged-in').find('h2').html(translations[lang]['tasks']);
		
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
				data.lang = lang;
				
				$.get(app.serverUrl + '?action=getTasks', data, function(results) {
					if(results.length) {
					$('.tasklist-content').html('<div id="tasksMap"></div>');

						$('.map-btn').show();
						
						locations = [];
						
						var latlngbounds = new google.maps.LatLngBounds();

						j = 0;
						$.each(results, function(i, item) {
							if(item.address) {
								has_map = true;
								locations[j] = [item.name, item.latitude, item.longitude, item.id, 'tasks', i];
								var n = new google.maps.LatLng(item.latitude, item.longitude);
								latlngbounds.extend(n);
								j++;
							}

							template = $('.tasklist').find('.task-prize-template');
							if (item.user_task_id) {
								template.find('a').attr('rel', item.user_task_id);
								template.find('a').addClass('continues');
								template.find('a').attr('data-task', item.id);
								console.log(template.find('a').data('task'));
							} else {
								template.find('a').attr('rel', item.id);
								template.find('a').attr('data-task', item.id);
								console.log(template.find('a').data('task'));
								template.find('a').removeClass('continues');
							}
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
								if(item.is_public && item.is_public != '0' && item.prize_sum != '0') {
									$('.tasklist-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">' + item.prize_sum + '€</strong>');
								} else {
									$('.tasklist-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">&nbsp;</strong>');
								}
							} else {
								$('.tasklist-content').find('.prize-wrap:last').html('<span class="label">' + translations[lang]['prize'] + '</span><img class="prize-thumb" src="http://www.smarttasker.com/admin/gift_pics/' + item.id + '.jpg" width="25" height="25">');
							}
						});
						
						if (has_map)
							$('.map-btn').show();
						else
							$('.map-btn').hide();
						
						$('.map-btn').unbind('click');
						$('.map-btn').click(function() {
							//console.log(locations);
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
						$('.tasklist-content').html('<h3>' + translations[lang]['no_tasks'] + '</h3>');
					}
					
					$('.tasklist-content').find('a').click(function(e) {
						//console.log($(this).data('task'));
						app.currentTask = $(this).data('task');
						if ($(this).hasClass('continues')) {
							app.isContinues = $(this).attr('rel');
						} else {
							app.isContinues = false;
						}
						
						e.preventDefault();
						app.navigate('task.html', 'loadTask');
					});
				
				}, 'jsonp');
				
			}, function(error) {
				alert(translations[lang]['no_location_rights']);
			});
		}
		

	},
	
	loadTask: function() {
	
		$('.map-btn').hide();
		$('.list-btn').hide();
	
		app.finishedTask = false;
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
		data.continues = app.isContinues;
		
		$.get(app.serverUrl + '?action=getTask', data, function(item) {
			
			task = item;
			
			$('.detailed-content').html('');
			$('.started-content').html('<h3>'+translations[lang]['no_tasks']+'</h3>');
			
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
				if(item.is_public && item.is_public != '0' && item.prize_sum != '0') {
					$('.detailed-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">' + item.prize_sum + '€</strong>');
				} else {
					$('.detailed-content').find('.prize-wrap:last').html('<strong style="font-size:20px;">&nbsp;</strong>');
				}
			} else {
				$('.detailed-content').find('.prize-wrap:last').html('<span class="label">'+translations[lang]['prize']+'</span><img class="prize-thumb" src="http://www.smarttasker.com/admin/gift_pics/' + item.id + '.jpg" width="43" height="43">');
			}
			
			if(item.subs.length) {
				$('.started-content').html('');
				$.each(item.subs, function(i, sub) {
					sub_tasks[sub.id] = sub;

					$('.list').append('<li>' + sub.name + '</li>');
					sub_template = $('.detailed-task').find('.sub-task-template');
					sub_template.find('.task-name').html(sub.name);
					sub_template.find('a').attr('rel', sub.id);
					
					console.log(sub.answer);
					
					
					
					if(sub.answer && sub.answer != '' && sub.answer != 'false') 
						sub_template.find('a').css('color', 'green').addClass('done').find('.arrow-icon').hide();
					else
						sub_template.find('a').css('color', '#888').removeClass('done').find('.arrow-icon').show();
						
					
					console.log(sub_template);
					
					$('.started-content').append(sub_template.html());

				});
			}
			
			$('.detailed-content').show();
			$('.started-content').hide();
			data = {};
			data.user = user.id;
			data.task = item.id;
			
			if (item.status && item.status != false) {
				app.user_task_id = item.user_task_id;
				if (item.status == 'rejected') 
					$('.startTask:first').html(translations[lang]['start_task_again']);
				else
					$('.startTask:first').html(translations[lang]['continue_task']);
				$('.startTask:first').click(function() {
					//app.startTask();
					if (item.subs.length > 1) {
						app.startTask();
						app.isOneAnswer = false;
					} else {
						app.isOneAnswer = true;
						app.currentSub = item.subs[0].id;
						app.navigate('sub.html', 'loadSub');
					}
				});
			} else {
				$('.startTask:first').html(translations[lang]['start_task']);
				$('.startTask:first').click(function() {
					
					$.get(app.serverUrl + '?action=startTask', data, function(result) {
						if (result.success) {
							app.user_task_id = result.success;
							if (item.subs.length > 1) {
								app.startTask();
								app.isOneAnswer = false;
							} else {
								app.isOneAnswer = true;
								app.currentSub = item.subs[0].id;
								app.navigate('sub.html', 'loadSub');
							}
						
							
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
					
					var mapOptions = {
						zoom: 15,
						center: new google.maps.LatLng(item.latitude, item.longitude),
						mapTypeId: google.maps.MapTypeId.ROADMAP
					}
					var map = new google.maps.Map(document.getElementById("taskMap"), mapOptions);
					directionsDisplay.setMap(map);

					locations = [];
					waypoints = [];
					//console.log(item.is_tracking);
					if(item.is_tracking && item.is_tracking != '0') {
						$.each(item.subs, function(i, sub){
							//console.log(sub);
							locations[i] = [sub.name, sub.lat, sub.long, sub.id];
							mark = new google.maps.LatLng(sub.lat, sub.long);
							waypoints[i] = {location: mark, stopover: false};
							latlngbounds.extend(mark);
						});
					} else {
						locations[0] = [item.name, item.latitude, item.longitude, item.id];
						latlngbounds.extend(destination);
					}
					//console.log(locations);
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
					
					setMarkers(map, locations);
					$('.dir-btn').click(function() {
					if(item.is_tracking) {
						var request = {
						    origin:currentLoc,
						    destination:destination,
						    waypoints:waypoints,
						    optimizeWaypoints: true,
						    travelMode: google.maps.TravelMode.DRIVING
					    };
					} else {
						var request = {
						    origin:currentLoc,
						    destination:destination,
						    travelMode: google.maps.TravelMode.DRIVING
						};
					}
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
		$('.logged-in').find('h2').html(translations[lang]['task']);
			
	},
	
	startTask: function() {
		
		$('.dir-btn').hide();
		
		$('.ajax-loader').remove();
		$('.confirmTasks').show();
	
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
		
		$('#picAnswer').val('');

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
			//$('.started-content').html('<img src="assets/ajax-loader.gif" class="ajax-loader" style="margin-top:60px;" />');
			//$('.confirmTasks').hide();
			$('.confirmTasks').removeClass('disabled');
			$('.confirmTasks').unbind('click');
			$('.confirmTasks').click(function(e) {
				e.preventDefault();
				data = {};
				data.user = user.id;
				data.task = app.currentTask;
				data.user_task_id = app.user_task_id;
				$.get(app.serverUrl + '?action=finishTask', data, function(result) {
					if (result.success) {
						$('.started-content').find('.ajax-loader').remove();
						$('.confirmTasks').show();
						if(!user.bank || user.bank == 'null' || !user.mail || user.mail == 'null')
							navigator.notification.alert('Teil on sisestama pangakonto ja/või e-mail, sisestage mõlemad profiili alt', null, 'Teade!');
							user.done = parseInt(user.done) + 1;
							app.updateUser();
					
						app.navigate('home.html', 'loadHome');
					} else {
						alert(translations[lang]['error_on_server']);
					}
					//start auto tracking user :) muahaha..
					
				}, 'jsonp');

			});
		} else {
			$('.confirmTasks').addClass('disabled');
			$('.confirmTasks').unbind('click');
			$('.confirmTasks').click(function(e) {
				navigator.notification.alert(translations[lang]['complete_tasks']);
			});
		}
		
		$('.started-content').find('a').unbind('click');
		$('.started-content').find('a').click(function(e) {
			if ($(this).hasClass('done')) {
				app.currentSub = parseInt($(this).attr('rel'));
				navigator.notification.confirm(translations[lang]['cancel_last_and_start_over'], function(button) {
					//console.log('button + ' + button);
					if(button == 1 || button == 'undefined')
						app.navigate('sub.html', 'loadSub');
				}, translations[lang]['message'], 'Ok, ' + translations[lang]['cancel']);
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
	
		if (trackingTimer)
			clearTimeout(trackingTimer);
	
		app.curFunction = 'loadSub';
		$('.captured-image').hide();
		
		$('#subAnswer').val('');
		$('#rating').val('');
		
		$('.sub-content').find('.confirmTask').addClass('disabled');
		$('.sub-content').find('.postFB').addClass('disabled');
		
		$('.back-btn').unbind('click');
		$('.back-btn').click(function(e) {
			
			e.preventDefault();
			navigator.notification.confirm(translations[lang]['going_back_deletes'], function(button) {
				button = 1;
				if(button == 1)
					app.navigate('task.html', 'startTask');
			}, translations[lang]['message'], 'Ok, ' + translations[lang]['cancel']);
			
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
			$('.' + sub_tasks[app.currentSub].type).find('.postFB').unbind('click');
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
					e.preventDefault();
					uploadFile(app.imageURI);
					$('.sub-content').find('.confirmTask').unbind('click');
				});
				break;
			case 'pic_fb':
				anotherCaller = true;
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
				} else {
					data.answer = 'jah';
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
				app.position = position;
				app.updateUser();
				var dist = distance(position.coords.latitude, sub_tasks[app.currentSub].lat, position.coords.longitude, sub_tasks[app.currentSub].long);
				$('#current_distance').html(dist);
				if (dist < 50) {
					$('.sub-content').find('.confirmTask').removeClass('disabled');
				} else {
					trackingTimer = setTimeout(function() {
						app.checkTracking();
					}, 10000);
				}
				
			});
			
		}
			
	},
	
	sendAnswer: function(data) {
		app.curFunction = 'sendAnswer';
		data.user_task_id = app.user_task_id;
		$.get(app.serverUrl + '?action=doTask', data, function(result) {
			if (result.success) {
				if (app.isOneAnswer) {
					$.get(app.serverUrl + '?action=finishTask', data, function(result) {
						if (result.success) {
							if(!user.bank || user.bank == 'null' || !user.mail || user.mail == 'null')
								navigator.notification.alert(translations[lang]['insert_account'], null, 'Teade!');
								user.done = parseInt(user.done) + 1;
								app.updateUser();
						
							app.navigate('home.html', 'loadHome');
							$('.confirmTasks').show();
						} else {
							alert('Midagi läks valesti serveris, proovi uuesti.');
						}
						//start auto tracking user :) muahaha..
						
					}, 'jsonp');
				} 
				app.finishedTask = data.sub_task;
				app.navigate('task.html', 'startTask');
			}
		}, 'jsonp');
		/*
		$.get(app.serverUrl + '?action=doTask', data, function(result) {
			if (result.success) {
				app.finishedTask = data.sub_task;
				app.navigate('task.html', 'startTask');	
			} else {
				alert('Midagi läks valesti serveris, proovi uuesti.');
			}
			//start auto tracking user :) muahaha..
			
		}, 'jsonp');
		*/
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
	   	
		$.get(app.serverUrl + '?action=reportAnError', error_data, function(result) {}, 'jsonp');
		
	}

}

function distance(lat1, lat2, lon1, lon2) {
	
	lat1 = parseFloat(lat1);
	lat2 = parseFloat(lat2);
	lon1 = parseFloat(lon1);
	lon2 = parseFloat(lon2);
	
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	lat1 = lat1.toRad();
	lat2 = lat2.toRad();
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = (R * c)*1000;
	
	return Math.round(d);
	
}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
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
	for (var i = 0; i < locations.length; i++) {
		var location = locations[i];
		setMarker(map, location);
	}
}
function setMarker(map, location) {
	
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
			//console.log('marker: ' + location[3]);
			app.currentTask = location[3];
			app.navigate('task.html', 'loadTask');
		});
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
		quality : 70, 
		destinationType: destinationType.FILE_URI,
		targetWidth: 1280,
		targetHeight: 960
	});
}

// Upload files to server
function uploadFile(mediaFile) {
	
	$('.sub-content').append('<img src="assets/ajax-loader.gif" class="ajax-loader" style="position:absolute;top:100px;left:45%;" />');
	$('.confirmTasks').hide();
	
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
			pic_answer = encodeURIComponent($('#picAnswer').val());
			//data.user_task_id = app.user_task_id;
		    upload_url = app.serverUrl + "?action=uploadPhoto&callback=123&user=" + u_user + "&task=" + u_task + "&sub_task=" + u_sub_task + "&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&answer=" + pic_answer + "&user_task_id=" + app.user_task_id
		    //console.log(path);
		    //console.log(upload_url);
		    
		    try {
		
			    ft.upload(path, upload_url,
			        function(result) {
			        	//console.log(result.response);
						if (parseInt(result.response)) {
						
							$('.sub-content').find('.ajax-loader').remove();
							$('.confirmTasks').show();
							
							if (sub_tasks[sub_task].type == 'pic_fb') {
								//postToFacebook(parseInt(result.response), task.name, sub_tasks[app.currentSub].description, u_sub_task);
								
								var params = {
								    method: 'feed',
								    name: 'SmartTasker',
								    link: 'http://www.smarttasker.ee',
								    picture: "http://www.smarttasker.com/app/pictures/" + parseInt(result.response) + ".jpg",
								    caption: task.name,
								    message: 'Lahendasin just ülesande!',
								    description: sub_tasks[app.currentSub].description
								};
								//console.log(params);
							    FB.ui(params, function(obj) { 
							    
							    	//console.log(obj);
							    	$('.sub-content').find('.confirmTask').removeClass('disabled');
									$('.sub-content').find('.confirmTask').unbind('click');
									$('.sub-content').find('.confirmTask').click(function() {
										if (app.isOneAnswer) {
											$.get(app.serverUrl + '?action=finishTask', data, function(result) {
												if (result.success) {
													if(!user.bank || user.bank == 'null' || !user.mail || user.mail == 'null')
														navigator.notification.alert(translations[lang]['insert_account'], null, 'Teade!');
														user.done = parseInt(user.done) + 1;
														app.updateUser();
												
													app.navigate('home.html', 'loadHome');
													$('.confirmTasks').show();
												} else {
													alert('Midagi läks valesti serveris, proovi uuesti.');
												}
												//start auto tracking user :) muahaha..
												
											}, 'jsonp');
										} 
										app.finishedTask = u_sub_task;
										app.navigate('task.html', 'startTask');
									});
							    });
								
								
							} else {
								if (app.isOneAnswer) {
									$.get(app.serverUrl + '?action=finishTask', data, function(result) {
										if (result.success) {
											if(!user.bank || user.bank == 'null' || !user.mail || user.mail == 'null')
												navigator.notification.alert(translations[lang]['insert_account'], null, 'Teade!');
												user.done = parseInt(user.done) + 1;
												app.updateUser();
										
											app.navigate('home.html', 'loadHome');
										} else {
											alert('Midagi läks valesti serveris, proovi uuesti.');
										}
										//start auto tracking user :) muahaha..
										
									}, 'jsonp');
								} 
								app.finishedTask = u_sub_task;
								app.navigate('task.html', 'startTask');
							}
							
						} else {
							
							$('.pic_fb').find('.ajax-loader').remove();
							$('.pic').find('.ajax-loader').remove();
							$('.confirmTasks').show();
		
							navigator.notification.alert('Serveri poolne viga!', null, 'Teade!');
							app.deliverError(result, '1118');
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

function uploadFile2(mediaFile) {

	u_user = user.id;
	u_task = app.currentTask;
	u_sub_task = app.currentSub;
	pic_answer = $('#picAnswer').val();
	
	if (navigator.geolocation) {

	navigator.geolocation.getCurrentPosition(function(position) {
		$.get(app.serverUrl + "?action=uploadPhoto&callback=123&user=" + u_user + "&task=" + u_task + "&sub_task=" + u_sub_task + "&lat=" + position.coords.latitude + "&lng=" + position.coords.longitude + "&answer=" + pic_answer, {}, function(result) {
		//$('.sub-content').find('.confirmTask').removeClass('disabled');
			console.log(result);
			if (parseInt(result)) {
			
				$('.pic_fb').find('.ajax-loader').remove();
				$('.pic').find('.ajax-loader').remove();
				
				if (sub_tasks[sub_task].type == 'pic_fb') {
					postToFacebook(parseInt(result.response), task.name, sub_tasks[app.currentSub].description);
					$('.sub-content').find('.confirmTask').removeClass('disabled');
					$('.sub-content').find('.confirmTask').unbind('click');
					$('.sub-content').find('.confirmTask').click(function() {
						app.finishedTask = u_sub_task;
						app.navigate('task.html', 'startTask');
					});
				} else {
					if (app.isOneAnswer) {
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
					}
					app.finishedTask = u_sub_task;
					app.navigate('task.html', 'startTask');
				}
				
			} else {
				
				$('.pic_fb').find('.ajax-loader').remove();
				$('.pic').find('.ajax-loader').remove();

				navigator.notification.alert('Serveri poolne viga!', null, 'Teade!');
				app.deliverError(result.response, '1118');
			}
		});
	});
	}
}
