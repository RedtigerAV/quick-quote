import { IMedia } from '@core/models/media.model';
import { Observable, filter, map } from 'rxjs';
import { BackgroundImageService } from '@core/services/background-image.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  public readonly imageUrl$: Observable<string>;

  constructor(backgroundImageService: BackgroundImageService) {
    this.imageUrl$ = backgroundImageService.backgroundImage$.pipe(
      filter(Boolean),
      map(({ url }: IMedia) => url)
    );
  }

  ngOnInit(): void {}
}
