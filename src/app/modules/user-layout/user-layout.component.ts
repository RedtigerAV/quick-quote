import { Observable } from 'rxjs';
import { BackgroundImageService } from '@core/services/background-image.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IMedia } from '@core/models/media.model';
import { Nullable } from '@core/types/nullable.type';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLayoutComponent implements OnInit {
  public readonly images: Array<IMedia>;
  public selectedImageID$: Observable<Nullable<string>>;

  constructor(private readonly backgroundImageService: BackgroundImageService) {
    this.images = backgroundImageService.imagesQueue;
    this.selectedImageID$ = backgroundImageService.selectedImageID$;
  }

  ngOnInit(): void {
    this.backgroundImageService.init();
  }
}
