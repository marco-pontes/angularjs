import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {ErrorPage} from './error/error';
import { AppComponent }        from './core/app.component';
import { HomeComponent }        from './home/home.component';
import { PriceComponent } from './price/price.component';
import { ContactComponent } from './contact/contact.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { NavbarComponent } from './core/navbar/navbar.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'price', component: PriceComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error', component: ErrorPage }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
        RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    )
  ],
  declarations: [
  	AppComponent,
    HomeComponent,
    PriceComponent,
    ContactComponent,
    SidebarComponent,
    NavbarComponent,
    ErrorPage
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
