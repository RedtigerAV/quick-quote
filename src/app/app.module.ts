import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLayoutModule } from './modules/user-layout/user-layout.module';
import { QuotePageModule } from './modules/quote-page/quote-page.module';
import { effects } from '@core/redux/index.effects';
import { reducers } from '@core/redux/index.reducers';
import { IconsModule } from '@shared/svg/icons.module';
import { ViewportModule } from '@core/services/viewport/viewport.module';
import { ToasterModule } from '@shared/services/toaster/toaster.module';
import { HammerGestureProvider } from '@core/configuration/hammer.configuration';
import { BasicToastModule } from '@shared/components/basic-toast/basic-toast.module';
import { TipsModule } from '@core/services/tips/tips.module';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    AppRoutingModule,
    UserLayoutModule,
    QuotePageModule,
    IconsModule,
    BasicToastModule,
    TipsModule,
    ViewportModule.forRoot({
      breakpoints: {
        xs: 0,
        sm: 430,
        md: 840,
        lg: 1024,
        xl: 1280
      }
    }),
    ToasterModule.forRoot({
      autoClose: true,
      duration: 5000
    }),
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [HammerGestureProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
