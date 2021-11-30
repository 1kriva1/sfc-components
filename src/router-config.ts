import { Route } from "@angular/router";
import { AvatarAppComponent } from "./avatar-app/avatar-app.component";
import { ButtonAppComponent } from "./button-app/button-app.component";
import { CarouselAppComponent } from "./carousel/carousel-app.component";
import { ChartAppComponent } from "./chart-app/chart-app.component";
import { DropdownMenuAppComponent } from "./menu-app/dropdown/dropdown-menu-app.component";
import { NavigationMenuAppComponent } from "./menu-app/navigation/navigation-menu-app.component";
import { SideMenuAppComponent } from "./menu-app/side/side-menu-app.component";
import { ModalAppComponent } from "./modal-app/modal-app.component";
import { NotificationAppComponent } from "./notification-app/notification-app.component";
import { ProgressAppComponent } from "./progress-app/progress-app.component";
import { SchemeAppComponent } from "./scheme-app/scheme-app.component";
import { SliderAppComponent } from "./slider-app/slider-app.component";
import { StarsAppComponent } from "./stars-app/stars-app.component";
import { TabAppComponent } from "./tab-app/tab-app.component";
import { TagsAppComponent } from "./tags-app/tags-app.component";
import { TimeLineAppComponent } from "./timeline-app/timeline-app.component";

const indexRoute: Route = {
    path: "",
    component: ButtonAppComponent
};

const fallbackRoute: Route = {
    path: '**',
    component: ButtonAppComponent
};

export const routeConfig = [
    {
        path: 'button-app',
        component: ButtonAppComponent
    },
    {
        path: 'modal-app',
        component: ModalAppComponent
    },
    {
        path: 'tab-app',
        component: TabAppComponent
    },
    {
        path: 'side-menu-app',
        component: SideMenuAppComponent
    },
    {
        path: 'navigation-menu-app',
        component: NavigationMenuAppComponent
    },
    {
        path: 'dropdown-menu-app',
        component: DropdownMenuAppComponent
    },
    {
        path: 'avatar-app',
        component: AvatarAppComponent
    },
    {
        path: 'stars-app',
        component: StarsAppComponent
    },
    {
        path: 'progress-app',
        component: ProgressAppComponent
    },
    {
        path: 'tags-app',
        component: TagsAppComponent
    },
    {
        path: 'carousel-app',
        component: CarouselAppComponent
    },
    {
        path: 'slider-app',
        component: SliderAppComponent
    },
    {
        path: 'notification-app',
        component: NotificationAppComponent
    },
    {
        path: 'timeline-app',
        component: TimeLineAppComponent
    },
    {
      path: 'chart-app',
      component: ChartAppComponent
    },
    {
      path: 'scheme-app',
      component: SchemeAppComponent
    },
    fallbackRoute,
    indexRoute
];
