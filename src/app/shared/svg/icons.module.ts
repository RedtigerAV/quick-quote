import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { qqBookmarkIcon } from './icons/bookmark';
import { qqBookmarkFilledIcon } from './icons/bookmark-filled';
import { qqBookmarksCollectionIcon } from './icons/bookmarks-collection';
import { qqCameraIcon } from './icons/camera';
import { qqCancelIcon } from './icons/cancel';
import { qqFacebookIcon } from './icons/facebook';
import { qqNextIcon } from './icons/next';
import { qqPreviousIcon } from './icons/previous';
import { qqQuoteIcon } from './icons/quote';
import { qqShareIcon } from './icons/share';
import { qqTelegramIcon } from './icons/telegram';
import { qqTwitterIcon } from './icons/twitter';
import { qqWhatsappIcon } from './icons/whatsapp';

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
        qqBookmarkFilledIcon,
        qqBookmarksCollectionIcon,
        qqFacebookIcon,
        qqTelegramIcon,
        qqWhatsappIcon,
        qqTwitterIcon,
        qqCancelIcon
      ]
    })
  ],
  exports: [SvgIconsModule]
})
export class IconsModule {}
