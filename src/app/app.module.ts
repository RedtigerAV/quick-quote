import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
