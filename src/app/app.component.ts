import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { StateService } from './services/state.service';

import { MatIconRegistry } from '@angular/material/icon';

import { jobs } from './constants/jobs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public state: StateService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {

        for (const job of Object.values(jobs)) {

            this.matIconRegistry.addSvgIcon(
                job.short,
                this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/icons/jobs/${job.short}.svg`)
            );
        }
    }
}
