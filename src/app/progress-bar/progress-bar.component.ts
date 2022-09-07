import { Component, OnInit, Input,NgModule } from '@angular/core';


@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
 
  constructor() { }

  ngOnInit(): void {
    
  }
  @Input() widtheo: number = 0;
}
