import { Component, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ErrorEvents} from '../../services/error.events';

@Component({
  selector: 'sign-in-form',
  templateUrl: 'sign-in-form.html'
})
export class SignInFormComponent {

  text: string;
  signInForm: FormGroup;
  loading: boolean =  false;

  @Output()
  signIn: EventEmitter<string> = new EventEmitter();

  constructor(private authService: AuthService, public errorEvents: ErrorEvents) {
    console.log('Hello SignInFormComponent Component');
    this.text = 'Hello World';
    this.initaliseForm();
  }

  initaliseForm() {
    this.signInForm = new FormGroup({
      'studentNumber' : new FormControl('hb', [Validators.required, Validators.pattern(/hb+\d{3}$/)]),
      'pinNumber' : new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.loading = true;
    this.authService.signin(this.signInForm.value.studentNumber, this.signInForm.value.pinNumber)
      .then(data => {
        console.log(data);
        this.signIn.emit(this.signInForm.value.studentNumber);
      })
      .catch(error => {
        this.loading = false;
        console.log(error);
        this.signInForm.setValue({studentNumber: this.signInForm.value.studentNumber ,pinNumber: ''});
        this.errorEvents.updateError.next(error.message)
      })
  }

}
