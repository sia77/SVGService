import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvgService {

  private svgSubject = new Subject<string>();
  svg$ = this.svgSubject.asObservable();
  

  constructor(private httpClient: HttpClient) {}

  getInitalsInSVG(name:string){
    const url = "https://tagdiscovery.com/api/get-initials";
    let params = new HttpParams()
    .set('name', name)
    .set('delay', 10);


    this.httpClient.get(url, { params, responseType: 'text' })
    .subscribe(response => {
      this.svgSubject.next(response)
      console.log(response);
    });

  }



  




}
