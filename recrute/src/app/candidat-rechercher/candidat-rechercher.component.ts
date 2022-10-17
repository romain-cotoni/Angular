import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Candidat } from '../models/Candidat';
import { CandidatService } from '../services/candidat.service';

@Component({
  selector   : 'app-candidat-rechercher',
  templateUrl: './candidat-rechercher.component.html',
  styleUrls  : ['./candidat-rechercher.component.scss']
})
export class CandidatRechercherComponent implements OnInit 
{
    formSearchCdt!: FormGroup;
    candidats     : Candidat[] = [];

    constructor(public fbSearchCdt: FormBuilder,private candidatService: CandidatService) 
    { 

    }

    ngOnInit(): void 
    {
        this.formSearchCdt = this.fbSearchCdt.group
        ({'prenomSearchCdt'     : '',
          'nomSearchCdt'        : '', 
          'telSearchCdt'        : '',
          'emailSearchCdt'      : '',
          'villeSearchCdt'      : '',
          'linkedinSearchCdt'   : '',
          'diplomeSearchCdt'    : '',
          'domaineSearchCdt'    : '',
          'competenceSearchCdt' : '',
          'langueSearchCdt'     : '',
          'entrepriseSearchCdt' : '',
          'handicapeSearchCdt'  : '',
          'dispoSearchCdt'      : '',
          'teletravailSearchCdt': '',
          'mobiliteSearchCdt'   : ''
        });
        this.candidatService.getCandidats().subscribe(reponse => { this.candidats = reponse; })
  }
  
  rechercher()
  {
    let requete = {
      "prenom": this.formSearchCdt.get("prenomSearchCdt")?.value,
      "nom"   : this.formSearchCdt.get("nomSearchCdt")?.value
    }
    
    console.log(requete);
    this.candidatService.getCandidatsByParams(requete)
    .subscribe
    ({
      next         : (reponse) => { console.log("reponse : "+reponse);  this.candidats = reponse },
      error        : () => { console.log("erreur")},
      complete : () => { }
    })        
  }
}
