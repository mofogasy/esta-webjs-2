import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from 'esta-webjs-extensions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {HTTP_STATUS_CODE} from './http-status-codes.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: this.authService.getAuthHeader()
        });
        return next.handle(request)
            .catch((error: any) => this.handleErrorResponses(error));
    }

    private handleErrorResponses(error: any): Observable<any> {
        if (error instanceof HttpErrorResponse) {
            if (error.status === HTTP_STATUS_CODE.UNAUTHORIZED || error.status === HTTP_STATUS_CODE.FORBIDDEN) {
                this.authService.login();
            }
        }
        return Observable.throw(error);
    }
}