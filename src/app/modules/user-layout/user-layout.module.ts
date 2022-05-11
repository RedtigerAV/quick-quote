import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [UserLayoutComponent],
  declarations: [UserLayoutComponent],
  providers: []
})
export class UserLayoutModule {}
