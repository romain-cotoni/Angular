import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService 
{
    BASE_PATH = 'http://localhost:9000';
    SESSION   = 'authenticatedSession';
    
    public username! : String;
    public password! : String;
    private subject = new Subject<any>();
    
    constructor(private httpClient: HttpClient)
    {

    }


    login(username: string, password: string)
    {
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        var body    = {username,password};

        return this.httpClient.post<User>(this.BASE_PATH + '/auth/login', body, {'headers': headers})
        .pipe(map(userData => {
            sessionStorage.setItem("username", username);
            let tokenStr = "Bearer " + userData.accessToken;
            sessionStorage.setItem("token", tokenStr);
            /*console.log(userData.id);
            console.log(userData.username);
            console.log(userData.accessToken);
            console.log(tokenStr);*/
            this.sendLoggedStatus();
          })
        );
    }

    
    logout()
    {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
    }
    
    
    isUserLoggedIn()
    {
        return sessionStorage.getItem("username") !== null ? true : false;
    }


    getUsername()
    {
        return sessionStorage.getItem("username");
    }


    sendLoggedStatus()
    {
        return this.subject.next({ boolean: true });
    }


    getLoggedStatus(): Observable<boolean> 
    { 
        return this.subject.asObservable();
    }

    createUser(body: any)
    {
        const url   = this.BASE_PATH + '/auth/createUser';
        var headers = new HttpHeaders({ 'content-type': 'application/json'});
        return this.httpClient.post(url, body, {'headers':headers});
    }
}
