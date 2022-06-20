import { Component, ChangeDetectionStrategy, AfterViewInit, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimitiveTextControl } from '../common/primitive-text-control.base';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextareaComponent
    }
  ]
})
export class TextareaComponent extends PrimitiveTextControl implements AfterViewInit {
  private static nextId = 0;

  public readonly id = `qq-textarea-element-${TextareaComponent.nextId++}`;

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
