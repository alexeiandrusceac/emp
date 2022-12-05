import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from 'src/app/services/alert.service';
import {UserService} from 'src/app/services/user.service';
import {User} from '../../interfaces/user'
import {ValidatorsPattern} from '../../enums/validators'
import {AuthenticationService} from '../../services/authentication.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private alertService: AlertService, private authenticationService: AuthenticationService) {
    this.formGroup = this.fb.group({
      title: this.fb.control(null, Validators.required),
      name: this.fb.control(null, [Validators.required, Validators.maxLength(20)]),
      surname: this.fb.control(null, [Validators.required, Validators.maxLength(20)]),
      phone: this.fb.control(null, [Validators.required, Validators.pattern(ValidatorsPattern.PHONE)]),
      email: this.fb.control(null, [Validators.required, Validators.pattern(ValidatorsPattern.EMAIL)]),
      address: this.fb.control(null, Validators.required),
      password: this.fb.control(null, [Validators.required, Validators.pattern(ValidatorsPattern.PASSWORD)]),
      agree: this.fb.control(false, Validators.requiredTrue)
    })

  }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.formGroup.invalid) {
      return;
    }
    this.userService.createUser(<User>this.formGroup.value);
    this.authenticationService.signUp(this.formGroup.get('email')?.value, this.formGroup.get('password')?.value);
    this.alertService.showMessage('success','user registration successful', true);
    setTimeout(() => {
      this.alertService.clear();
    }, 5000)

  }
}
