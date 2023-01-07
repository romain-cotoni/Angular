import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
    username!: string;
    password!: string;
    user!    : User;
    successMessage = "Vous êtes connecté";
    errorMessage   = 'Identifiants invalides';
    invalidLogin   = false;
    loginSuccess   = false;
    hide           = true;

    constructor(private authService: AuthService, private router: Router) 
    {  

    }

    ngOnInit(): void
    {

    }

    login()
    {
        this.authService.login(this.username, this.password)
        .subscribe
        ({
            next: (response) => { this.invalidLogin = false; 
                                  this.loginSuccess = true; 
                                  this.router.navigate(['/accueil']);
                                },
            error: (error)   => { this.invalidLogin = true;  
                                  this.loginSuccess = false; }
        });
    }

}
