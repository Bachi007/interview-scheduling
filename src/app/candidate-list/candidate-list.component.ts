import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { AuthservicesService } from '../services/authservices.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TemplateRef } from '@angular/core';//model importer
import { EmployeeService } from '../services/employee.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  position: any = "bottom-right";
  model;
  modalRef: BsModalRef;//model importer
  candidateDetails: any = [];
  employeeDetails: any;
  result: any;
  searchValue: any;
  person: any;
  InterviewerPerson: any;
  time: any;
  sample: any;
  duration: any;
  addSchedule: Object;
  urls: any;
  interviewURL: any;
  recruiterURL: any;
  candidates: any = [];
  iCandidates: any = [];
  feedbackValue = '';
  candidatefeedDetails: Object;
  minDate;
  date = new Date();
  modelData: any;
  managerCandidates: any = [];
  indexValue: any;
  urlData: any = [];
  resumeUrl: any;
  weboutput: SafeResourceUrl; 
  constructor(private candidateService: CandidateService,
    private authServices: AuthservicesService,
    private modalService: BsModalService,
    private employeeService: EmployeeService,
    public toastr: ToastrManager,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.candidateService.getCandidate().subscribe(result => {
      this.candidateDetails = result;
      console.log("Details are", this.candidateDetails)

      this.candidateDetails.forEach(element => {
        this.managerCandidates.unshift(element);
      })

      var empData = JSON.parse(localStorage.getItem('emp'));
      this.sample = empData.data;

      console.log("local data ", this.sample);

      this.candidateDetails.forEach(candidate => {
        if (candidate.interviewerName) {
          this.candidates.unshift(candidate);
        }

      })

      this.candidateDetails.forEach(cand => {
        if (cand.interviewerName == this.sample.empName) {
          this.iCandidates.unshift(cand);
        }
      })


      console.log("candidates :", this.candidates)
    })

    this.employeeService.getEmployee().subscribe(data => {
      this.employeeDetails = data;

      console.log("InterVierwer details", data)
    })


    this.minDate = { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() };



  }


  // module popUp
  openModal(template: TemplateRef<any>, candidateName, index) {
    this.indexValue = index
    this.modalRef = this.modalService.show(template);
    for (let i = 0; i < this.candidateDetails.length; i++) {
      if (this.candidateDetails[i].userName == candidateName) {
        this.person = this.candidateDetails[i]
        console.log("candidateRow details =", this.person);
      }
    }

    for (let i = 0; i < this.employeeDetails.length; i++) {

      if (this.person.interviewerName == this.employeeDetails[i].empName) {
        this.InterviewerPerson = this.employeeDetails[i]
        console.log("InterviewerPersonModule", this.InterviewerPerson)
      }
    }
  }
  openModal1(template: TemplateRef<any>,userId) {
    this.modalRef = this.modalService.show(template);
    for (let i = 0; i < this.candidateDetails.length; i++) {
      if (this.candidateDetails[i]._id == userId) {
        this.resumeUrl = this.candidateDetails[i]
        console.log("resume details =", this.resumeUrl);
        this.weboutput = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrl.resume);
        console.log("secured url",this.weboutput)
      }
    }



  }
  openModal3(template: TemplateRef<any>, candidateId) {
    this.modalRef = this.modalService.show(template);
    this.canId = candidateId;

  }
  giveFeedback() {
    var feed = {
      'feedback': this.feedbackValue

    }
    console.log("CID", this.canId);
    this.candidateService.updateFeedback(feed, this.canId).subscribe(result => {
      this.candidatefeedDetails = result;
      console.log("Details are", this.candidatefeedDetails)
    })
    this.toastr.successToastr(' Feedback submitted', 'Success!', {
      position: this.position
    });
  }
  canId(arg0: string, canId: any) {
    throw new Error("Method not implemented.");
  }

  //creating th eevent to assign interviewer
  interviewerName(event) {
    this.result = event.target.value
    console.log("Event", event.target.value)
  }

  //assigning the interviewer to candidate
  assign(id) {
    var data = {
      "interviewerName": this.result
    }
    this.candidateService.updateInterviewer(data, id).subscribe(value => {
      // this.intervieweDetails= vaule;
      console.log('value', value);
    })
    this.toastr.successToastr('Interviewer assigned ', 'Success!', {
      position: this.position
    });
  }

  //search 
  searchCandidate() {
    this.managerCandidates =[]
    this.candidateService.getSearch(this.searchValue).subscribe(data => {
      this.managerCandidates = data;
      console.log("search details are", this.managerCandidates)
    })

    
  }
  searchCandidateForDev() {
  this.iCandidates =[]

  this.candidateService.getSearch(this.searchValue).subscribe(result => {
    this.iCandidates = result;
 
    console.log("search details are", this.iCandidates)
    
  })

}


  //skype api
  schedule() {
    var callBody = {
      "participants": [
        { "name": this.person.userName, "email": this.person.userMail, "role": "candidate" },
        { "name": this.InterviewerPerson.empName, "email": this.InterviewerPerson.email, "role": "interviewer" }
      ],
      "scheduling": {
        "start": this.modelData.year + "-" + this.modelData.month + "-" + this.modelData.day + " " + this.time.hour + ":" + this.time.minute,
        "duration": this.duration
      }
    }
    this.employeeService.setSchedule(callBody, this.person._id).subscribe(result => {
      if (result) {
        // this.addSchedule=result;
        this.urls = result['urls'];
        console.log("candidate details are :", this.urls)

        var urlBody = {
          'urls': this.urls
        }
        this.employeeService.updateUrl(urlBody, this.person._id).subscribe(data => {
          console.log("Stored successfully", data);
          this.candidates=[];
          this.ngOnInit();

        })
        this.toastr.successToastr('Scheduled Successfully', 'Success!', {
          position: this.position
        });
       

      }

    })

  }

  openUrl(id) {
    this.candidateService.getUrl(id).subscribe(data => {
      this.urlData = data['urls'];
      console.log("user Id",id);
      console.log("url data is: ",data);
      this.urlData.forEach(element => {
        if (element.type == "Interview" && element.participantType == "Recruiter") {
          this.recruiterURL = element.url;
        }
      });
      console.log("Inter URL ", this.recruiterURL);
      window.open(this.recruiterURL)
    })
    console.log("into window")
  }
  openDevUrl(id) {
    this.candidateService.getUrl(id).subscribe(data => {
      this.urlData = data['urls'];
      this.urlData.forEach(element => {
        if (element.type == "Interview" && element.participantType == "Interviewer") {
          this.interviewURL = element.url;
        }
      });
      console.log("Inter URL ", this.interviewURL);
      window.open(this.interviewURL)
    })

    console.log("into window")
  }

  viewInterview() {
    console.log("success", this.recruiterURL);
    window.open(this.recruiterURL);
  }
}



//just the skype api

