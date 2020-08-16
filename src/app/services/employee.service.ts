import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  headers = new HttpHeaders({
    'Content-type': 'application/json'
  })
  constructor(private http: HttpClient) { }
  
  getEmployee(){
    return this.http.get('http://localhost:3000/api/employee');
  }

  
  setSchedule(body,userId){
    return this.http.post('http://localhost:3000/api/interview?userId='+userId,body);
  }
  updateUrl(url,userId){
    return this.http.put('http://localhost:3000/api/storeUrls?userId='+userId,url);
  }

}
