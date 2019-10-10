import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteService } from './shared/note/note.service';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaAuthInterceptor, OktaAuthService } from './shared/okta';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'notes', component: NoteListComponent, canActivate: [OktaAuthGuard]},
{path: 'notes/:id', component: NoteDetailComponent, canActivate: [OktaAuthGuard]},
{path: '', redirectTo: '/notes', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [NoteService, OktaAuthService, OktaAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: OktaAuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
