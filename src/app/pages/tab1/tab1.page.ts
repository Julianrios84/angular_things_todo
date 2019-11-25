import { Component } from '@angular/core';
import { WishesService } from '../../services/wishes.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public wishes: WishesService, private router: Router, private alertController: AlertController) {}

  async addList() {
    const alert = await this.alertController.create({
      header: 'New list',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name of the list'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Cancel'); }
        },
        {
          text: 'Create',
          handler: (data) => { 
            console.log(data); 
            if(data.title.length === 0) {
              return;
            }

            const listId = this.wishes.createList(data.title);
            this.router.navigateByUrl(`/tabs/tab1/add/${listId}`);

          }
        }
      ]
    });
    await alert.present();
  }

  

}
