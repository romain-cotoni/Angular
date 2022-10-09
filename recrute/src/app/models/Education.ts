import { Diplome } from "./Diplome";
import { Specialite } from "./Specialite";

export interface Education
{
    idEducation : number;
    recu        : boolean;
    lieu        : string;
    ecole       : string;
    debut       : Date;
    fin         : Date;
    info        : string;
    
    diplome     : Diplome;
    specialite  : Specialite;
}