import { combineLatest, filter, map, Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { MediaFacade } from '@core/redux/media/media.facade';
import { SetupImagesService } from './services/setup-images.service';
import { MediaLoaderService } from './services/media-loader.service';

const IMAGE_POSITION_OFFSET = 1;

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  public readonly images$: Observable<Array<IMedia>>;
  public readonly selectedImage$: Observable<IMedia>;
  public readonly currentImagePosition$: Observable<number>;
  public readonly maxSafeNumber = Number.MAX_SAFE_INTEGER;

  constructor(
    mediaFacade: MediaFacade,
    private readonly setupImagesService: SetupImagesService,
    private readonly mediaLoaderService: MediaLoaderService
  ) {
    this.images$ = combineLatest([
      mediaFacade.images$.pipe(filter(images => !!images?.length)),
      mediaFacade.selectedImagePosition$.pipe(filter(position => position !== null))
    ]).pipe(
      map(([images, position]) =>
        images.slice(
          Math.max(0, (position as number) - IMAGE_POSITION_OFFSET),
          Math.min(images.length, (position as number) + IMAGE_POSITION_OFFSET + 1)
        )
      )
    );
    this.selectedImage$ = mediaFacade.selectedImage$.pipe(filter(Boolean));
    this.currentImagePosition$ = combineLatest([this.images$, mediaFacade.selectedImageID$.pipe(filter(Boolean))]).pipe(
      map(([images, selectedID]) => images.findIndex(({ id }) => id === selectedID))
    );
  }

  public ngOnInit(): void {
    this.mediaLoaderService.init();
    this.setupImagesService.setupImages();
  }
}
