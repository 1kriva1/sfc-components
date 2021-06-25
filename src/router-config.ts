import { Route } from "@angular/router";
import { AvatarAppComponent } from "./avatar-app/avatar-app.component";
import { ButtonAppComponent } from "./button-app/button-app.component";
import { NavigationMenuAppComponent } from "./menu-app/navigation/navigation-menu-app.component";
import { SideMenuAppComponent } from "./menu-app/side/side-menu-app.component";
import { ModalAppComponent } from "./modal-app/modal-app.component";
import { StarsAppComponent } from "./stars-app/stars-app.component";
import { TabAppComponent } from "./tab-app/tab-app.component";

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
        path: 'avatar-app',
        component: AvatarAppComponent
    },
    {
        path: 'stars-app',
        component: StarsAppComponent
    },
    fallbackRoute,
    indexRoute
];