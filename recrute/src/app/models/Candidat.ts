import { Mobilite } from "./Mobilite";
import { Pays } from "./Pays";
import { Ville } from "./Ville";

export interface Candidat
{
    idCandidat : number;
    nom           : string;
	prenom      : string;
    telfixe         : string;
    mob           : string;
    email          : string;
    adresse      : string;
    adresse2    : string;
    postal         : string;
    salaire        : number;
    marital       : number;
    handicape : boolean;
    teletravail  : boolean;
    permis       : boolean;
    vehicule     : boolean;
    disponible : boolean;
    info            : string;
    
    ville           : Ville;
    pays          : Pays;
    mobilite    : Mobilite;
}