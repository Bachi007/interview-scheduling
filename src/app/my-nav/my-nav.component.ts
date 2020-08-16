import { Component, TemplateRef, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjectService } from '../services/project.service';
import { CandidateService } from '../services/candidate.service';
import { Router } from '@angular/router';
import { AuthservicesService } from '../services/authservices.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { ToastrManager } from 'ng6-toastr-notifications';

 

@Component({
  selector: 'app-my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent implements OnInit {
  name:"";
  description:""
  techstack:""
  required:""
  submitted:""
  newProject=null;
  selected: "";
  uName=""
  uEmail=""
  uTechstack=""
  uPhone=""
  addUser: Object;
  position: any = "bottom-right";
  projectDetails:any=[];
  result: any;
  pro: any;
  uResume: '';
  downloadURL: any;
  projectUpdate: boolean;
  candidateUpdate: boolean;
  spinner: boolean = false;

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
          this.downloadURL = downloadURL;
          this.spinner = false;
        })
      })
  }

  addProject() {
    var newProject = {
      "pName": this.name,
      "pDescription": this.description,
      "techStach": this.techstack,
      "required": this.required,
      "submitted": this.submitted,
      "selected":this.selected

    }
    this.projectService.addProject(newProject).subscribe(result => {
      if(result){
        this.newProject=result;
        console.log("project details are :",this.newProject);
        //@input and @output
        this.toastr.successToastr('Requirement Added', 'Success!', {
          position: this.position
        }); this.projectUpdate=true
        
        this.projectService.updateProjectList(this.projectUpdate)
        

      }
      else{
        this.projectUpdate=false;
        this.projectService.updateProjectList(this.projectUpdate)
      }
    })
    this.clear();

  }
  
  projectName(event){
    this.pro=event.target.value;
    console.log("ProjectName event",this.pro);
  }
  

  addCandidate() {
    var newUser = {
      "userName": this.uName,
      "userMail": this.uEmail,
      "skillSet": this.uTechstack,
      "phoneNo": this.uPhone,
      "pName":this.pro,
      "resume": this.downloadURL 
    }
    this.candidateService.addCandidate(newUser).subscribe(result => {
      if(result){
        this.addUser=result;
        console.log("candidate details are :",this.addUser)
        this.toastr.successToastr('Candidate Added', 'Success!', {
          position: this.position
        }); this.projectUpdate=true
        this.projectService.updateProjectList(this.projectUpdate)
      }
      else{
        this.projectUpdate=false;
        this.projectService.updateProjectList(this.projectUpdate)
      }
    })
    this.clear();
}

clear(){
   this.uName='';
   this.uEmail='';
   this.uTechstack='';
  this.uPhone='';
   this.pro='';
   this.downloadURL=''; 
   this.name='';
   this.description='';
   this.techstack='';
    this.required='';
}



  constructor(private router:Router,
    private candidateService: CandidateService,
    private projectService: ProjectService,
    private breakpointObserver: BreakpointObserver,
    private modalService: BsModalService,
    private authServices:AuthservicesService,
    private storage:AngularFireStorage,
    public toastr: ToastrManager
    ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projectDetails = data;
      console.log("button project", this.projectDetails)  
    })
    
  }
  modalRef: BsModalRef;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    
 
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    
  }
  openModal1(template1: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template1);
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  
  
}
