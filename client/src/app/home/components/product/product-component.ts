import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCheckbox, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonNote, IonRippleEffect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertOutline, chevronBackOutline, ellipse, thumbsDown, thumbsUp, trashOutline } from 'ionicons/icons';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'p-tab',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink, IonItem, IonLabel, IonNote, IonIcon, IonRippleEffect, IonItemOption, IonItemOptions, IonItemSliding, IonCheckbox],
})
export class ProductComponent implements OnInit{
  
  @Input() product!: Product;
  @Input() selectable! : boolean;
  @Output() deleteProduct = new EventEmitter<Product>();
  @Output() openModalId = new EventEmitter<number>();   
  @Output() checkedProducts = new EventEmitter<Product>();
 
  
  constructor(){
    addIcons({thumbsUp, thumbsDown, trashOutline, chevronBackOutline, ellipse})
  }
  
  ngOnInit(): void {
    
  }
  
  onSelect(p: Product) {
    this.checkedProducts.emit(p)
  }

  onDelete(event : Event, p : Product){
    this.deleteProduct.emit(p)
    event.stopPropagation();
  }

  onRequestProductDetail(id : number){
    this.openModalId.emit(id)
  }

  
}
