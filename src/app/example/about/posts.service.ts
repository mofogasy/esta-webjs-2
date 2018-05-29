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
import {Observable} from 'rxjs';
import {Post} from './posts.model';

@Injectable()
export class PostsService {
    readonly ENDPOINT_URL = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: HttpClient) {
    }

    getAllPosts(): Observable<Array<Post>> {
        return this.http.get<Array<Post>>(this.ENDPOINT_URL);
    }

    getPostById(id): Observable<Post> {
        return this.http.get<Post>(`${this.ENDPOINT_URL}/${id}`);
    }
}
