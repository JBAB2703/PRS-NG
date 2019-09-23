import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestLine } from '../model/requestline.class';


@Injectable({
  providedIn: 'root'
})
export class RequestLinesService {
  url: string = 'http://localhost:59556/api/requestLine';
  
  constructor(
    private http: HttpClient
  ){}
  
  list(): Observable<RequestLine[]> {
    return this.http.get(this.url) as Observable<RequestLine[]>;
  }
  get(id: number): Observable<RequestLine> {
    return this.http.get(this.url+"/"+id) as Observable<RequestLine>;
  }
  create(line: RequestLine): Observable<any> {
    return this.http.post(this.url, line) as Observable<any[]>;
  }
  edit(line: RequestLine): Observable<any> {
    return this.http.put(this.url+"/"+line.id, line) as Observable<any>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url+"/"+id);
  }

}
