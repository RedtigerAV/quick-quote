import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [InputComponent],
  declarations: [InputComponent],
  providers: []
})
export class InputModule {}
