import { Categorie } from "./Categorie";

export interface Document
{
    idDocument: number;
    nom       : string;
	path      : string;
    type      : string;
    categorie : Categorie;
}