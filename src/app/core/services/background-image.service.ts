import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BackgroundImageService {
  public readonly backgroundImage$: Observable<Nullable<IMedia>>;
  private readonly _backgroundImage$: BehaviorSubject<Nullable<IMedia>>;

  constructor() {
    this._backgroundImage$ = new BehaviorSubject<Nullable<IMedia>>(null);
    this.backgroundImage$ = this._backgroundImage$.asObservable();
  }

  public setBackgroundImage(image: IMedia): void {
    this._backgroundImage$.next(image);
  }
}
