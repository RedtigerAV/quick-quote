import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessorBase } from './control-value-accessor.base';
import { IFocusableElement } from './focusable-element.interface';

@Directive()
export abstract class PrimitiveTextControl extends ControlValueAccessorBase implements IFocusableElement {
  @ViewChild('primitiveTextElement', { static: true }) public primitiveTextElement!: ElementRef<HTMLElement>;

  @Input() public name!: string;
  @Input() public label?: string;
  @Input() public placeholder = '';

  public override value!: string;
  protected _focused!: boolean;

  constructor(protected readonly renderer: Renderer2) {
    super();
  }

  @HostBinding('class.focused')
  public get focused(): boolean {
    return this._focused || false;
  }
  public set focused(value: boolean) {
    this._focused = value;
  }

  @HostBinding('class.has-value')
  public get hasValue(): boolean {
    return !!this.value;
  }

  @HostBinding('class.has-label')
  public get hasLabel(): boolean {
    return !!this.label;
  }

  @HostBinding('attr.tabindex')
  public get tabIndex(): number {
    return 0;
  }

  @HostListener('focus')
  public onFocus(): void {
    this.primitiveTextElement.nativeElement.focus();
  }

  public onFocusIn(): void {
    this.focused = true;
    this.updatePlaceholderVisibility();
  }

  public onFocusOut(): void {
    this.focused = false;
    this.updatePlaceholderVisibility();
    this.onTouched();
  }

  protected updatePlaceholderVisibility(): void {
    if (this.focused || !this.hasLabel) {
      this.renderer.setAttribute(this.primitiveTextElement.nativeElement, 'placeholder', this.placeholder || '');
    } else {
      this.renderer.removeAttribute(this.primitiveTextElement.nativeElement, 'placeholder');
    }
  }
}
