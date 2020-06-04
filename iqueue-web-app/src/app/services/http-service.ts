import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login-service'

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient,
        private loginService: LoginService) {

    }

    headers: HttpHeaders = new HttpHeaders().set('Authorization', `Basic ${this.loginService.authToken}`)
                                            .set('Access-Control-Allow-Origin', '*')

    get(url: string) {
        return this.httpClient
            .get(url, {headers: this.headers})
    }

    post(url: string, model: object) {
        return this.httpClient
            .post(url, model, {headers: this.headers})
    }

    update(url: string, model: object) {
        return this.httpClient
            .put(url, model, {headers: this.headers})
    }

    delete(url: string) {
        return this.httpClient
            .delete(url, {headers: this.headers})
    }

}