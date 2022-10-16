import { Pays } from "./Pays";

export interface Ville
{
    idVille : number;
    ville   : string;
    postal  : string;
    pays    : Pays;
}