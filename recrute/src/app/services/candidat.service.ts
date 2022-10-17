import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { Candidat } from '../models/Candidat';
import { Competence } from '../models/Competence';
import { Document } from '../models/Document';
import { Education } from '../models/Education';
import { Entretien } from '../models/Entretien';
import { Experience } from '../models/Experience';
import { Langue } from '../models/Langue';
import { Projet } from '../models/Projet';

@Injectable({
    providedIn: 'root'
})

export class CandidatService 
{
    BASE_PATH = 'http://localhost:9000';

    constructor(private httpClient: HttpClient)
    { 
        
    }

    getCandidats(): Observable<Candidat[]>
    {
        const url = this.BASE_PATH + '/candidats';
        return this.httpClient.get<Candidat[]>(url/*,{ withCredentials: true }*/);
    }


    getCandidat(id: number): Observable<Candidat>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString();
        return this.httpClient.get<Candidat>(url);
    }

    getCandidatByName(prenom: String, nom:String): Observable<Candidat>
    {
        const url   = this.BASE_PATH + '/candidat/rechercher';
        var body    = { prenom, nom };
        return this.httpClient.post<Candidat>(url, body);
    }

    getCandidatsByParams(data: any): Observable<Candidat>
    {
        const url = this.BASE_PATH + '/candidats/rechercher/parametres';
        var body = data;
        return this.httpClient.post<Candidat>(url, body);
    }

    getCandidatsPrenoms(): Observable<String[]>
    {
        const url = this.BASE_PATH + '/candidats/prenoms';
        return this.httpClient.get<String[]>(url);
    }

    getCandidatsNoms(): Observable<String[]>
    {
        const url = this.BASE_PATH + '/candidats/noms';
        return this.httpClient.get<String[]>(url);
    }

    createCandidat(data: any): Observable<Candidat>
    {
        const url   = this.BASE_PATH + '/candidat/';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = data; //JSON.stringify(Object.fromEntries(data));         
        return this.httpClient.post<Candidat>(url, body, {'headers':headers});
    }

    getEducations(id: number): Observable<Education[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/educations';
        return this.httpClient.get<Education[]>(url);
    }

    createEducation(id: number, data: any): Observable<Education>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/educations';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = data;//JSON.stringify(Object.fromEntries(data)); 
        
        return this.httpClient.post<Education>(url, body, {'headers':headers});
    }

    //education service
    updateEducation(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/education/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = data;//JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Education>(url, body, {'headers':headers});
    }

    deleteEducation(id: number)
    {
        const url = this.BASE_PATH + '/education/' + id.toString();
        console.log(url);
        return this.httpClient.delete<Education>(url);
    }

    //-------------------------EXPERIENCE-----------------------------
    getExperiences(id: number): Observable<Experience[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/experiences';
        return this.httpClient.get<Experience[]>(url);
    }

    createExperience(id: number, data: any): Observable<Experience>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/experiences';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data));
        return this.httpClient.post<Experience>(url, body, {'headers':headers});
    }

    //expérience service
    updateExperience(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/experience/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Experience>(url, body, {'headers':headers});
    }

    deleteExperience(id: number)
    {
        const url = this.BASE_PATH + '/experience/' + id.toString();
        return this.httpClient.delete<Experience>(url);
    }

    //-------------------------COMPETENCE-----------------------------
    getCompetence(id: number): Observable<Competence[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/competences';
        return this.httpClient.get<Competence[]>(url);
    }

    createCompetence(id: number, data: any): Observable<Competence>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/competences';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data)); 
        return this.httpClient.post<Competence>(url, body, {'headers':headers});
    }

    //competence service
    updateCompetence(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/competence/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Competence>(url, body, {'headers':headers});
    }

    deleteCompetence(id: number)
    {
        const url = this.BASE_PATH + '/competence/' + id.toString();
        return this.httpClient.delete<Competence>(url);
    }

    //-------------------------LANGUE-----------------------------
    getLangue(id: number): Observable<Langue[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/langues';
        return this.httpClient.get<Langue[]>(url);
    }

    createLangue(id: number, data: any): Observable<Langue>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/langues';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data)); 
        return this.httpClient.post<Langue>(url, body, {'headers':headers});
    }

    //langue service
    updateLangue(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/langue/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Langue>(url, body, {'headers':headers});
    }

    deleteLangue(id: number)
    {
        const url = this.BASE_PATH + '/langue/' + id.toString();
        return this.httpClient.delete<Langue>(url);
    }

    //-------------------------ENTRETIEN-----------------------------
    getEntretien(id: number): Observable<Entretien[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/entretiens';
        return this.httpClient.get<Entretien[]>(url);
    }

    createEntretien(id: number, data: any): Observable<Entretien>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/entretiens';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data)); 
        return this.httpClient.post<Entretien>(url, body, {'headers':headers});
    }

    //entretien service
    updateEntretien(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/entretien/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Entretien>(url, body, {'headers':headers});
    }

    deleteEntretien(id: number)
    {
        const url = this.BASE_PATH + '/entretien/' + id.toString();
        return this.httpClient.delete<Entretien>(url);
    }

    //-------------------------PROJET-----------------------------
    getProjet(id: number): Observable<Projet[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/projets';
        return this.httpClient.get<Projet[]>(url);
    }

    createProjet(id: number, data: any): Observable<Projet>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/projets';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data)); 
        return this.httpClient.post<Projet>(url, body, {'headers':headers});
    }

    //projet service
    updateProjet(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/projet/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Projet>(url, body, {'headers':headers});
    }

    deleteProjet(id: number)
    {
        const url = this.BASE_PATH + '/projet/' + id.toString();
        return this.httpClient.delete<Projet>(url);
    }

    //-------------------------DOCUMENT-----------------------------

    getDocuments(id: number): Observable<Document[]>
    {
        const url = this.BASE_PATH + '/candidat/' + id.toString() + '/documents';
        return this.httpClient.get<Document[]>(url);
    }

    createDocument(id: number, data: any): Observable<Document>
    {
        const url   = this.BASE_PATH + '/candidat/' + id.toString() + '/documents';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data)); 
        return this.httpClient.post<Document>(url, body, {'headers':headers});
    }

    //document service
    updateDocument(id: number, data: any)
    {
        const url   = this.BASE_PATH + '/document/' + id.toString();
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        let body    = JSON.stringify(Object.fromEntries(data))
        return this.httpClient.put<Document>(url, body, {'headers':headers});
    }

    deleteDocument(id: number)
    {
        const url = this.BASE_PATH + '/document/' + id.toString();
        return this.httpClient.delete<Document>(url);
    }

}
