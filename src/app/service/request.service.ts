import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Request } from '../model/request.class';
import { RequestCreate } from '../model/requestcreate.class';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  baseUrl: string = 'http://localhost:59556/api/';
  requestsUri: string = 'requests';
  reviewRequestsUri: string = 'GetRequestForReview';
  submitForReviewUri: string = 'SetStatusReview';
  approvedUri: string = 'SetStatusApproved';
  rejectedUri: string = 'SetStatusRejected';
  
  constructor(
    private http: HttpClient
  ){}
  
  list(): Observable<Request[]> {
    console.log('calling request list api');
    return this.http.get(this.baseUrl + this.requestsUri) as Observable<Request[]>;
  }
  get(id: number): Observable<Request> {
    return this.http.get(this.baseUrl + this.requestsUri + "/" + id) as Observable<Request>;
  }
  getReviewableRequestsForUser(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + this.reviewRequestsUri + "/" + userId) as Observable<Request>;
  }
  create(request: RequestCreate): Observable<any> {
    return this.http.post(this.baseUrl + this.requestsUri, request) as Observable<any[]>;
  }
  edit(request: Request): Observable<any> {
    return this.http.put(this.baseUrl + this.requestsUri + "/"+request.id, request) as Observable<any>;
  }
  submitForReview(id: number): Observable<any> {
    return this.http.get(this.baseUrl + this.submitForReviewUri + "/" + id);
  }
  approveRequest(id: number): Observable<any> {
    return this.http.get(this.baseUrl + this.approvedUri + "/" + id);
  }
  rejectRequest(id: number): Observable<any> {
    return this.http.get(this.baseUrl + this.rejectedUri + "/" + id);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.requestsUri + "/" + id);
  }

}
