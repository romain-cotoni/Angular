import { Recruteur } from "./Recruteur";

export interface Entretien
{
    idEntretien : number;
    date        : Date;
    lieu        : string;
    evaluation  : string;
	recruteur   : Recruteur;
    poste       : string;
    contrat     : string;
    resume      : string
}