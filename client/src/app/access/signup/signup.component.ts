import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AccessService } from 'src/app/services/access.service';
import { SignupRequest } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  providers: [DatePipe],
  imports: [IonText, IonInput, CommonModule,IonItem, ReactiveFormsModule, IonLabel,IonButton,IonDatetime,IonDatetimeButton,IonModal ,IonHeader,IonDatetime,IonToolbar,IonTitle, IonContent]

})
export class SignupComponent  implements OnInit {
  signupForm!: FormGroup;
  isModalOpen: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _datePipe:DatePipe, private _accessService : AccessService) { 
    this.signupForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthdate: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPass: new FormControl('', Validators.required)
    }, {validators : this.mustMatch('password','confirmPass')})
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT');
  }

  formatForBackend(dateString: string): string {
    if (!dateString) return ''; 
    const formattedDate = this._datePipe.transform(dateString, 'yyyy-MM-dd');
    return formattedDate || '';
  }

  openDatePicker() {
    this.isModalOpen = true; 
  }

  closeModal(){
    this.isModalOpen = false;
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value; 
    this.signupForm.get('birthdate')?.setValue(selectedDate); 
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchingControl = group.get(matchingControlName);

        if (!control || !matchingControl) {
            return null;
        }

        // return if another validator has already found an error on the matchingControl
        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }
  }

  onSubmit(){
    if (this.signupForm.valid) {
      const formData : SignupRequest = {
        ...this.signupForm.value,
        birthdate: this.formatForBackend(this.signupForm.get('birthdate')?.value)
      };
      this._accessService.signUp(formData).subscribe((res) => {
        console.log(res.message, res.code)
      })
    }
  }
  ngOnInit() {}

}