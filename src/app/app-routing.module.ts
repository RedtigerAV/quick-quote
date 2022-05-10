import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './modules/user-layout/user-layout.component';
import { QuotePageComponent } from './modules/quote-page/quote-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuotePageComponent,
        // TODO: Guard to retrieve quote from query-params
        canActivate: []
      },
      {
        path: 'about',
        pathMatch: 'full',
        loadChildren: () => import('./modules/about-page/about-page.module').then(m => m.AboutPageModule)
      },
      {
        path: 'contact',
        pathMatch: 'full',
        loadChildren: () => import('./modules/contact-page/contact-page.module').then(m => m.ContactPageModule)
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
