import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Candidat } from '../models/Candidat';
import { CandidatService } from '../services/candidat.service';

@Component({
  selector: 'app-candidat-rechercher',
  templateUrl: './candidat-rechercher.component.html',
  styleUrls: ['./candidat-rechercher.component.scss']
})
export class CandidatRechercherComponent implements OnInit 
{
  formSearchCdt!: FormGroup;
  candidats: Candidat[] = [];

  constructor(public fbSearchCdt: FormBuilder, private candidatService: CandidatService) 
  {

  }

  ngOnInit(): void {
    this.formSearchCdt = this.fbSearchCdt.group
    ({
        'prenomSearchCdt'     : '',
        'nomSearchCdt'        : '',
        'telSearchCdt'        : '',
        'emailSearchCdt'      : '',
        'handicapeSearchCdt'  : '',
        'dispoSearchCdt'      : '',
        'teletravailSearchCdt': '',
        'linkedinSearchCdt'   : '',
        'diplomeSearchCdt'    : '',
        'domaineSearchCdt'    : '',
        'competenceSearchCdt' : '',
        'langueSearchCdt'     : '',
        'missionSearchCdt'    : '',
        'entrepriseSearchCdt' : '',
        'villeSearchCdt'      : '',
        'mobiliteSearchCdt'   : ''
    });
    this.candidatService.getCandidatsShort().subscribe(reponse => { this.candidats = reponse; })
  }

  rechercher()
  {
    let requete = {
      "prenom"     : this.formSearchCdt.get("prenomSearchCdt")?.value,
      "nom"        : this.formSearchCdt.get("nomSearchCdt")?.value,
      "telephone"  : this.formSearchCdt.get("telSearchCdt")?.value,
      "email"      : this.formSearchCdt.get("emailSearchCdt")?.value,
      "teletravail": this.formSearchCdt.get("teletravailSearchCdt")?.value,
      "handicape"  : this.formSearchCdt.get("handicapeSearchCdt")?.value,
      "disponible" : this.formSearchCdt.get("dispoSearchCdt")?.value,
      "diplomes"   : this.formSearchCdt.get("diplomeSearchCdt")?.value,
      "specialites": this.formSearchCdt.get("domaineSearchCdt")?.value,
      "missions"   : this.formSearchCdt.get("missionSearchCdt")?.value,
      "entreprises": this.formSearchCdt.get("entrepriseSearchCdt")?.value,
      "competences": this.formSearchCdt.get("competenceSearchCdt")?.value,
      "langues"    : this.formSearchCdt.get("langueSearchCdt")?.value,
      "pseudos"    : this.formSearchCdt.get("linkedinSearchCdt")?.value,
      "ville"      : this.formSearchCdt.get("villeSearchCdt")?.value,
      "mobilite"   : this.formSearchCdt.get("mobiliteSearchCdt")?.value,
    }

    this.candidatService.getCandidatsByParams(requete)
      .subscribe
      ({
        next    : (reponse) => { this.candidats = reponse; },
        error   : (erreur)  => { console.log("erreur : " + erreur); },
        complete: ()        => { }
      })
  }
}
