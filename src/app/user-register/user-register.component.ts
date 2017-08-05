/**
 * Created by nursultan on 8/1/17.
 */
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
  registrationForm:FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.createForm();
  }

  //regisrationForm = new FormGroup({
  //  email: new FormControl(),
  //  password: new FormControl(),
  //  repeatPassword: new FormControl()
  //});
  private createForm():void {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }
}
