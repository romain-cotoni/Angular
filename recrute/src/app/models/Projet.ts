import { Activite } from "./Activite";

export interface Projet
{
    idProjet     : number;
    nom          : string;
    type         : string;
	debut        : Date;
    fin          : Date;
    entreprise   : string;
    info         : string;
    
    activite     : Activite;
}