import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { ProjectService } from '../services/project.service';
import { BsModalService } from 'ngx-bootstrap/modal';//model importer
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';//model importer
import { TemplateRef } from '@angular/core';//model importer
import { AuthservicesService } from '../services/authservices.service';
import { Validators } from '@angular/forms'
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';




@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  modalRef: BsModalRef;//model importer
  position:any="bottom-right"

  uName = '';
  uEmail = '';
  uTechstack = '';
  uPhone: '';
  projectDetails:any = [];
  addUser = null;
  uResume: '';

  downloadURL: any;
  project: any;
  job: any;
  managerProjectDetails: any=[];
  pro: any;
  spinner: boolean = false;

  constructor(private authService: AuthservicesService,
    private projectService: ProjectService,
    private candidateService: CandidateService,
    private modalService: BsModalService,
    private storage: AngularFireStorage,
    public toastr: ToastrManager) { }




  ngOnInit() {

    this.getData();
    this.projectService.requirementUpdate.subscribe((message:any)=>{
      console.log('message from navbar',message);
      if(message==true){
        this.getData();
      }
    })

  }

  //get all interview data
  getData() {

    this.projectService.getProjects().subscribe(result => {
     // console.log("result",result)
      this.projectDetails = []
      this.projectDetails = result;
      //console.log("Details are", this.projectDetails)
this.managerProjectDetails = []
      this.projectDetails.forEach(element => {
        this.managerProjectDetails.unshift(element);

      });
      console.log("data",this.managerProjectDetails)
      
    });
    this.projectDetails = [];


  }

  upload(event) {
    this.spinner = true;
    const file = event.target.files[0]
    const path = `resumes/${new Date().getTime()}`;
    const fileRef = this.storage.ref(path);
    const task = this.storage.ref(path).put(file);
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${path}/${"fileName"}`).put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          this.downloadURL = downloadURL
          this.spinner = false;
        })
      })
  }

  addCandidate() {
    var newUser = {
      "userName": this.uName,
      "userMail": this.uEmail,
      "skillSet": this.uTechstack,
      "phoneNo": this.uPhone,
      "pName":this.job.pName,
      "resume": this.downloadURL

      
    }
   
    
    this.candidateService.addCandidate(newUser).subscribe(result => {
      
        this.addUser=result;
        console.log("candidate details are :",this.addUser)
        this.getData();
        this.toastr.successToastr('Candidate Added', 'Success!', {
          position: this.position
          
        });   
        
         

    })
  }



  // addCandidate() {
  //   var newUser = {
  //     "userName": this.uName,
  //     "userMail": this.uEmail,
  //     "skillSet": this.uTechstack,
  //     "phoneNo": this.uPhone,
  //     "resume": this.downloadURL
  //   }
  
  //   this.candidateService.addCandidate(newUser).subscribe(result => {
  //     this.addUser = result;
  //     console.log("candidate details are :", this.addUser)
  //     this.toastr.successToastr('Candidate added successfully', 'Success!', {
  //       position: this.position
        
  //   });

  //   })
  //   this.ngOnInit()


  // }
  // ngOnInit() {
  //   this.projectService.getProjects().subscribe(result => {
  //     this.projectDetails = result;
  //     console.log("Details are", this.projectDetails)
  //   })
  // }


  // addCandidate() {
  //   var newUser = {
  //     "userName": this.uName,
  //     "userMail": this.uEmail,
  //     "skillSet": this.uTechstack,
  //     "phoneNo": this.uPhone
  //   }


  // model importer
  openModal(template: TemplateRef<any>, projectNames) {
    this.modalRef = this.modalService.show(template);
    for (let i = 0; i < this.projectDetails.length; i++) {
      if (this.projectDetails[i].pName == projectNames) {
        this.job = this.projectDetails[i]
        console.log("projectRow details =", this.job);
      }
    }
  }


}
