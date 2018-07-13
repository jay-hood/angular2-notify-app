import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  signedInStatus: boolean;
  statusSubscription: Subscription;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.signedInStatus = this.auth.isAuthenticated;
    this.statusSubscription = this.auth.signedIn
      .subscribe(status => {
          this.signedInStatus = status;
          console.log('header signed in status', status);
        });
  }

  onLogout() {
    this.auth.signoutUser();
  }


}
