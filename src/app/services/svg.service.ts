import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer, Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private svgSubject = new BehaviorSubject<string | null>(null);
  svg$ = this.svgSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getInitalsInSVG(name: string): Observable<string> {

    const url = "https://tagdiscovery.com/api/get-initials";
    let params = new HttpParams()
      .set('name', name)
      .set('delay', 10);
      
      return this.httpClient.get(url, { params,responseType: 'text' }).pipe(
        tap(svg => this.svgSubject.next(svg))
      );
  }


}
