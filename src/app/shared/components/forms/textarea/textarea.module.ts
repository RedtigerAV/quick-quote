import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TextareaComponent } from './textarea.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [TextareaComponent],
  declarations: [TextareaComponent],
  providers: []
})
export class TextareaModule {}
