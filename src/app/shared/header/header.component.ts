import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service'
import {Router} from '@angular/router'
import firebase from 'firebase/compat'
import User = firebase.User


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currUser: User;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.currUser.subscribe(x => this.currUser = x);
  }

  logout() {
    this.authenticationService.signOut();
    this.router.navigate(['/login'])
  }
}
