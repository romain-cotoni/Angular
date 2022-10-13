import { Entreprise } from "./Entreprise";
import { Mission } from "./Mission";
import { Pays } from "./Pays";
import { Ville } from "./Ville";

export interface Experience
{
    idExperience : number;
    debut            : Date;
    fin                 : Date;
    lieu               : string,
    info               : string;
    
    mission         : Mission;
    entreprise     : Entreprise;
    ville               : Ville;
	pays              : Pays;
}