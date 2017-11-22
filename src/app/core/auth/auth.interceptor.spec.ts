/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-test für den Authentifiezierungs-Interceptor
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 4.4.4
 * @since 22.11.2017, 2017.
 */
import {AuthInterceptor} from './auth.interceptor';
import {AuthService} from 'esta-webjs-extensions';
import {HttpErrorResponse, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HTTP_STATUS_CODE} from './http-status-codes.model';

describe('auth.interceptor', () => {

    let sut;
    let authService;

    beforeEach(() => {
        authService = jasmine.createSpyObj<AuthService>('authService', ['getAuthHeader', 'login']);
        sut = new AuthInterceptor(authService);
    });

    describe('intercept', () => {

        it('must clone the request and add the authHeaders', () => {
            // given
            const request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone']);
            const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
            const authHeader = {'Authorization': 'Bearer some token'};

            next.handle.and.returnValue(Observable.never());
            authService.getAuthHeader.and.returnValue(authHeader);

            // when
            sut.intercept(request, next);

            // then
            expect(request.clone).toHaveBeenCalledWith({
                setHeaders: authHeader
            });
        });

        it('must call next on the handler with the cloned request', () => {
            // given
            const request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone']);
            const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
            const authHeader = {'Authorization': 'Bearer some token'};
            const clonedRequest = 'A cloned request';

            request.clone.and.returnValue(clonedRequest);
            next.handle.and.returnValue(Observable.never());
            authService.getAuthHeader.and.returnValue(authHeader);

            // when
            sut.intercept(request, next);

            // then
            expect(next.handle).toHaveBeenCalledWith(clonedRequest);
        });

        it('must throw an error in case of a failed request', done => {
            // given
            const request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone']);
            const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
            const authHeader = {'Authorization': 'Bearer some token'};
            const errorMessage = 'Something went wrong';

            next.handle.and.returnValue(Observable.throw(errorMessage));
            authService.getAuthHeader.and.returnValue(authHeader);

            // when
            const intercept$ = sut.intercept(request, next);

            // then
            const observer = {
                error: error => {
                    expect(error).toEqual(errorMessage);
                    done();
                }
            };
            intercept$.subscribe(observer);
        });

        it('must call login on the authService for unauthorized requests', done => {
            // given
            const request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone']);
            const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
            const authHeader = {'Authorization': 'Bearer some token'};
            const error = {
                error: 'Something went wrong',
                status: HTTP_STATUS_CODE.UNAUTHORIZED
            };
            const httpError = new HttpErrorResponse(error);

            next.handle.and.returnValue(Observable.throw(httpError));
            authService.getAuthHeader.and.returnValue(authHeader);

            // when
            const intercept$ = sut.intercept(request, next);

            // then
            const observer = {
                error: err => {
                    expect(err).toEqual(httpError);
                    expect(authService.login).toHaveBeenCalled()
                    done();
                }
            };
            intercept$.subscribe(observer);
        });
    });
});
