import { HtmlToImageExtensionEnum } from '@core/services/html-to-image/html-to-image.strategy';

export interface ISettingsData {
  slideshowTime: number;
  snapshotExtension: HtmlToImageExtensionEnum;
  selectedQuoteTopicsIDs: Array<string>;
  selectedPhotoTopicsIDs: Array<string>;
}
