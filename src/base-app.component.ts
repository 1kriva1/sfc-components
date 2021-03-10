import { Router, ActivatedRoute } from '@angular/router';

export default abstract class BaseAppComponent {
    protected theme: string;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.theme = params.theme ? params.theme : "common";
        });
    }

    protected changeTheme(newTheme: string){
        this.router.navigate([], {
            queryParams: {theme: newTheme},
            relativeTo: this.activatedRoute
        });
    }
}