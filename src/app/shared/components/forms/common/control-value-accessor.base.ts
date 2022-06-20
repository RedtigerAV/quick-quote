import { ControlValueAccessor } from '@angular/forms';

export class ControlValueAccessorBase implements ControlValueAccessor {
  public value: any;
  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  public writeValue(value: any): void {
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
