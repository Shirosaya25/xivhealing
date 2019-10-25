import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';
import { AnalysisService } from '../../services/analysis.service';
import { StateService } from '../../services/state.service';

import { Report, Friendly } from '../../models/report';
import { Jobs } from '../../models/jobs';
import { mitigation } from '../../constants/mitigation';

@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

    fightCode: string;
    fightId: number;
    jobs = Jobs;

    reportPromise: Promise<Report>;
    activePlayer: Friendly;

    constructor(private route: ActivatedRoute,
                public ss: StorageService,
                public analysis: AnalysisService,
                public state: StateService) { }

    ngOnInit() {

        this.route.paramMap.subscribe(

            (params) => {

                this.fightCode = params.get('code');

                if (this.ss.code !== params.get('code')) {

                    this.reportPromise = this.ss.getReportByCode(this.fightCode, false);

                } else {

                    this.reportPromise = new Promise(

                        (resolve) => {

                            resolve(this.ss.report);
                        }
                    );
                }

                this.fightId = + params.get('id');

                if (this.fightId !== 0) {

                    this.reportPromise.then(

                        (report: Report) => {

                            console.log(this.ss.report);
                            this.activePlayer = this.ss.fightPlayerMap.get(this.fightId)[0];
                            this.analysis.analyze(this.fightCode, report.fights[this.fightId - 1]);

                        }
                    );
                }
            }
        );
    }

    toFightTime(startTime: number, endTime: number): string {

        const s = Math.floor((endTime - startTime) / 1000);

        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    }
}
