import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { MediaApiService } from '@core/api/media-api.service';

const IMAGES_QUEUE_MAX_SIZE = 3;

@Injectable({ providedIn: 'root' })
export class BackgroundImageService {
  /**
   * Queue of images. Max size - 3 images
   */
  public readonly imagesQueue: Array<IMedia>;
  public readonly selectedImageID$: Observable<Nullable<string>>;
  private readonly _selectedImageID$: BehaviorSubject<Nullable<string>>;

  constructor(private readonly mediaAPI: MediaApiService) {
    this.imagesQueue = [];
    this._selectedImageID$ = new BehaviorSubject<Nullable<string>>(null);
    this.selectedImageID$ = this._selectedImageID$.asObservable();
  }

  public init(): void {
    this.mediaAPI.v1MediaRead({ count: 2 }).subscribe(result => {
      this._selectedImageID$.next(result[0].id);
      this.imagesQueue.push(...result);
    });
  }

  public loadImage(): Observable<IMedia> {
    return this.mediaAPI.v1MediaRead({ count: 1 }).pipe(
      map(([image]) => image),
      tap(image => this.imagesQueue.push(image)),
      tap(() => {
        if (this.imagesQueue.length > IMAGES_QUEUE_MAX_SIZE) {
          this.imagesQueue.shift();
        }
      })
    );
  }

  public selectImage(imageID: string): void {
    const imageIDs = this.imagesQueue.map(({ id }) => id);

    if (!imageID || !imageIDs.includes(imageID)) {
      throw new Error(`Unknown image id: ${imageID}`);
    }

    this._selectedImageID$.next(imageID);
  }
}
