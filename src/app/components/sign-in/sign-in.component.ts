import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private LS: LocalStorageService,
    private utilityService: UtilityService,
    private render: Renderer2) { }

  isSignUp = false;
  progress = false;

  ngOnInit(): void {
      this.isSignUp = (this.activatedRoute.snapshot.data.value == "signup")

  }




  toggleDark() {
    this.utilityService.toggleDark(this.render)
  }

  login() {
    if (this.signInForm.valid && this.progress == false) {
      this.progress = true;
      this.authService.login(this.signInForm.value).toPromise().then(data => {

        this.LS.setTokenValue(data.token)
        this.router.navigateByUrl("/app/private/home")
        this.progress = false;
      }).catch(err => {

        this.email.setErrors({ incorrect: true })
        this.password.setErrors({ incorrect: true })
        this.progress = false;
      })
    }
  }

  signUp() {

    if (this.signUpForm.valid && this.progress == false) {
      this.progress = true;
      this.userService.signup(this.signUpForm.value).toPromise().then(data => {
        this.eventEmitterService.showPopUP({ message: "Registration completed", type: "success" })
        this.router.navigateByUrl("/signin")
        this.progress = false;
      }).catch(err => {
        let errorMessage = err.error
        if (errorMessage.type == "email") {
          this.email_s.setErrors({ exist: true })
        } else if (errorMessage.type == "username") {
          this.username.setErrors({ exist: true })
        }
        this.progress = false;
      })

    }
  }


  signInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })


  signUpForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    birth: [new Date(), [Validators.required]]
  })

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }


  get username() {
    return this.signUpForm.get('username');
  }

  get email_s() {
    return this.signUpForm.get('email');
  }

  get password_s() {
    return this.signUpForm.get('password');
  }

  get birth() {
    return this.signUpForm.get('birth');
  }


}
