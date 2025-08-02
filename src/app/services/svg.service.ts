import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer, Subject, BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private svgSubject = new BehaviorSubject<string | null>(null);
  svg$ = this.svgSubject.asObservable();
    private history:string[] = [];
  private index = -1;

  constructor(private httpClient: HttpClient) {}

  getInitalsInSVG(name: string): Observable<string> {

    const url = "https://tagdiscovery.com/api/get-initials";
    let params = new HttpParams()
      .set('name', name);
      //.set('delay', 10);
      
      return this.httpClient.get(url, { params,responseType: 'text' }).pipe(
        catchError(err => throwError(() => new Error(`API error: ${err}`))),
        tap((svg:string) =>{
          this.updateHistory(svg);
          this.svgSubject.next(svg);
        })
      );
  }

  updateHistory(svg:string){
    this.history = this.history.slice(0, this.index + 1);
    this.history.push(svg);
    this.index++;
    console.table(this.history);
  }

  goBack(){
    if (this.index > 0) {
      this.index--;
      this.svgSubject.next(this.history[this.index]);
    }
  }

  goForward(){
    if (this.index < this.history.length-1) {
      this.index++;
      this.svgSubject.next(this.history[this.index]);
    }
  }

  canGoBack():boolean{
    return this.index > 0;
  }

  canGoForward():boolean{
    return this.index < this.history.length-1;
  }


}
