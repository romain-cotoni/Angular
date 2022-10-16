import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidatService } from '../services/candidat.service';

@Component({
  selector: 'app-candidat-ajouter',
  templateUrl: './candidat-ajouter.component.html',
  styleUrls: ['./candidat-ajouter.component.scss']
})
export class CandidatAjouterComponent implements OnInit {

  formCreateCdt!: FormGroup;
  prenom!: string;
  nom!   : string;


  constructor(public formBuilder: FormBuilder, private candidatService: CandidatService, private router: Router) 
  { 

  }

  ngOnInit(): void 
  {
    this.formCreateCdt = this.formBuilder.group
    ({
      'prenom': '',
      'nom'   : ''
    });
  }

  addCandidat()
  {
    let requete = 
    {
      "prenom": this.prenom,
      "nom"   : this.nom
    }    
    this.candidatService.createCandidat(requete)
    .subscribe
    ({
        next : (response) => { this.router.navigate(['/candidat/'+response.idCandidat]); },
        error: ()   => {  }
    });
  }

}
