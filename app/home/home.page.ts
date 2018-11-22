import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	public items: any = [];

  constructor(
    private database: DatabaseService
  ) { } 

  addTables(){
  	this.database.createTables();
  }

  insertDataTables(){
  	let obj = [
  		{
		    "name": "Твой успешный день",
		    "url": "day",
		    "active": "1"
		  },
		  {
		    "name": "Твой успешный год",
		    "url": "year",
		    "active": "1"
		  },
		  {
		    "name": "Выход из стресса",
		    "url": "stress",
		    "active": "1"
		  },
		  {
		    "name": "Вдохновление на день",
		    "url": "",
		    "active": "0"
		  },
		  {
		    "name": "Бизнес решение",
		    "url": "",
		    "active": "0"
		  },
		  {
		    "name": "Питание",
		    "url": "",
		    "active": "0"
		  },
		  {
		    "name": "Общение",
		    "url": "communication",
		    "active": "1"
		  }
  	];
  	this.database.insertDataTablesSection(obj);
  }

 /* dropTableSecond(){
  	this.database.dropTable('section');
  	this.database.getDataAll('section').then(res => {
		  if(res.rows.length>0) {
		    this.items = [];
		    for(var i=0; i<res.rows.length; i++) {
		      this.items.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,url:res.rows.item(i).url,active:res.rows.item(i).active})
		    }
		  }
		});	*/
  }

  ngAfterViewChecked() {
  	//this.getDataSectionAll();
  }



  getDataSectionAll(){
  	this.database.getDataAll('section').then(res => {
		  if(res.rows.length>0) {
		    this.items = [];
		    for(var i=0; i<res.rows.length; i++) {
		      this.items.push({rowid:res.rows.item(i).rowid,name:res.rows.item(i).name,url:res.rows.item(i).url,active:res.rows.item(i).active})
		    }
		  }
		});	
  }



}
