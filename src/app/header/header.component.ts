import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signedInStatus: boolean;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.authState.subscribe(
      () => {
        status !== null ? this.signedInStatus = true : this.signedInStatus = false;
      }
    );
    this.signedInStatus = this.auth.isAuthenticated;
  }

  onLogout() {
    this.auth.signoutUser();
  }


}
