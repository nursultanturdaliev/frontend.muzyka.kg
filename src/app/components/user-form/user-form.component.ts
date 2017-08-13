/**
 * Created by nursultan on 8/12/17.
 */
import {Component,EventEmitter, Output} from '@angular/core';
import {Validators,FormGroup, FormBuilder} from '@angular/forms';
import {PasswordValidation} from '../../validation/PasswordValidation';
import {AuthService} from '../../services/auth.service';
import {AuthResponse} from '../../Models/AuthResponse';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from "../../Models/user";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent {
  public registrationForm:FormGroup;
  public user:User;

  @Output() userUpdated = new EventEmitter();

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private userService:UserService,
              private router:Router) {
    this.createForm();
    this.populateUser();
  }

  private createForm():void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  private populateUser() {
    this.userService.getUser()
      .then((user) => {
        this.user = user;
        this.registrationForm.setValue({
          firstName: this.user.first_name,
          lastName: this.user.last_name
        });
      });
  }

  public onSubmit() {
    this.user.first_name = this.registrationForm.get('firstName').value;
    this.user.last_name = this.registrationForm.get('lastName').value;
    this.userService.update(this.user)
      .then((response:User)=> {
        this.userUpdated.emit(response);
      })
      .catch((error) => {
        //TODO: Handle error properly!
        console.log(error);
      });
  }
}
