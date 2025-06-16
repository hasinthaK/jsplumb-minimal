import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocReteJsComponent } from './poc-rete-js/poc-rete-js.component';
import { DefaultComponent } from './default/default.component';
import { PocJsplumbComponent } from './poc-jsplumb/poc-jsplumb.component';

@NgModule({
  declarations: [
    AppComponent,
    PocReteJsComponent,
    DefaultComponent,
    PocJsplumbComponent,
  ],
  imports: [BrowserModule, RouterModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
