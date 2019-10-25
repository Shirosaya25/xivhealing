import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { StateService } from './services/state.service';

import { MatIconRegistry }  from '@angular/material/icon';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(public state: StateService,
                private matIconRegistry: MatIconRegistry,
                private domSanitizer: DomSanitizer) {

        this.matIconRegistry.addSvgIcon(
            'PLD',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/PLD.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'WAR',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/WAR.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'DRK',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/DRK.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'GNB',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/GNB.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'WHM',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/WHM.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'SCH',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/SCH.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'AST',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/AST.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'MNK',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/MNK.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'DRG',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/DRG.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'NIN',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/NIN.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'SAM',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/SAM.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'BRD',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/BRD.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'MCH',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/MCH.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'DNC',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/DNC.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'BLM',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/BLM.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'SMN',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/SMN.svg')
        );

        this.matIconRegistry.addSvgIcon(
            'RDM',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/jobs/RDM.svg')
        );
    }

}
