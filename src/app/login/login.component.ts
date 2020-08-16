import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userId: any;
  pwd: any;
  details: Object;
  position: any = "bottom-right"


  // submit(req,res){
  //   if(this.userId==req.body.empId && this.pwd==req.body.password){
  //     console.log(this.userId+''+this.pwd)
  //     localStorage.setItem('isLoggedIn',this.userId);
  //     this.router.navigateByUrl("/dashboard/profile");

  //   }
  // }

  constructor(private router: Router,
    private AuthservicesService: AuthservicesService,
    public toastr: ToastrManager) { }

  submit() {
    var empDetails = {
      "empId": this.userId,
      "password": this.pwd
    }
    this.AuthservicesService.auth(empDetails).subscribe(result => {
      var check: any = result;
      //  console.log("result",this.details);
      if (check.isAuth == true) {




        this.router.navigateByUrl("/dashboard/profile");
        this.toastr.successToastr('LoggedIn Successfully', 'Success!', {
          position: this.position
        });
        // console.log("candidate details are :",this.details)
        console.log("login result :", result);

        this.AuthservicesService.storeUserData(result);
      }
      else {
        this.router.navigateByUrl("/login");
        this.toastr.errorToastr('Entered wrong credentials.', 'Oops!', {
          position: this.position
        });
      }


    })
  }

  ngOnInit() {
  }

}
