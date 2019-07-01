import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  logIn(data: any) {
    const { email, password } = data;
    this.authService.logIn(email, password);
  }
}
