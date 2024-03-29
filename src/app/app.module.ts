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
import { NotificationAppComponent } from 'src/notification-app/notification-app.component';
import { TimeLineAppComponent } from 'src/timeline-app/timeline-app.component';
import { ChartAppComponent } from 'src/chart-app/chart-app.component';
import { SchemeAppComponent } from 'src/scheme-app/scheme-app.component';
import { TableAppComponent } from 'src/table-app/table-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from '../table-app/badge/badge.component';
import { RowItemComponent } from '../table-app/row-item/row-item.component';
import { CardItemComponent } from '../table-app/card-item/card-item.component';
import { ColumnItemComponent } from '../table-app/column-item/column-item.component';
import { ExpandedRowItemComponent } from '../table-app/expanded-row-item/expanded-row-item.component';
import { ExpandedRowContentItemComponent } from '../table-app/expanded-row-item/expanded-row-content-item/expanded-row-content-item.component';

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
    SliderAppComponent,
    NotificationAppComponent,
    TimeLineAppComponent,
    ChartAppComponent,
    SchemeAppComponent,
    TableAppComponent,
    BadgeComponent,
    RowItemComponent,
    CardItemComponent,
    ColumnItemComponent,
    ExpandedRowItemComponent,
    ExpandedRowContentItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SfcComponentsModule.forRoot(),
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
