import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
	private db: SQLiteObject;
	public platform: string;

	public expenses: any = [];

  constructor(
  	private sqlite: SQLite,
  	public plt: Platform
  ) {
  	
  	if(plt.is('cordova')){
  		//если телефон
  		this.platform = 'cordova';
  	}

  	this.connectionDataBase();
  		
  }

  connectionDataBase(){
  	if(this.platform == 'cordova'){
	  	this.sqlite = new SQLite();
	  	this.sqlite.create({
	      name: 'db.db',
	      location: 'default'
	    }).then((db:SQLiteObject) => {
	    	this.db = db;
	    	console.log('ok');
	    }).catch((error) => {
	      console.log(error);
	    });
  	}
  }

  createTables(){
  	if(this.platform == 'cordova'){
  		this.db.executeSql('CREATE TABLE IF NOT EXISTS section(rowid INTEGER PRIMARY KEY, name TEXT, url TEXT, active INT)', [])
      .then(res => console.log('Executed SQL'))
      .catch(e => console.log(e));
      console.log('таблица создана');
  	} else {
  		console.log('таблица создана');
  	}
  }

  insertDataTablesSection(data){
  	if(this.platform == 'cordova'){
  		for(var i=0; i<data.length; i++) {
		    this.db.executeSql('INSERT INTO section VALUES(NULL,?,?,?)',[data.name,data.url,data.active]);
		  }
      console.log('Данные заполнены');
  	} else {
  		console.log('Данные заполнены');
  	}
  }

  getDataAll(nameTable){
  	if(this.platform == 'cordova'){
			return this.db.executeSql('SELECT * FROM '+nameTable, []);			
  	} else {
  		console.log('получение данных');
  	}
  }

  checkTable(nameTable){
  	if(this.platform == 'cordova'){
			return this.db.executeSql("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='"+nameTable+"'", []);	
  	} else {
  		console.log('Удаление таблицы');
  	}
  }

  dropTable(nameTable){
  	if(this.platform == 'cordova'){
			return this.db.executeSql('DROP TABLE if exists '+nameTable, []);	
  	} else {
  		console.log('Удаление таблицы');
  	}
  }




}
