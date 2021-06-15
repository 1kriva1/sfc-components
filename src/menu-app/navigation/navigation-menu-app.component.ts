import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'navigation-menu-app',
    templateUrl: './navigation-menu-app.component.html',
    styleUrls: [
        '../menu-app.component.css',
        '../../app/app.component.css'
    ]
})
export class NavigationMenuAppComponent extends BaseAppComponent {

    selectedItemId: string;

    private menuConfig: any = {
        items: [
            {
                label: 'Scores',
                icon: 'fas fa-star',
                id: 'football',
                isActive: false,                
            },
            {
                label: 'Live',
                icon: 'fab fa-line',
                id: 'live',
                isActive: false,                
            },
            {
                label: 'Analytics',
                icon: 'fas fa-chart-pie',
                id: 'analytics',
                isActive: false,                
            },
            {
                label: 'Discussions',
                icon: 'fab fa-discourse',
                id: 'discussions',
                isActive: false,                
            },
            {
                label: 'Teams',
                icon: 'fas fa-user-friends',
                id: 'teams',
                isActive: false,                
            },
            {
                label: 'News',
                icon: 'fas fa-newspaper',
                id: 'news',
                isActive: false,                
            }
        ]
    }
    
    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }

    onSelect(item: any) {
        this.selectedItemId = item.id;
    }
}