import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(data: any) {
    const { name, email, password } = data;
    this.authService.createUser(name, email, password);
  }
}
