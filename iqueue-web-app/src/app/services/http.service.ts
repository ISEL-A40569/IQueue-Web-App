import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HttpService {

    constructor (private httpClient: HttpClient ) {

    }

    get(url: string) {
        return this.httpClient
            .get(url)
    }

    post(url: string, model: object) {
        return this.httpClient
            .post(url, model)
    }

    update(url: string, model: object) {
        return this.httpClient
            .put(url, model)
    }

    delete(url: string) {
        return this.httpClient
            .delete(url)
    }

}