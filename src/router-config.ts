import { Route } from "@angular/router";
import { ButtonAppComponent } from "./button-app/button-app.component";
import { ModalAppComponent } from "./modal-app/modal-app.component";
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
    fallbackRoute,
    indexRoute
];