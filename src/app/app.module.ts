import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ActiveToDoComponent } from './active-to-do/active-to-do.component';
import { TodoService } from './todo.service';
import { ActiveToDoService } from './active-to-do.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TagListComponent,
    ProgressBarComponent,
    ActiveToDoComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule
    
  ],
  providers: [TodoService, ActiveToDoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
