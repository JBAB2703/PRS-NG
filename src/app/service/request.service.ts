import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Request } from '../model/request.class';
import { RequestCreate } from '../model/request-create.class';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = 'http://localhost:59556/api/requests';
  
  constructor(
    private http: HttpClient
  ){}
  
  list(): Observable<Request[]> {
    console.log('calling request list api');
    return this.http.get(this.url) as Observable<Request[]>;
  }
  get(id: number): Observable<Request> {
    return this.http.get(this.url+"/"+id) as Observable<Request>;
  }
  create(request: RequestCreate): Observable<any> {
    return this.http.post(this.url, request) as Observable<any[]>;
  }
  edit(request: Request): Observable<any> {
    return this.http.put(this.url+"/"+request.id, request) as Observable<any>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.url+"/"+id);
  }

}
