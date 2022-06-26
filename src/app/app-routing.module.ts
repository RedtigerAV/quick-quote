import { AppRoutePath } from './app.route-path';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './modules/user-layout/user-layout.component';
import { QuotePageComponent } from './modules/quote-page/quote-page.component';
import { QuotePageGuard } from './modules/quote-page/guards/quote-page.guard';
import { BookmarksGuard } from './modules/quote-page/guards/bookmarks.guard';
import { ErrorPageComponent } from './modules/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuotePageComponent,
        canActivate: [QuotePageGuard, BookmarksGuard]
      },
      {
        path: AppRoutePath.ABOUT,
        pathMatch: 'full',
        loadChildren: () => import('./modules/about-page/about-page.module').then(m => m.AboutPageModule)
      },
      {
        path: AppRoutePath.CONTACT,
        pathMatch: 'full',
        loadChildren: () => import('./modules/contact-page/contact-page.module').then(m => m.ContactPageModule)
      },
      {
        path: AppRoutePath.OOPS,
        pathMatch: 'full',
        component: ErrorPageComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
