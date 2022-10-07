import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector   : 'app-header',
  templateUrl: './header.component.html',
  styleUrls  : ['./header.component.scss']
})

export class HeaderComponent implements OnInit 
{
    loggedIn!: boolean;
    username!: string | null;
    subscription!: Subscription;
    constructor(private authService: AuthService) 
    { 
        this.authService.getLoggedStatus()
        .subscribe
        ({
            next : (response) => { this.loggedIn = response;
              console.log(this.username+ " - "+this.loggedIn); 
                                 },
            error: (error)    => { console.log(error); }
        })
    }


    ngOnInit(): void 
    {
        this.loggedIn = this.authService.isUserLoggedIn();
        this.username = this.authService.getUsername();
    }


    logout()
    {
        this.authService.logout();
    }
}
