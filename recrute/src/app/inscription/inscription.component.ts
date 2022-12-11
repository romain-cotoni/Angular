import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  username!  : string;
  password!  : string;
  repassword!: string;
  role!      : string;
  hide       = true;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  addUtilisateur()
  {
    let requete = 
    {
      "username": this.username,
      "password": this.password,
      roles:[
        {
          "rolename": this.role
        }
      ]  
    }    

    console.log(requete.username);
    this.authService.createUser(requete)
    .subscribe
    ({
        next : (response) => { console.log(response), this.router.navigate(['/candidat-rechercher/']); },
        error: ()   => {  }
    });
  }

}
