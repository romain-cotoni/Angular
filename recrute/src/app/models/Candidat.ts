import { Competence } from "./Competence";
import { Education } from "./Education";
import { Entretien } from "./Entretien";
import { Experience } from "./Experience";
import { Langue } from "./Langue";
import { Mobilite } from "./Mobilite";
import { Pays } from "./Pays";
import { Projet } from "./Projet";
import { Pseudo } from "./Pseudo";
import { Ville } from "./Ville";

export interface Candidat
{
    idCandidat  : number;
    nom         : string;
	prenom      : string;
    telfixe     : string;
    mob         : string;
    email       : string;
    adresse     : string;
    adresse2    : string;
    postal      : string;
    salaire     : number;
    marital     : number;
    handicape   : boolean;
    teletravail : boolean;
    permis      : boolean;
    vehicule    : boolean;
    disponible  : boolean;
    info        : string;
    ville       : Ville;
    pays        : Pays;
    mobilite    : Mobilite;
    pseudos     : Array<Pseudo>;
    educations  : Array<Education>;
    experiences : Array<Experience>;
    projets     : Array<Projet>;
    entretiens  : Array<Entretien>;
    competences : Array<Competence>;
    langues     : Array<Langue>;
    documents   : Array<Document>;
}