import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { ActivatedRoute } from '@angular/router';
import { List } from '../../models/list.model';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {

  list: List;
  nameItem = '';

  constructor(private wishes: WishesService, private route: ActivatedRoute) {
    const listId = this.route.snapshot.paramMap.get('id');
    this.list = this.wishes.loadList(listId);
  }

  addItem() {
    if(this.nameItem.length === 0) {
      return;
    }
    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);
    this.nameItem = '';
    this.wishes.saveStorage();
  }

  changeCheck(item: ListItem) {
    const pending = this.list.items.filter(item => !item.completed).length;
    if(pending === 0) {
      this.list.finish = new Date();
      this.list.completed = true;
    }else{
      this.list.finish = null;
      this.list.completed = false;
    }
    this.wishes.saveStorage();

  }

  remove(i: number) {
    this.list.items.splice(i, 1);
    this.wishes.saveStorage();
  }

}
