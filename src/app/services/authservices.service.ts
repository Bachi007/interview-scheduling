import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthservicesService {
  headers = new HttpHeaders({
    'Content-type': 'application/json'
  })
  emp: any;

  constructor(private _route:Router,private http: HttpClient) { }
  auth(isauth){
    return this.http.post('http://localhost:3000/api/login', isauth);
  }
  
  storeUserData(emp) {
    localStorage.setItem('emp', JSON.stringify(emp));
    this.emp = emp;
  }
  
  // getLocalData(emp) {
  //   localStorage.getItem('emp');
  // }

  managerLoggedIn() {
    var data1 = JSON.parse(localStorage.getItem('emp'));
    if (!data1) {
      data1 = null;
      return false;
    }
    else if (data1.data.role == "manager") {
      data1 = null;
      return true;
    }
    else {
      data1 = null;
      return false;
    }
  }
  
  recruiterLoggedIn() {
    var data1 = JSON.parse(localStorage.getItem('emp'));
    if (!data1) {
      data1 = null;
      return false;
    }
    else if (data1.data.role == "recruiter") {
      data1 = null;
      return true;
    }
    else {
      data1 = null;
      return false;
    }
  }

  developerLoggedIn() {
    var data1 = JSON.parse(localStorage.getItem('emp'));
    if (!data1) {
      data1 = null;
      return false;
    }
    else if (data1.data.role == "developer") {
      data1 = null;
      return true;
    }
    else {
      data1 = null;
      return false;
    }
  }

  

  
  }
    
//  isLoggedIn(){
  //    //console.log("logged in",localStorage.getItem('isLoggedIn'))
  //   if(localStorage.getItem('isLoggedIn')!=null){
  //     return true
  //   }
  //   else{
  //     return false
  //   }
  // }
  // isManager(){
  //   var user=localStorage.getItem('isLoggedIn');
  //   if(user==='manager')
  //   {
  //     return true;
  //   } else{
  //     return false
  //   }
  // }
  // isRecruiter(){
  //   var user=localStorage.getItem('isLoggedIn');
  //   if(user==='recruiter')
  //   {
  //     return true;
  //   } else {
  //     return false
  //   }
  // }
