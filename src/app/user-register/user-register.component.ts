/**
 * Created by nursultan on 8/1/17.
 */
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PasswordValidation} from '../validation/PasswordValidation';
import {AuthService} from '../services/auth.service';
import {AuthResponse} from "../Models/AuthResponse";
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
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
