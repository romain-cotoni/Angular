import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    username!: string | null;
    password!: string | null;
    token!   : string | null;

    constructor(){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if((this.username = sessionStorage.getItem("username")) !== null && (this.token = sessionStorage.getItem("token")) !== null)
        {
            const authReq = req.clone({ setHeaders: { Authorization:this.token } });
            return next.handle(authReq);
        }
        else
        {
            return next.handle(req);
        }
    }
}