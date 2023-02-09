import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';
import { AuthGuardService }              from './services/auth-guard.service';
import { LoginComponent }                from './login/login.component';
import { MainLayoutComponent }           from './main-layout/main-layout.component';
import { UnloggedLayoutComponent }       from './unlogged-layout/unlogged-layout.component';
import { CandidatAjouterComponent }      from './candidat-ajouter/candidat-ajouter.component';
import { CandidatRechercherComponent }   from './candidat-rechercher/candidat-rechercher.component';
import { CandidatComponent }             from './candidat/candidat.component';
import { EntrepriseAjouterComponent }    from './entreprise-ajouter/entreprise-ajouter.component';
import { EntrepriseRechercherComponent } from './entreprise-rechercher/entreprise-rechercher.component';
import { EntrepriseComponent }           from './entreprise/entreprise.component';
import { OffreComponent }                from './offre/offre.component';
import { StatistiqueComponent }          from './statistique/statistique.component';
import { InscriptionComponent }          from './inscription/inscription.component';
import { AccueilComponent }              from './accueil/accueil.component';

const routes: Routes = [
  {
    path       : '',
    component  : MainLayoutComponent,
    canActivate: [AuthGuardService],  
    children: 
    [
      { path: ''                     , component: CandidatComponent }            ,
      { path: 'accueil'              , component: AccueilComponent }             ,
      { path: 'candidat'             , component: CandidatComponent }            ,
      { path: 'candidat-ajouter'     , component: CandidatAjouterComponent }     ,
      { path: 'candidat-rechercher'  , component: CandidatRechercherComponent }  ,
      { path: 'candidat/:id'         , component: CandidatComponent}             ,
      { path: 'entreprise'           , component: EntrepriseComponent }          ,
      { path: 'entreprise-ajouter'   , component: EntrepriseAjouterComponent }   ,
      { path: 'entreprise-rechercher', component: EntrepriseRechercherComponent },
      { path: 'offre'                , component: OffreComponent }               ,
      { path: 'statistique'          , component: StatistiqueComponent }         ,
      { path: 'inscription'          , component: InscriptionComponent }         ,
    ]
  },
  {
    path: '',
    component: UnloggedLayoutComponent,
    children: 
    [
      { path: 'login', component: LoginComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
