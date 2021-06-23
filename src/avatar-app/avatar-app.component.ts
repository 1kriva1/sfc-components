import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import BaseAppComponent from 'src/base-app.component';

@Component({
    selector: 'avatar-app',
    templateUrl: './avatar-app.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class AvatarAppComponent extends BaseAppComponent {

    avatarInfo = {
        rating: 71,
        firstName: 'Andrii',
        lastName: 'Kryvoruk',
        position: 'Goalkeeper',
        avatarSrc: '../assets/belgium_eden_hazard.png',
        isInjured: false,
        isCaptain: false
    }

    avatarCaptain;
    avatarInjured;
    avatarCaptainInjured;

    constructor(protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(router, activatedRoute);
        
        this.avatarCaptain = {...this.avatarInfo};
        this.avatarCaptain.isCaptain = true;

        this.avatarInjured = {...this.avatarInfo};
        this.avatarInjured.isInjured = true;

        this.avatarCaptainInjured = {...this.avatarInfo};
        this.avatarCaptainInjured.isCaptain = true;
        this.avatarCaptainInjured.isInjured = true;
    }
    
}