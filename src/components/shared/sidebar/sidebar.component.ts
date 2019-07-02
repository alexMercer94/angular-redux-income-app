import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  /**
   * Close a session in the aplication
   */
  logOut() {
    this.authService.logOut();
  }
}
