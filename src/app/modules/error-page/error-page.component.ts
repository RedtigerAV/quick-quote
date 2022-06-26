import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public toQuotes(): void {
    this.router.navigate(['/']);
  }
}
