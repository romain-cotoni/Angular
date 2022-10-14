import { Education } from "./Education";
import { Experience } from "./Experience";
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
}