import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonTitle, IonToolbar, ModalController, ToastController } from '@ionic/angular/standalone';
import { Icon } from 'ionicons/dist/types/components/icon/icon';
import { colorFill, warning } from 'ionicons/icons';
import { DataService } from 'src/app/services/data.service';
import { PostProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  imports : [ReactiveFormsModule,IonHeader, IonToolbar, IonButtons, IonContent, IonButton, IonTitle, IonInput],
  standalone : true
})
export class Addproduct  implements OnInit {

  private fb = inject(FormBuilder)
  addForm! : FormGroup

  constructor(
    private modalCtrl : ModalController,
    private toastController: ToastController,
    private readonly _data : DataService
  ) { }

  ngOnInit() {

  this.addForm = this.fb.group({
    pName: ['', Validators.required ],
    buyDate: [''],
    expDate: ['', Validators.required],
  })


  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel')
  }
  get pName(){
    return this.addForm.get('pName')
  }

  get expDate(){
    return this.addForm.get('expDate')
  }

  public toastButtons = [
    {
      text: 'Dismiss',
      role: 'cancel',
    },
  ];

  async presentToast(position: 'top' | 'middle' | 'bottom', message : string, color:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color,
      swipeGesture: 'vertical',
      buttons: this.toastButtons
    });
    await toast.present();
  }


  onSubmit(){
    if (this.addForm.valid) {
      const newProduct: PostProduct = {
        pName: this.addForm.value.pName!,
        buyDate: new Date(this.addForm.value.buyDate!),
        expDate: new Date(this.addForm.value.expDate!)
      };

     this._data.addProduct(newProduct).subscribe(() => {
      this.presentToast('top',`${newProduct.pName} added"`, "success" )
     })
      
    } else {
      let errorMessage = '';
      if (this.pName?.errors?.['required']) {
        errorMessage += 'product Name ';
      }
      if (this.expDate?.errors?.['required']) {
        errorMessage += 'expiration date ';
      }

      if (errorMessage) {
        this.presentToast('top', `${errorMessage} required!`, "warning");
      }
    }
  }
}
