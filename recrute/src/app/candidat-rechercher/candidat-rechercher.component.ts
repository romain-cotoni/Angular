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
}
