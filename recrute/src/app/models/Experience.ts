import { Entreprise } from "./Entreprise";
import { Mission } from "./Mission";
import { Pays } from "./Pays";
import { Ville } from "./Ville";

export interface Experience
{
    idExperience: number;
    mission     : Mission;
    entreprise  : Entreprise;
    ville       : Ville;
	pays        : Pays;
    debut       : Date;
    fin         : Date;
    info        : string;
}