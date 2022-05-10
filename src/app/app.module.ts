import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundImageModule } from './modules/background-image/background-image.module';
import { QuotePageModule } from './modules/quote-page/quote-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BackgroundImageModule, QuotePageModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
