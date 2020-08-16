import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private candid = new BehaviorSubject<any>('');
  requirementUpdate = this.candid.asObservable();

  headers = new HttpHeaders({
    'Content-type': 'application/json'
  })

  constructor(private http: HttpClient) { }

  getCandidate() {
    return this.http.get('http://localhost:3000/api/user');
  }

  addCandidate(candidate){
    return this.http.post('http://localhost:3000/api/users', candidate);
  }
  updateInterviewer(data,userId){
    return this.http.put('http://localhost:3000/api/usersUpdate?userId='+userId,data);
  }
  getSearch(id) {
    return this.http.get('http://localhost:3000/api/users/search?search='+id);
  }
  updateFeedback(data1,userId){
    return this.http.put('http://localhost:3000/api/feedback?userId='+userId,data1);
  }

  getUrl(userId){
    return this.http.get('http://localhost:3000/api/url/?userId='+userId);
  }

  updateCandidateList(message: any) {
    console.log('message from updateCandidateList ts',message)
    this.candid.next(message)
  }
  
}
