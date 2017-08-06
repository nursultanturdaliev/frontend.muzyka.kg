/**
 * Created by nursultan on 8/6/17.
 */
import {AbstractControl} from '@angular/forms'
export class PasswordValidation {
  static MatchPassword(abstractControl:AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
    if (password != confirmPassword) {
      abstractControl.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
      return null
    }
  }
}
