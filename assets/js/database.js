//Web SQL stuff
function queryUserId(tx) {
	//console.log('user:' + user.id);
	tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, firstname, lastname, bank, fb_id, mail, sex, accepted, done, rejected, money, prizes)');
    tx.executeSql('SELECT * FROM USER WHERE id=:id', [user.id], querySuccess, errorDB);
}

function insertUser(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS USER');
	tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, firstname, lastname, bank, fb_id, mail, sex, accepted, done, rejected, money, prizes)');
	sql = 'INSERT INTO USER (id, firstname, lastname, fb_id, mail, sex, accepted, done, rejected, money, prizes) VALUES ("' + user.id + '", "' + user.firstname + '", "' + user.lastname + '", "' + user.fb_id + '", "' + user.mail + '", "' + user.sex + '", "0", "0", "0", "0", "0")';

	tx.executeSql(sql);
}

function updateUser(tx) {
	sql = 'UPDATE USER SET firstname = "' + user.firstname + '", lastname = "' + user.lastname + '", fb_id = "' + user.fb_id + '", mail = "' + user.mail + '", sex = "' + user.sex + '", bank = "' + user.bank + '", accepted = "' + user.accepted + '", done = "' + user.done + '", rejected = "' + user.rejected + '", money = "' + user.money + '", prizes = "' + user.prizes + '" WHERE id=:id';
	
	console.log(sql);
	
	tx.executeSql(sql, [user.id]);
}

function updateCustomUser(tx, query) {
	
	tx.executeSql('UPDATE USER SET ' + query + ' WHERE id=:id', [user.id]);
}

function queryTasks(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS TASKS (id unique, name, description, status)');
}

function insertTask(tx, task) {
	sql = 'INSERT INTO TASKS (id, name, description, status) VALUES ("' + task.id + '", "' + task.name + '", "' + task.description + '", "beginning")';

	tx.executeSql(sql);
}

function updateTask(tx, task) {
	
	tx.executeSql('UPDATE TASKS SET status = "' + task.status + '" WHERE id=:id', [task.id]);
}

function removeTask(tx, id) {
	tx.executeSql('REMOVE FROM TASKS WHERE id=:id', [id]);
}


function successUser() {
	//app.navigate('home.html', 'loadHome');
	app.preLoadHome();
}

function querySuccess(tx, results) {
	if(results.rows.length) {
		var len = results.rows.length;
    	for (var i=0; i<len; i++){
    		if(user.id == results.rows.item(i).id) { 
				user.firstname = results.rows.item(i).firstname;
				user.lastname = results.rows.item(i).lastname;
				user.fb_id = results.rows.item(i).fb_id;
				user.mail = results.rows.item(i).mail; 
				user.sex = results.rows.item(i).sex;
				user.bank = results.rows.item(i).bank;
				
				user.accepted = results.rows.item(i).accepted;
				user.done = results.rows.item(i).done;
				user.rejected = results.rows.item(i).rejected;
				user.money = results.rows.item(i).money;
				user.prizes = results.rows.item(i).prizes;
			}
		}
		app.preLoadHome();
		//alert('ok');
	} else {
	
		console.log('No rows :)');
	
		db.transaction(insertUser, errorDB, successUser);
		//app.login();
		app.preLoadHome();
	}
}
function errorDB(tx, err) {
    console.error("Error processing SQL: "+err);
}