/**
 * Created by nursultan on 8/12/17.
 */
import {Component,EventEmitter, Output, Input, OnInit} from '@angular/core';
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
export class UserFormComponent implements OnInit{

  public registrationForm:FormGroup;

  @Input() user:User;
  @Output() userUpdated = new EventEmitter();

  constructor(private formBuilder:FormBuilder,
              private authService:AuthService,
              private userService:UserService,
              private router:Router) {
    this.createForm();
  }

  private createForm():void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit():void {
    this.populateForm();
  }

  private populateForm() {
    this.registrationForm.setValue({
      firstName: this.user.first_name,
      lastName: this.user.last_name
    });
  }

  public onSubmit() {
    this.user.first_name = this.registrationForm.get('firstName').value;
    this.user.last_name = this.registrationForm.get('lastName').value;
    this.userService.update(this.user)
      .then((response:User)=> {
        this.userUpdated.emit(response);
        localStorage.setItem('first_name', response.first_name );
        localStorage.setItem('last_name', response.last_name );
      })
      .catch((error) => {
        //TODO: Handle error properly!
        console.log(error);
      });
  }
}
