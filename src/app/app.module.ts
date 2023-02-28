import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { AcademicsViewComponent } from './academics-view/academics-view.component';
import { BackgroundComponent } from './background/background.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import { ContactViewComponent } from './contact-view/contact-view.component';
import { EntryComponent } from './entry/entry.component';
import { PageComponent } from './page/page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    AcademicsViewComponent,
    BackgroundComponent,
    ProjectsViewComponent,
    ContactViewComponent,
    EntryComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
