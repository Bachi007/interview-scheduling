import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileservicesService {
  headers = new HttpHeaders({
    'Content-type': 'application/json'
  })


  constructor(private http: HttpClient) { }
  getProfile(empId){
    console.log("empId",empId);
    return this.http.get('http://localhost:3000/api/profile?empId='+empId);
  }
}
