import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {TagListComponent} from './tag-list/tag-list.component';

import {ActiveToDoComponent} from './active-to-do/active-to-do.component';
import {TodoService} from './todo.service';
import {ActiveToDoService} from './active-to-do.service';
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TagListComponent,
    ActiveToDoComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,

  ],
  providers: [TodoService, ActiveToDoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
