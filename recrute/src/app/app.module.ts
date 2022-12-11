import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './interceptors/';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CandidatComponent } from './candidat/candidat.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { UnloggedLayoutComponent } from './unlogged-layout/unlogged-layout.component';
import { LoginComponent } from './login/login.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { CandidatRechercherComponent } from './candidat-rechercher/candidat-rechercher.component';
import { CandidatAjouterComponent } from './candidat-ajouter/candidat-ajouter.component';
import { EntrepriseAjouterComponent } from './entreprise-ajouter/entreprise-ajouter.component';
import { EntrepriseRechercherComponent } from './entreprise-rechercher/entreprise-rechercher.component';
import { OffreComponent } from './offre/offre.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule} from '@angular/material/input';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CandidatComponent,
    MainLayoutComponent,
    UnloggedLayoutComponent,
    LoginComponent,
    EntrepriseComponent,
    CandidatRechercherComponent,
    CandidatAjouterComponent,
    EntrepriseAjouterComponent,
    EntrepriseRechercherComponent,
    OffreComponent,
    StatistiqueComponent,
    InscriptionComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue:'fr-FR' },
                httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
