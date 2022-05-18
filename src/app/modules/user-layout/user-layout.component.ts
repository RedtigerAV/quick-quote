import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { MediaFacade } from '@core/redux/media/media.facade';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  public readonly images$: Observable<Array<IMedia>>;
  public selectedImageID$: Observable<Nullable<string>>;

  constructor(mediaFacade: MediaFacade) {
    this.images$ = mediaFacade.images$;
    this.selectedImageID$ = mediaFacade.selectedImageID$;
  }

  public ngOnInit(): void {}
}
