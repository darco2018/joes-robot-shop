import { Component, OnInit } from '@angular/core';
import { IUser, IUserCredentials } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css'],
})
export class SiteHeaderComponent implements OnInit {
  user: IUser | null = null; // kiedy to sie zmieni, aktywuje
 //  <div class="right" *ngIf="user">

 showSignOutButton: boolean = false; // kiedy to sie zmieni, aktywuje
  // *ngIf="showSignOutMenu" in the template

  constructor(private userService: UserService) {}

  ngOnInit() {
    // When you subscribe to an observable, you are essentially 
    // setting up a listener that waits for data to be emitted.

    // By calling subscribe, you are telling Angular to execute 
    // the provided callback functions (next, error, complete) 
    // whenever the observable emits data, encounters an error, or completes.
    this.userService.getUser().subscribe({
      next: (user) => (this.user = user), 
      //  If the user variable in the UserService changes 
      // and this change is emitted through the observable, 
      // the next callback will be triggered, 
      // updating the this.user
      // The component’s view will update to 
      // reflect the new user data if it is bound to the template.
    });
  }

  toggleButtonVisibility(){
    return this.showSignOutButton = !this.showSignOutButton;
  }

  signOut(){
    this.userService.signOut(); // set user to null
    this.showSignOutButton = false;   
  }
}
