/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Page Object für die About Seite
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 10.05.2017, 2017.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PostsService {
    readonly ENDPOINT_URL = 'http://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {
    }

    getAllPosts(): Observable<any> {
        return this.http.get(this.ENDPOINT_URL);
    }

    getPostById(id): Observable<any> {
        return this.http.get(`${this.ENDPOINT_URL}/${id}`);
    }
}
