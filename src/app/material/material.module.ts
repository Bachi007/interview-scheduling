import { NgModule } from '@angular/core';
import {MatButtonModule,MatSidenavModule, MatToolbarModule, MatIconModule} from '@angular/material';

const  material=[
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule
]

@NgModule({
  imports: [material],
  exports:[material]
})
export class MaterialModule { }
