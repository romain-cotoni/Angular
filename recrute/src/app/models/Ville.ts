import { Pays } from "./Pays";

export interface Ville
{
    idVille : number;
    nom     : string;
    postal  : string;
    pays    : Pays;
}