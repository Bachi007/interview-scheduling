import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { JobListComponent } from './job-list/job-list.component';
import { MyNavComponent } from './my-nav/my-nav.component';
import { AuthguardGuard } from './services/authguard.guard';
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"dashboard",component:MyNavComponent},

{path:"dashboard",
  component:MyNavComponent,
  children:[
  {path:'profile',component:ProfileComponent,canActivate:[AuthguardGuard]},
  {path:'candidatelist',component:CandidateListComponent},
  {path:'jobslist',component:JobListComponent}
]
}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
