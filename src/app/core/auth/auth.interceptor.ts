import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {AuthService} from 'esta-webjs-extensions';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: this.authService.getAuthHeader()
        });
        return next.handle(request)
            .catch((err: any) => {
                if (err.status === 401 || err.status === 403) {
                    this.authService.login();
                }
                return Observable.throw(err);
            });
    }
}