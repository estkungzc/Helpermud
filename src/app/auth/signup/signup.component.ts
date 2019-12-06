import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  error: any;
  alerts: any[] = [];
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const name = f.value.name;
    const email = f.value.email;
    const password = f.value.password;
    this.auth.signUp(email, password).then(credential => {
      this.auth.updateUser(name, credential.user).then(suc => {
        this.auth.signIn(email, password).then(success => {
          this.router.navigate(['/dashboard']);
        }).catch(err => {
          this.pushErrMsg(err);
        });
      }).catch( err => {
        this.pushErrMsg(err);
      });
    }).catch(err => {
      this.pushErrMsg(err);
    });
  }

  pushErrMsg(err) {
    this.alerts.push({
      type: 'danger',
      msg: `${err}`,
      timeout: 5000
    });
  }

}
