import { Nullable } from '@core/types/nullable.type';

export interface IColor {
  r: number;
  g: number;
  b: number;
}

export enum BrightnessLevelEnum {
  LIGHT = 'light',
  DARK = 'dark'
}

export type BrightnessLevelType = BrightnessLevelEnum.LIGHT | BrightnessLevelEnum.DARK;

export abstract class ColorsHelper {
  public static brightnessDifference = 125;

  public static hexToRGB(hex: string): Nullable<IColor> {
    if (!hex) {
      return null;
    }

    hex = hex.toLowerCase();

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  /**
   * Make hex color lighten or darken
   * @param hex color
   * @param percent percent to make color lighten or darken. Positive percent - make lighten. Negative - darken
   * @returns color
   */
  public static lightenDarkenHex(hex: string, percent: number): string {
    const color = hex.slice(1);
    const num = parseInt(color, 16);
    let r = (num >> 16) + percent;
    let g = (num & 0x0000ff) + percent;
    let b = ((num >> 8) & 0x00ff) + percent;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return '#' + (g | (b << 8) | (r << 16)).toString(16);
  }

  // http://www.w3.org/TR/AERT#color-contrast
  public static getBrightness(color: IColor): number {
    return Math.round((color.r * 299 + color.g * 587 + color.b * 114) / 1000);
  }

  public static getBrightnessLevel(color: IColor | string): BrightnessLevelType {
    const rgb = typeof color === 'string' ? this.hexToRGB(color) : color;

    return this.getBrightness(rgb as IColor) > this.brightnessDifference
      ? BrightnessLevelEnum.LIGHT
      : BrightnessLevelEnum.DARK;
  }
}
