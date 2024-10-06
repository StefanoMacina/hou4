import { Component, OnInit } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipse, square, triangle } from 'ionicons/icons';

@Component({
  selector: 'app-tabs-component',
  templateUrl: './tabs-component.component.html',
  styleUrls: ['./tabs-component.component.scss'],
  standalone: true,
  imports: [ IonTabBar,IonTabButton,IonIcon, IonTabs, IonLabel],
})
export class TabsComponentComponent  implements OnInit {

  constructor() {
    addIcons({ triangle, ellipse, square });
   }

  ngOnInit() {}

}
