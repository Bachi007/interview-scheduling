import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule}  from '@angular/router' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { ProfileComponent } from './profile/profile.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { CandidateService } from './services/candidate.service';
import { ProjectService } from './services/project.service';
import { ModalModule, BsModalRef } from 'ngx-bootstrap';
import { LoginComponent } from './login/login.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ng6-toastr-notifications';








const ROUTES:Routes=[
  
  
]

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    ProfileComponent,  
    CandidateListComponent,
    JobListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    ToastrModule.forRoot()
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [CandidateService,ProjectService,ModalModule,BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { 
  time = {hour: 13, minute: 30};

}
