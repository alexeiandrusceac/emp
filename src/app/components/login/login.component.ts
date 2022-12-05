import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ValidatorsPattern} from '../../enums/validators'
import {ActivatedRoute, Router} from '@angular/router'
import {AuthenticationService} from '../../services/authentication.service'
import {AlertService} from '../../services/alert.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error: boolean;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.pattern(ValidatorsPattern.EMAIL)]),
      password: this.fb.control('', [Validators.required, Validators.pattern(ValidatorsPattern.PASSWORD)])
    })

  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.get('email')?.value);

    this.authenticationService.signIn(this.form.get('email')?.value, this.form.get('password')?.value)
      .then(
        (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        }).catch(
      (error: any) => {
        console.log(error);
        this.alertService.showMessage('error', error);
      });

  }

}
