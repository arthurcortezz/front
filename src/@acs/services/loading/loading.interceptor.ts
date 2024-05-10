import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AcsLoadingService } from '@acs/services/loading/loading.service';

@Injectable()
export class AcsLoadingInterceptor implements HttpInterceptor {
  handleRequestsAutomatically: boolean;

  constructor(private readonly acsLoadingService: AcsLoadingService) {
    this.acsLoadingService.auto$.subscribe((value) => {
      this.handleRequestsAutomatically = value;
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.handleRequestsAutomatically) {
      return next.handle(req);
    }

    this.acsLoadingService.setLoadingStatus(true, req.url);

    return next.handle(req).pipe(
      finalize(() => {
        this.acsLoadingService.setLoadingStatus(false, req.url);
      })
    );
  }
}
