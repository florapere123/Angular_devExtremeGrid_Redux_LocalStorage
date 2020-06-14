import { Injectable } from '@angular/core';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { v4 } from 'uuid';

import { Observable } from 'rxjs';

@Injectable()
export class CorrelationInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'X-Correlation-Id': v4()
            }
        });
        return next.handle(request);
    }
}

