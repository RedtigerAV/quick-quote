import { ControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessorBase implements ControlValueAccessor {
  public value: any;
  protected onChange = (value: any) => {};
  protected onTouched = () => {};

  protected abstract detectChanges(): void;

  public writeValue(value: any): void {
    this.value = value;
    this.detectChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
