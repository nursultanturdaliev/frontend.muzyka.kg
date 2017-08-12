/**
 * Created by nursultan on 8/12/17.
 */
import {Component} from '@angular/core';
import {PasswordValidation} from "../../validation/PasswordValidation";
import {AuthService} from "../../services/auth.service";
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthResponse} from "../../Models/AuthResponse";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  registrationForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router) {
    this.createForm();
  }

  private createForm():void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }

  public onSubmit() {
    this.authService.register(
      this.registrationForm.get('firstName').value,
      this.registrationForm.get('lastName').value,
      this.registrationForm.get('email').value,
      this.registrationForm.get('password').value
      )
      .then((response:AuthResponse)=> {
        this.authService.saveToLocalStorage(response);
        this.router.navigate(['/profile'])
      })
      .catch((error) => {
        //TODO: Handle error properly!
        console.log(error);
      });
  }
}
