import {Component, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user'
import {UserService} from '../../services/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  @Output() user: User;
  constructor(private router: Router,private userService: UserService) { }

  ngOnInit(): void {
        this.userService.getAll()
  }
  goHome(){
    this.router.navigate(['/'])
  }

}
