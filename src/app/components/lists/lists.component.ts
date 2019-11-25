import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { List } from '../../models/list.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild(IonList, null) list: IonList;
  @Input() completed = true;

  constructor(public wishes: WishesService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  listSelected(list: List) {
    if(this.completed) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  remove(list:List) {
    this.wishes.remove(list);
  }

  async modify(list:List) {

    const alert = await this.alertController.create({
      header: 'Updated list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title,
          placeholder: 'Name of the list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { 
            console.log('Cancel'); 
            this.list.closeSlidingItems();
          }
        },
        {
          text: 'Modify',
          handler: (data) => { 
            console.log(data); 
            if(data.title.length === 0) {
              return;
            }


            list.title = data.title;
            this.wishes.saveStorage();

            this.list.closeSlidingItems();

          }
        }
      ]
    });
    await alert.present();
    
  }

}
