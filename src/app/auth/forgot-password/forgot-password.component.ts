import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  alerts: any[] = [];
  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  resetPassword(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    this.auth.resetPassword(email)
    .then(res => {
      this.alerts.push({
        type: 'success',
        msg: `คุณสามารถรีเซตรหัสผ่านได้แล้ว กรุณาตรวจสอบที่อีเมล`,
        timeout: 5000
    });
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
