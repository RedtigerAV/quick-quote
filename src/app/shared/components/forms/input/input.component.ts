import { Component, ChangeDetectionStrategy, Input, Renderer2, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimitiveTextControl } from '../common/primitive-text-control.base';
import { InputModeEnum, InputType } from './input.enums';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent extends PrimitiveTextControl implements AfterViewInit {
  private static nextId = 0;

  @Input() public inputMode: InputModeEnum = InputModeEnum.TEXT;
  @Input() public type: InputType = InputType.TEXT;
  @Input() public autocomplete: string = '';

  public readonly id = `qq-input-element-${InputComponent.nextId++}`;

  constructor(renderer: Renderer2) {
    super(renderer);
  }

  ngAfterViewInit(): void {
    this.updatePlaceholderVisibility();
  }

  public updateValue(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
