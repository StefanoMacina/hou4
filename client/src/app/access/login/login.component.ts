import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent,IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonButton,IonContent,IonHeader,IonInput,IonItem,IonLabel,IonText,IonTitle,IonToolbar]
})
export class LoginComponent  implements OnInit {
  loginForm!: FormGroup;
  router = inject(Router)

  constructor(private _fb  : FormBuilder,private _accessService : AccessService ) {
    this.loginForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }
  
  ngOnInit() {}

  onSubmit(){
    if(this.loginForm.valid){
      this._accessService.signIn(this.loginForm.value).subscribe((res) => {
        localStorage.setItem('token', res.message),
        this.router.navigate(['/app/home'])
      })
    }
  }

}
