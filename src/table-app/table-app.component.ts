import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { debounceTime, map, startWith, tap } from 'rxjs/operators';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'table-app',
    templateUrl: './table-app.component.html',
    styleUrls: [
        '../app/app.component.css',
        './table-app.component.css'
    ]
})
export class TableAppComponent extends BaseAppComponent implements OnInit {

    columnsDefault = [];
    columnsSorting = [];
    columnsSelectable = [];
    columnsModification = [];
    columnsBadges = [];
    columnsListItems = [];
    columnsExpanded = [];

    dataDefault = [];
    dataSync = [];
    dataAsync = [];
    dataColumnModifications = [];
    dataBadges = [];
    dataListItems = [];
    dataExpandedTemplate = [];
    dataExpandedReference = [];

    paginationConfig = { enabled: true, page: 2, pageSize: 2 };
    paginationBadgesConfig = { enabled: true, page: 1, pageSize: 5 };

    filterSyncFormGroup: FormGroup;
    filterAsyncFormGroup: FormGroup;

    dataSubject: BehaviorSubject<any>;
    filteredData$: Observable<any>;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
    }

    ngOnInit(): void {
        // default
        this.columnsDefault = this.getColumns();
        this.dataDefault = this.getData();

        // sorting
        this.columnsSorting = this.getColumns();
        this.columnsSorting.forEach(column => {
            column.sorting = { enabled: true, direction: 'descending', icons: [{ direction: 'ascending', icon: 'fa fa-car' }, { direction: 'descending', icon: 'fa fa-pen' }] }
        });

        // selectable
        this.columnsSelectable = this.getColumns();
        this.columnsSelectable.forEach((column, index) => {
            if (index % 2 == 0)
                column.icon = 'fa fa-car';
        });

        // sync data
        this.filterSyncFormGroup = new FormGroup({
            searchSyncData: new FormControl()
        });
        const dataInitialSync = this.getData();
        dataInitialSync.forEach((data, index) => {
            if (index % 2 == 0)
                data.selected = true;
        });
        this.filterSyncFormGroup.get('searchSyncData').valueChanges.pipe(
            startWith(''),
            debounceTime(500)
        ).pipe(
            tap(input => {
                if (!input)
                    this.dataSync = dataInitialSync;
                else
                    this.dataSync = dataInitialSync.filter(y => y.data.name.toLowerCase().indexOf(input) > -1);
            })
        ).subscribe();

        // async data
        this.filterAsyncFormGroup = new FormGroup({
            searchAsyncData: new FormControl()
        });
        this.dataAsync = this.getData();
        this.dataSubject = new BehaviorSubject(this.dataAsync);
        this.filteredData$ = combineLatest(
            this.dataSubject.asObservable(),
            this.filterAsyncFormGroup.get('searchAsyncData').valueChanges.pipe(
                startWith(''),
                debounceTime(500)
            )
        ).pipe(
            map(([data, input]) => {
                return data.filter(y => y.data.name.toLowerCase().indexOf(input) > -1);
            })
        );

        // columns modification
        this.columnsModification = this.getColumns();
        this.dataColumnModifications = this.getData();
        this.dataColumnModifications.forEach((item) => {
            item.newColumn = "new value";
        });

        // badges
        this.columnsBadges = this.getBadgesColumns();
        this.dataBadges = this.getBagdesData();

        // list of items
        this.columnsListItems = this.getListItemsColumns();
        this.columnsListItems.forEach(column => {
            column.sorting = { enabled: true, direction: 'ascending', icons: [{ direction: 'ascending', icon: 'fas fa-sort-amount-up' }, { direction: 'descending', icon: 'fas fa-sort-amount-down' }] }
        });
        this.dataListItems = this.getListItemsData();

        // expanded
        this.columnsExpanded = this.getExpandedColumns();
        this.dataExpandedTemplate = this.getExpandedData();
        this.dataExpandedReference = this.getExpandedData();
    }

    togglePagination() {
        this.paginationConfig.enabled = !this.paginationConfig.enabled;
    }

    toggleSorting() {
        let columnId = this.columnsDefault.find(c => c.fieldName = 'id');
        columnId.sorting.enabled = !columnId.sorting.enabled;
    }

    // SYNC DATA ACTIONS

    addItemSync() {
        this.dataSync.push({ data: { id: 13, name: 'new one', code: 8889, date: new Date() } });
    }

    removeItemSync() {
        this.dataSync.shift();
    }

    // END SYNC DATA ACTIONS

    // ASYNC DATA ACTIONS

    addItemAsync() {
        this.dataAsync.push({ data: { id: 13, name: 'new one', code: 8889, date: new Date() } });
        this.dataSubject.next(this.dataAsync);
    }

    removeItemAsync() {
        this.dataAsync.splice(-1);
        this.dataSubject.next(this.dataAsync);
    }

    // END ASYNC DATA ACTIONS

    // COLUMNS MODIFICATION

    addColumn() {
        this.columnsModification.push({
            columnName: 'New column',
            fieldName: 'newColumn',
            icon: 'fa fa-star',
            sorting: {
                enabled: true,
                direction: 'ascending',
                icons: [{ icon: 'fa fa-star', direction: 'descending' }, { icon: 'fa fa-car', direction: 'ascending' }]
            }
        });
    }

    removeColumn() {
        this.columnsModification.splice(-1);
    }

    // END COLUMNS MODIFICATION

    // STUBS

    private getColumns() {
        return [
            {
                columnName: 'Id',
                fieldName: 'id',
                icon: ''
            },
            {
                columnName: 'Name',
                fieldName: 'name',
                icon: ''
            },
            {
                columnName: 'Code',
                fieldName: 'code'
            },
            {
                columnName: 'Date',
                fieldName: 'date'
            },
            {
                columnName: 'Date1_asdasd',
                fieldName: 'date1'
            },
            {
                columnName: 'Date2_asdasd',
                fieldName: 'date2'
            }
        ];
    }

    private getData() {
        return [
            {
                data: {
                    id: 1,
                    name: 'name 1',
                    code: 111,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 2,
                    name: 'name 2',
                    code: 222,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 3,
                    name: 'name 3',
                    code: 333,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 4,
                    name: 'name 4',
                    code: 444,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 5,
                    name: 'name 5',
                    code: 555,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 6,
                    name: 'name 6',
                    code: 666,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 7,
                    name: 'name 7',
                    code: 777,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 8,
                    name: 'name 8',
                    code: 888,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 9,
                    name: 'name 9',
                    code: 8889,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 10,
                    name: 'name 10',
                    code: 88810,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 11,
                    name: 'name 11',
                    code: 88811,
                    date: new Date()
                },
                selected: false
            },
            {
                data: {
                    id: 12,
                    name: 'name 12',
                    code: 88812,
                    date: new Date()
                },
                selected: false
            },
        ];
    }

    private getBadgesColumns() {
        return [
            {
                columnName: '',
                fieldName: 'label'
            },
            {
                columnName: '',
                fieldName: 'icon'
            },
            {
                columnName: '',
                fieldName: 'color'
            }
        ]
    }

    private getBagdesData() {
        return [
            {
                data: {
                    label: 'INITIATOR',
                    icon: 'fa fa-bolt',
                    color: 'yellow'
                },
                selected: false
            },
            {
                data: {
                    label: 'Nuker',
                    icon: 'fa fa-car',
                    color: 'pink'
                },
                selected: false
            },
            {
                data: {
                    label: 'Disabler',
                    icon: 'fa fa-pen',
                    color: 'orange'
                },
                selected: false
            },
            {
                data: {
                    label: 'Ganker',
                    icon: 'fa fa-star',
                    color: 'red'
                },
                selected: false
            },
            {
                data: {
                    label: 'Durable',
                    icon: 'fa fa-anchor',
                    color: 'purple'
                },
                selected: false
            },
            {
                data: {
                    label: 'Roamer',
                    icon: 'fa fa-bicycle',
                    color: 'teal'
                },
                selected: false
            },
            {
                data: {
                    label: 'Pusher',
                    icon: 'fa fa-users',
                    color: 'blue'
                },
                selected: false
            },
            {
                data: {
                    label: 'Escape',
                    icon: 'fa fa-rocket',
                    color: 'blue-dark'
                },
                selected: false
            },
            {
                data: {
                    label: 'Jungler',
                    icon: 'fa fa-tree',
                    color: 'green'
                },
                selected: false
            },
            {
                data: {
                    label: 'Offlaner',
                    icon: 'fa fa-user fa-street-view',
                    color: 'green-dark'
                },
                selected: false
            },
            {
                data: {
                    label: 'Carry',
                    icon: 'fa fa-bolt',
                    color: 'silver'
                },
                selected: false
            },
            {
                data: {
                    label: 'SUPPORT',
                    icon: 'fa fa-magic',
                    color: 'gold'
                },
                selected: false
            }
        ]
    }

    private getListItemsColumns() {
        return [
            {
                columnName: 'Client',
                fieldName: 'client'
            },
            {
                columnName: 'Activity',
                fieldName: 'activity'
            },
            {
                columnName: 'On Date',
                fieldName: 'onDate'
            },
            {
                columnName: 'Status',
                fieldName: 'status'
            }
        ]
    }

    private getListItemsData() {
        return [
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Industrial Group LTD',
                    clientNumber: '02000240',
                    isVIP: true,
                    activity: 'Incoming transfer 2,000,000 USD',
                    onDate: '14.02.2022',
                    status: 'Processing'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Marry Roseberg',
                    clientNumber: '02000250',
                    isVIP: false,
                    activity: 'Requested new credit card',
                    onDate: '13.02.2022',
                    status: 'Processing'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Green Corporation LTD',
                    clientNumber: '02000260',
                    isVIP: true,
                    activity: 'Requested a loan',
                    onDate: '10.02.2022',
                    status: 'InReview'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Viena LTD',
                    clientNumber: '02000270',
                    isVIP: true,
                    activity: 'Passport expires',
                    onDate: '10.01.2022',
                    status: 'InReview'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Jane Brice',
                    clientNumber: '02000280',
                    isVIP: false,
                    activity: 'Payment card expires',
                    onDate: '10.10.2022',
                    status: 'NewCardIssue'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Nicole Marcus',
                    clientNumber: '02000290',
                    isVIP: true,
                    activity: 'Payment card expires',
                    onDate: '10.11.2022',
                    status: 'NewCardIssue'
                },
                selected: false
            },
            {
                data: {
                    photo: '../assets/belgium_eden_hazard.png',
                    client: 'Mathias Prez',
                    clientNumber: '02000290',
                    isVIP: true,
                    activity: 'Expires Power Of Attorney',
                    onDate: '10.11.2022',
                    status: 'NotInformed'
                },
                selected: false
            },
        ]
    }

    private getExpandedColumns() {
        return [
            {
                columnName: 'Domain &  Plan Name',
                fieldName: 'domainAndPlanName',
                icon: ''
            },
            {
                columnName: 'Storage',
                fieldName: 'storage',
                icon: ''
            },
            {
                columnName: 'Monthly Visitor',
                fieldName: 'monthlyVisitor'
            },
            {
                columnName: 'Domains',
                fieldName: 'domains'
            },
            {
                columnName: 'Status',
                fieldName: 'status'
            }
        ];
    }

    private getExpandedData() {
        return [
            {
                data: {
                    domain: 'paperpillar.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 5,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-object-group',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        },
                        {
                            planName: 'stock.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Add-on',
                            status: 'Active'
                        },
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'samanthawillam.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 1,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-minus-square',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'testpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 5,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-magnet',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 5,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 2,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 3,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 4,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 6,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 7,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 8,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 9,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            },
            {
                data: {
                    domain: 'mattpillow.com',
                    planName: 'Professional Plan',
                    storageMin: 1.2,
                    storageMax: 35.36,
                    monthlyVisitorMin: 1.2,
                    monthlyVisitorMax: 35.36,
                    domainsMin: 10,
                    domainsMax: 10,
                    status: 'Active',
                    icon: 'fa fa-microchip',
                    items: [
                        {
                            planName: 'papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: 1.5,
                            domain: 'Primary',
                            status: 'Active'
                        },
                        {
                            planName: 'supply.papperpillar.com',
                            storage: 1.5,
                            monthlyVisitor: null,
                            domain: 'Staging',
                            status: 'Active'
                        }
                    ]
                },
                selected: false
            }
        ]
    }

    // END STUBS
}