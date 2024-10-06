import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonNote, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { PostProduct, Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports : [IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonTitle, ReactiveFormsModule, IonInput, IonItem, IonNote],
  standalone : true
})
export class ProductDetailComponent  implements OnInit {
  
  @Input() product! : Product;
  private fb = inject(FormBuilder)
  detailForm!: FormGroup;
  
  constructor(
    private modalCtrl : ModalController
  ) { 
  }
  
  ngOnInit() {
    this.detailForm = this.fb.group({
      pName: [this.product?.pName, Validators.required ],
      buyDate: [this.product.buyDate],
      expDate: [this.product.expDate, Validators.required],
    })
  }
  
  onSubmit() {
    if(this.detailForm.valid){
      const productData: PostProduct = {
        id: this.product.id,
        pName: this.detailForm.value.pName,
        buyDate: this.detailForm.value.buyDate != null ? this.detailForm.value.buyDate : null,
        expDate: new Date(this.detailForm.value.expDate)
        
      };
      this.modalCtrl.dismiss(productData,'update')
    }
  }
  
  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel')
  }

}
