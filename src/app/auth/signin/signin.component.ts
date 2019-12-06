import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html"
})
export class SigninComponent implements OnInit {
  alerts: any[] = [];
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  loginEmail(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const password = f.value.password;
    this.auth
      .signIn(email, password)
      .then(() => {
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        this.alerts.push({
          type: 'danger',
          msg: `${err}`,
          timeout: 5000
        });
      });
  }

}
