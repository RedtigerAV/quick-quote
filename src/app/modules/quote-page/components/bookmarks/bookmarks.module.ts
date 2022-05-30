import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookmarksComponent } from './bookmarks.component';

@NgModule({
  imports: [CommonModule],
  exports: [BookmarksComponent],
  declarations: [BookmarksComponent]
})
export class BookmarksModule {}
