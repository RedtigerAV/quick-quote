import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicToastError } from '@shared/components/basic-toast/basic-toast';
import { InputModeEnum, InputType } from '@shared/components/forms/input/input.enums';
import { ToasterService } from '@shared/services/toaster/toaster.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent implements OnInit {
  public readonly form!: FormGroup;
  public readonly inputModeEnum = InputModeEnum;
  public readonly inputType = InputType;

  constructor(formBuilder: FormBuilder, private readonly toaster: ToasterService) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.toaster.open(
        new BasicToastError({
          title: 'Ooops. The form is invalid',
          content: 'Please make sure that you have filled in all the fields and entered your email correctly'
        })
      );
    }
  }
}
