import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { qqBookmarkIcon } from './icons/bookmark';
import { qqBookmarksCollectionIcon } from './icons/bookmarks-collection';
import { qqCameraIcon } from './icons/camera';
import { qqNextIcon } from './icons/next';
import { qqPreviousIcon } from './icons/previous';
import { qqQuoteIcon } from './icons/quote';
import { qqShareIcon } from './icons/share';

@NgModule({
  imports: [
    SvgIconsModule.forRoot({
      icons: [
        qqQuoteIcon,
        qqCameraIcon,
        qqNextIcon,
        qqPreviousIcon,
        qqShareIcon,
        qqBookmarkIcon,
        qqBookmarksCollectionIcon
      ]
    })
  ],
  exports: [SvgIconsModule]
})
export class IconsModule {}
