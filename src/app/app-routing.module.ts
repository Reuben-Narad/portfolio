
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicsViewComponent } from './academics-view/academics-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { PageComponent } from './page/page.component';


const routes: Routes = [
{ path: 'academics', component: AcademicsViewComponent, data: { animation: 'isRight'}},
  { path: 'home', component: HomeViewComponent, data: { animation: null }},
  { path: 'projects', component: ProjectsViewComponent, data: { animation: 'isRight' }},
  { path: 'projects-back', component: ProjectsViewComponent, data: { animation: 'isLeft' }},
  { path: 'contact', component: ContactViewComponent, data: { animation: 'isRight' }},
  { path: 'freshman', component: ContactViewComponent, data: { animation: 'isRight' }},
  { path: 'page', component: PageComponent, data: { animation: 'isRighter' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
