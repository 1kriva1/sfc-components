import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SfcComponentsModule} from '../../projects/sfc-components/src/lib/sfc-components.module';
import { RouterModule } from '@angular/router';
import { routeConfig } from 'src/router-config';
import { ButtonAppComponent } from 'src/button-app/button-app.component';
import { ModalAppComponent } from 'src/modal-app/modal-app.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonAppComponent,
    ModalAppComponent
  ],
  imports: [
    BrowserModule,
    SfcComponentsModule.forRoot(),
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
