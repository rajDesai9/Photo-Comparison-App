import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComparisonComponent } from './photo-list-comparison/photo-list-comparison.component';


const routes: Routes = [
  {
    path: '',
    component: PhotoListComparisonComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
