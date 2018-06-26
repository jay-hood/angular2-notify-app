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
    this.auth.signedIn.subscribe(
      status => {
        this.signedInStatus = status;
      }
    );
    this.signedInStatus = this.auth.isAuthenticated();
  }

  onLogout() {
    this.signedInStatus = false;
    this.auth.signoutUser();
  }


}
