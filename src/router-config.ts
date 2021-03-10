import { Route } from "@angular/router";
import { ButtonsAppComponent } from "./buttons-app/buttons-app.component";

const indexRoute: Route = {
    path: "",
    component: ButtonsAppComponent
};

const fallbackRoute: Route = {
    path: '**',
    component: ButtonsAppComponent
};

export const routeConfig = [
    {
        path: 'buttons-app',
        component: ButtonsAppComponent
    },
    fallbackRoute,
    indexRoute
];