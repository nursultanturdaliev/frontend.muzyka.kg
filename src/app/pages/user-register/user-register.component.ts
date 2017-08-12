/**
 * Created by nursultan on 8/1/17.
 */
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PasswordValidation} from '../../validation/PasswordValidation';
import {AuthService} from '../../services/auth.service';
import {AuthResponse} from "../../Models/AuthResponse";
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html'
})
export class UserRegisterComponent {
}
