/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-Tests PostService
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 26.04.2017, 2017.
 */
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {async, inject, TestBed} from '@angular/core/testing';

import {PostsService} from './posts.service';

describe('PostsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule],
            providers: [PostsService]
        });
    });

    it('returns observable in getAllPosts() ',
        async(inject([PostsService, HttpTestingController], (sut: PostsService, backend: HttpTestingController) => {
            // given
            const response = [{
                id: 1,
                msg: 'Hello, I am badman'
            }, {
                id: 2,
                msg: 'Hello, I am the friendly neighborhood spider'
            }];

            // when
            const obs = sut.getAllPosts();

            // then
            obs.subscribe(actualResponse => {
                expect(actualResponse).toEqual(response);
            });

            backend.expectOne({
                url: sut.ENDPOINT_URL,
                method: 'GET'
            }).flush(response);
        }))
    );

    it('should return a specific post when we call getPostById',
        async(inject([PostsService, HttpTestingController], (sut: PostsService, backend: HttpTestingController) => {
            // given
            const response = {
                id: 1,
                msg: 'Hello, I am Batman'
            };
            const id = 1;

            // when
            const obs = sut.getPostById(id);

            // then
            obs.subscribe(actualResponse => {
                expect(actualResponse).toEqual(response);
            });

            backend.expectOne({
                url: `${sut.ENDPOINT_URL}/${id}`,
                method: 'GET'
            }).flush(response);
        }))
    );
});
