import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, chevronUpCircle, colorPalette, document } from 'ionicons/icons';
import { ProductComponent } from '../product/product-component';
import { Product } from 'src/app/shared/interfaces';
;

@Component({
  selector: 'prod-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone : true,
  imports : [IonicModule, ProductComponent, CommonModule]
})
export class ListComponent  implements OnInit {

  @Input() selectable! : boolean;
  @Input() products : Product[] | undefined;
  @Input() inset: boolean = false;
  @Output() itemId= new EventEmitter<number>();
  @Output() deleteProduct= new EventEmitter<Product>();
  @Output() isChecked = new EventEmitter<Product>;

  constructor() {
    addIcons({ addOutline, chevronUpCircle, document, colorPalette });
  }

  ngOnInit() {}

  checkedProduct(p : Product){
    this.isChecked.emit(p)
  }

  openModal(id : number){
    this.itemId.emit(id);
  }

  onDelete(p : Product){
    this.deleteProduct.emit(p)
  }

}
