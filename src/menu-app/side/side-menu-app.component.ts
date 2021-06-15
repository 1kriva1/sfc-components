import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'side-menu-app',
    templateUrl: './side-menu-app.component.html',
    styleUrls: [
        '../menu-app.component.css',
        '../../app/app.component.css'
    ]
})
export class SideMenuAppComponent extends BaseAppComponent {

    selectedItemId: string;

    private menuConfig: any = {
        items: [
            {
                type: 'header'
            },
            {
                label: 'Football',
                icon: 'fas fa-futbol',
                type: 'item-with-sub',
                id: 'football',
                isActive: false,
                items: [
                    {
                        label: 'Find',
                        icon: 'fas fa-search',
                        type: 'item',
                        id: 'football_find',
                        isActive: false,
                    },
                    {
                        label: 'Create',
                        icon: 'fas fa-plus',
                        type: 'item',
                        id: 'football_create',
                        isActive: false,
                    },
                    {
                        label: 'View',
                        icon: 'fas fa-info',
                        type: 'item',
                        id: 'football_view',
                        isActive: true,
                    }
                ]
            },
            {
                label: 'Basketball',
                icon: 'fas fa-basketball-ball',
                type: 'item',
                id: 'basket',
                isActive: false
            },
            {
                label: 'Tennis',
                icon: 'fas fa-table-tennis',
                type: 'item-with-sub',
                id: 'tennis',
                isActive: false,
                items: [
                    {
                        label: 'Find',
                        icon: 'fas fa-search',
                        type: 'item',
                        id: 'tennis_find',
                        isActive: false,
                    },
                    {
                        label: 'Create',
                        icon: 'fas fa-plus',
                        type: 'item',
                        id: 'tennis_create',
                        isActive: false,
                    },
                    {
                        label: 'View',
                        icon: 'fas fa-info',
                        type: 'item',
                        id: 'tennis_view',
                        isActive: false,
                    }
                ]
            },
            {
                label: 'Valleyball',
                icon: 'fas fa-volleyball-ball',
                type: 'item',
                id: 'valley'
            },
            {
                label: 'Cricket',
                icon: 'fas fa-quidditch',
                type: 'item',
                id: 'cricket'
            },
            {
                label: 'Rugby',
                icon: 'fas fa-football-ball',
                type: 'item',
                id: 'rugby'
            },
            {
                label: 'Boxing',
                icon: 'fas fa-dumbbell',
                type: 'item',
                id: 'box'
            },
            {
                label: 'Categories',
                type: 'title'
            },
            {
                label: 'Baseball',
                icon: 'fas fa-baseball-ball',
                type: 'item',
                id: 'baseball'
            },
            {
                label: 'Bowling',
                icon: 'fas fa-bowling-ball',
                type: 'item',
                id: 'bowling'
            },
            {
                label: 'Hockey',
                icon: 'fas fa-hockey-puck',
                type: 'item',
                id: 'hockey'
            },
            {
                label: 'Biking',
                icon: 'fas fa-biking',
                type: 'item',
                id: 'bike'
            }
        ],
        isOpen: true
    }

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
        this.selectedItemId = this.menuConfig.items[1].id;
    }

    onSelect(item: any) {
        this.selectedItemId = item.id;
    }
}