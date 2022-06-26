import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgVarDirective } from './ng-var.directive';

@NgModule({
  declarations: [NgVarDirective],
  imports: [CommonModule],
  exports: [NgVarDirective]
})
export class NgVarModule {}
