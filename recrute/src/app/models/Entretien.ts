import { Recruteur } from "./Recruteur";

export interface Entretien
{
    idEntretien : number;
    date        : Date;
    lieu        : string;
    poste       : string;
    contrat     : number;
    resume      : string;

    recruteur   : Recruteur;
}