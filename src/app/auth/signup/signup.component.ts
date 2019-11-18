import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const name = f.value.name;
    const email = f.value.email;
    const password = f.value.password;
    this.auth.signUp(name, email, password);
  }

}
