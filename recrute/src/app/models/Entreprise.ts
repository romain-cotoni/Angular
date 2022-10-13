import { Pays } from "./Pays";
import { Ville } from "./Ville";

export interface Entreprise
{
    idEntreprise   : number;
    raisonSociale : string;
    siret               : string;
    email             : string;
    mob              : string;
    fixe                : string;
    adresse         : string;
    adresse2       : string;
    
    ville               : Ville;
    pays              : Pays;
}