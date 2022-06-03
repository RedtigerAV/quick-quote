import { Component, OnInit } from '@angular/core';
import { AnimationProcessService } from '@core/services/animations/animation-process.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly animationProcess: AnimationProcessService) {}

  public ngOnInit(): void {
    this.animationProcess.init();
  }
}
