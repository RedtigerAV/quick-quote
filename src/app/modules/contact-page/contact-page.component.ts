import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailDeliveryApiService } from '@core/api/mail-delivery-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BasicToastError, BasicToastSuccess } from '@shared/components/basic-toast/basic-toast';
import { InputModeEnum, InputType } from '@shared/components/forms/input/input.enums';
import { lock, locker, unlock } from '@shared/decorators/locker.decorator';
import { ToasterService } from '@shared/services/toaster/toaster.service';
import { finalize } from 'rxjs';

@UntilDestroy()
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

  constructor(
    formBuilder: FormBuilder,
    private readonly toaster: ToasterService,
    private readonly mailDeliveryApi: MailDeliveryApiService
  ) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(5000)]]
    });
  }

  ngOnInit(): void {}

  @locker()
  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.toaster.open(
        new BasicToastError({
          title: 'Ooops. The form is invalid',
          content: 'Please make sure that you have filled in all the fields and entered your email correctly'
        })
      );

      return;
    }

    lock(this, this.onSubmit);

    this.mailDeliveryApi
      .v1SendMail(this.form.value)
      .pipe(
        untilDestroyed(this),
        finalize(() => unlock(this, this.onSubmit))
      )
      .subscribe({
        next: () => {
          this.toaster.open(
            new BasicToastSuccess({
              title: 'The email has been sent',
              content: 'We will contact you soon! Stay in touch'
            })
          );

          this.form.reset();
        },
        error: () => {
          this.toaster.open(
            new BasicToastError({
              title: 'Oh no! Something went wrong',
              content: 'Try to contact us later'
            })
          );
        }
      });
  }
}
