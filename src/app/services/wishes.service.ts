import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { ListItem } from '../models/list-item.model';

@Injectable({
  providedIn: 'root'
})
export class WishesService {
  list: List[] = [];
  constructor() {
    console.log(`Service initialize.`);
    this.loadStorage();
  }

  createList(title: string) {
    const newList = new List(title);
    this.list.push(newList);
    this.saveStorage();
    return newList.id;
  }

  remove(list: List) {
    this.list = this.list.filter(listData => listData.id !== list.id);
    this.saveStorage();
  }


  loadList(id: string | number) {
    id = Number(id);
    return this.list.find(listData => listData.id === id);
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.list));
  }

  loadStorage() {
    if(localStorage.getItem('data')) {
      this.list = JSON.parse(localStorage.getItem('data'));
    }else {
      this.list = [];
    }
  }

}
