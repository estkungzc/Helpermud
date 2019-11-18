import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword(f: NgForm) {
    this.auth.resetPassword(f.value.email);
  }

}
