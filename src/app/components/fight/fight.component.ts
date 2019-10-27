import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';

import * as CanvasJS from 'src/assets/canvasjs.min';

import { StorageService } from '../../services/storage.service';
import { AnalysisService } from '../../services/analysis.service';
import { StateService } from '../../services/state.service';

import { Report, Friendly } from '../../models/report';

import { jobs } from '../../constants/jobs';
import { skills } from '../../constants/skills';

export const abilityIconTooltip: MatTooltipDefaultOptions = {
    showDelay: 500,
    hideDelay: 0,
    touchendHideDelay: 0,
};

/**
 * Component that displays the specifics of a given pull
 */
@Component({
    selector: 'app-fight',
    templateUrl: './fight.component.html',
    styleUrls: ['./fight.component.css'],
    providers: [
        {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: abilityIconTooltip}
    ],
})
export class FightComponent implements OnInit {

    fightCode: string;
    fightId: number;

    reportPromise: Promise<Report>;
    activePlayer: Friendly;

    activeSkillMap: Map<number, string>;

    skillList = skills;
    skillNames = Object.keys(this.skillList);
    jobList = jobs;

    constructor(private route: ActivatedRoute,
                public ss: StorageService,
                public analysis: AnalysisService,
                public state: StateService) { }

    /**
     * Determines if we need to pull new report data from FFLog's API
     * Binds the Promise that returns or a dummy Promise to pull analysis
     * Given that a valid fight ID is present
     */
    ngOnInit() {

        this.analysis.readyEmitter

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

                            this.activePlayer = this.ss.fightPlayerMap.get(this.fightId)[0];

                            this.activeSkillMap = new Map<number, string>();

                            for (const player of this.ss.fightPlayerMap.get(this.fightId)) {

                                this.activeSkillMap.set(player.id, this.jobList[player.type.toLowerCase()].defensive[0]);

                            }

                            this.analysis.analyze(this.fightCode, report.fights[this.fightId - 1]);

                        }
                    );
                }
            }
        );
    }

    @ViewChild('infoCard') set playerLoaded(val) {

        if (this.analysis.ready) {

            this.renderHpChart();
        }
    }

    /**
     * Coverts ms to MM:SS with padding
     * @param startTime - Beginning ms time
     * @param endTime - Ending ms time
     */
    toFightTime(startTime: number, endTime: number): string {

        const s = Math.floor((endTime - startTime) / 1000);

        return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    }

    /**
     * Returns image asset of ability
     * @param ability - ability name to get icon for
     */
    getIcon(ability: string) {

        const folderDir = ability.toString().substring(0, 6);
        const iconDir = ability.toString().substring(7, 13);

        return `../../../assets/icons/${folderDir}/${iconDir}.png`;
    }

    renderHpChart() {


        let data = [];

        for (const event of this.analysis.damageTakenEventMap.get(this.activePlayer.id)) {

            if (event.damageTimestamp !== -1) {

                data.push(

                    {
                        x: event.damageTimestamp,
                        y: event.damage[0].targetResources.hitPoints
                    }
                );
            }
        }

        let chart = new CanvasJS.Chart(

            "chartContainer",
            {
                zoomEnabled: true,
                animationEnabled: true,
                exportEnabled: true,

                title: {

                    text: "Performance Demo - 10000 DataPoints"
                },

                subtitles: [
                    {
                        text: "Try Zooming and Panning"
                    }
                ],
                data: [
                    {
                        type: "line",                
                        dataPoints: data
                    }
                ]
            }
        );
    

        chart.render();
    }
}
