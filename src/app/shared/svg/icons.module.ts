import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { qqBookmarkIcon } from './icons/bookmark';
import { qqBookmarkFilledIcon } from './icons/bookmark-filled';
import { qqBookmarkRemoveIcon } from './icons/bookmark-remove';
import { qqBookmarksCollectionIcon } from './icons/bookmarks-collection';
import { qqCameraIcon } from './icons/camera';
import { qqCancelIcon } from './icons/cancel';
import { qqContactIcon } from './icons/contact';
import { qqCopyIcon } from './icons/copy';
import { qqDoneIcon } from './icons/done';
import { qqErrorIcon } from './icons/error';
import { qqFcbIcon } from './icons/fcb';
import { qqImageIcon } from './icons/image';
import { qqInfoIcon } from './icons/info';
import { qqIosAddIcon } from './icons/ios-add';
import { qqIosShareIcon } from './icons/ios-share';
import { qqLogoIcon } from './icons/logo';
import { qqMoreIcon } from './icons/more';
import { qqNextIcon } from './icons/next';
import { qqPauseIcon } from './icons/pause';
import { qqPlayIcon } from './icons/play';
import { qqPreviousIcon } from './icons/previous';
import { qqQuoteIcon } from './icons/quote';
import { qqSettingsIcon } from './icons/settings';
import { qqShareIcon } from './icons/share';
import { qqTelegramIcon } from './icons/telegram';
import { qqTipsIcon } from './icons/tips';
import { qqTwtrIcon } from './icons/twtr';
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
        qqBookmarkRemoveIcon,
        qqFcbIcon,
        qqTelegramIcon,
        qqWhatsappIcon,
        qqTwtrIcon,
        qqCancelIcon,
        qqPlayIcon,
        qqPauseIcon,
        qqMoreIcon,
        qqSettingsIcon,
        qqLogoIcon,
        qqInfoIcon,
        qqContactIcon,
        qqImageIcon,
        qqDoneIcon,
        qqTipsIcon,
        qqErrorIcon,
        qqCopyIcon,
        qqIosAddIcon,
        qqIosShareIcon
      ]
    })
  ],
  exports: [SvgIconsModule]
})
export class IconsModule {}
