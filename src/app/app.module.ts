import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SfcComponentsModule} from '../../projects/sfc-components/src/lib/sfc-components.module';
import { RouterModule } from '@angular/router';
import { routeConfig } from 'src/router-config';
import { ButtonAppComponent } from 'src/button-app/button-app.component';
import { ModalAppComponent } from 'src/modal-app/modal-app.component';
import { TabAppComponent } from 'src/tab-app/tab-app.component';
import { SideMenuAppComponent } from 'src/menu-app/side/side-menu-app.component';
import { NavigationMenuAppComponent } from 'src/menu-app/navigation/navigation-menu-app.component';
import { AvatarAppComponent } from 'src/avatar-app/avatar-app.component';
import { StarsAppComponent } from 'src/stars-app/stars-app.component';
import { ProgressAppComponent } from 'src/progress-app/progress-app.component';
import { TagsAppComponent } from 'src/tags-app/tags-app.component';
import { DropdownMenuAppComponent } from 'src/menu-app/dropdown/dropdown-menu-app.component';
import { CarouselAppComponent } from 'src/carousel/carousel-app.component';
import { SliderAppComponent } from 'src/slider-app/slider-app.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonAppComponent,
    ModalAppComponent,
    TabAppComponent,
    SideMenuAppComponent,
    NavigationMenuAppComponent,
    AvatarAppComponent,
    StarsAppComponent,
    ProgressAppComponent,
    TagsAppComponent,
    DropdownMenuAppComponent,
    CarouselAppComponent,
    SliderAppComponent
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
