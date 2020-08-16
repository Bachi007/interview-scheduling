import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private requirement = new BehaviorSubject<any>('');
  requirementUpdate = this.requirement.asObservable();
  headers = new HttpHeaders({
    'Content-type': 'application/json'
  })

  constructor(private http: HttpClient) { }

  addProject(project) {
    return this.http.post('http://localhost:3000/api/jobs', project);
  }

  getProjects() {
    return this.http.get('http://localhost:3000/api/job');
  }
  updateProjectList(message: any) {
    console.log('message from ts',message)
    this.requirement.next(message)
  }

}
