import { Categorie } from "./Categorie";

export interface Document
{
    idDocument: number;
    label     : string;
	path      : string;
    categorie : Categorie;
}