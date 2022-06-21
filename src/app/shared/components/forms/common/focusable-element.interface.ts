export interface IFocusableElement {
  focused: boolean;
  onFocus(event: FocusEvent): void;
  onFocusIn(event: FocusEvent): void;
  onFocusOut(event: Event): void;
}
