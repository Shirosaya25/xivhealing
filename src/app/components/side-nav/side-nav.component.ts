import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

import { ReportFight } from '../../models/report';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

    apiUrl: string;
    apiRegEx: RegExp = /(\bfflogs.com\/reports\/\b)+([a-zA-Z0-9]{16})/g;
    codeRegEx: RegExp = /(\b\/reports\/\b)+([a-zA-Z0-9]{16})/g;

    submitting = false;

    constructor(public api: ApiService,
                public ss: StorageService) { }

    ngOnInit() {

    }

    submitUrl(): void {

        this.submitting = true;

        const code = String(this.apiUrl.match(/(\b\/reports\/\b)+([a-zA-Z0-9]{16})/g)).substring(9);

        if (code === '') {

            this.submitting = false;
            return;
        }

        this.ss.getReportByCode(code, true);
        this.submitting = false;
    }

    toStartTime(startTime: number): Date {

        return new Date(this.ss.report.start + startTime);
    }

    toFightTime(startTime: number, endTime: number): string {

        const s = Math.floor((endTime - startTime) / 1000);

        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    }

    toProgress(progress: number): number {

        return 100 - Math.floor(progress / 100);
    }

    toColor(progress: number): string {

        const prog = 100 - Math.floor(progress / 100);

        if (prog <= 50) {

            return 'gray';

        } else if (prog <= 75) {

            return 'blue';

        } else if (prog != 100) {

            return 'purple';
        }

        return 'green';
    }

    loadEvents(pull: ReportFight) {

        this.ss.getReportEventsByCode(this.ss.code, pull)
    }
}
