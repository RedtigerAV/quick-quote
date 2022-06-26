import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Инициализирует переменную в шаблоне.
 * @example <i *ngVar="false as variable">{{ variable | json }}</i>
 */
// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: '[ngVar]' })
export class NgVarDirective {
  // tslint:disable-next-line: no-any
  public context: any = {};

  // tslint:disable-next-line: no-any
  constructor(private readonly vcRef: ViewContainerRef, private readonly templateRef: TemplateRef<any>) {}

  @Input()
  public set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  private updateView(): void {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
