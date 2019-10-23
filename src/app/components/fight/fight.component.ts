import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';
import { AnalysisService } from '../../services/analysis.service';

import { Report } from '../../models/report';

@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

    fightCode: string;
    fightId: number;

    reportPromise: Promise<Report>;

    constructor(private route: ActivatedRoute,
                public ss: StorageService,
                public analysis: AnalysisService) { }

    ngOnInit() {

        this.route.paramMap.subscribe(

            (params) => {

                if (this.fightCode !== params.get('code')) {

                    this.fightCode = params.get('code');
                    this.reportPromise = this.ss.getReportByCode(this.fightCode, false);
                }

               this.fightId = + params.get('id');

                if (this.fightId !== 0) {

                    this.reportPromise.then(

                        (report: Report) => {

                            this.analysis.analyze(this.fightCode, report.fights[this.fightId - 1]);

                        }
                    );
                }
            }
        );
    }
}
