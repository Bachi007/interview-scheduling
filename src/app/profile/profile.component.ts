import { Component, OnInit } from '@angular/core';
import {AuthservicesService} from '../services/authservices.service';
import {ProfileservicesService} from '../services/profileservices.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileDetails : any;
  data1: any;
  profileName: String = "";
  profileRole: String = "";
  profileEmail: String = "";
  profilePhno: String = "";
  constructor(private AuthservicesService:AuthservicesService ,private Profileservices:ProfileservicesService) { }

  ngOnInit() {
    var data1 = JSON.parse(localStorage.getItem('emp'));
    
    var empId1 = data1.data.empId;
    // console.log("data from local",empId1)
    this.Profileservices.getProfile(empId1).subscribe(dataEmp=>{
      this.profileDetails=dataEmp;
      this.profileRole = this.profileDetails.role;
      this.profileName = this.profileDetails.empName;
      this.profileEmail= this.profileDetails.email;
      this. profilePhno= this.profileDetails.empPhno;

      console.log("search details are from empId",this.profileDetails)
    })  
    }
  
  }

