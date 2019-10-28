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

    _render = false;
    chart: CanvasJS.Chart;

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

        this.analysis.readyEmitter.subscribe(

            (ready: boolean) => {

                this._render = ready;
            }
        );

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

        if (this.analysis.ready && this._render) {

            this._render = false;
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

        const _self = this;
        const data = [];
        const events = this.analysis.timelineMap.get(this.activePlayer.id);

        console.log(events);

        const maxHp = this.analysis.playerStatMap.get(this.activePlayer.id).hp;
        const fightStart = this.analysis.fight.start_time;
        const fightEnd = this.analysis.fight.end_time;

        for (const event of events) {

            data.push(

                {
                    x: new Date(event.timestamp - fightStart),
                    y: 100 * event.targetResources.hitPoints / maxHp
                }
            );
        }

        console.log(data);

        this.chart = new CanvasJS.Chart(

            "chartContainer",
            {
                zoomEnabled: true,
                animationEnabled: true,
                responsive: true,
                maintainAspectRatio: false,
                theme: 'dark2',
                backgroundColor: '#393939',

                toolTip: {

                    fontSize: 10,
                    backgroundColor: '#5D5D5D',
                    borderColor: 'black',
                    cornerRadius: 4,
                    contentFormatter: function(e, self = _self) {

                        return self.tooltipContent(e);
                    }
                },

                axisX: {

                    minimum: new Date(0),
                    maximum: new Date(fightEnd - fightStart),
                    margin: 0,
                    interval: 1,
                    intervalType: 'minute',
                    labelFormatter: function(e) {

                        return CanvasJS.formatDate(e.value, 'm:ss');
                    }
                },

                axisY: {

                    minimum: 0,
                    maximum: 100,
                    margin: 0,
                    lineThickness: 1,
                    tickLength: 0,
                    interval: 25
                },

                data: [
                    {
                        type: "stepLine",                
                        dataPoints: data
                    }
                ]
            }
        );
    

        this.chart.render();
    }

    tooltipContent(data) {

        const event = this.analysis.timelineMap.get(this.activePlayer.id)[data.entries[0].index];
        const icon = (this.getIcon(event.ability.abilityIcon)) || this.getIcon('000000-000806');

        const actors = this.ss.fightPlayerIdMap.get(this.analysis.fight.id);

        const curTime = data.entries[0].dataPoint.x;
        const curHp = Math.floor(data.entries[0].dataPoint.y / 100 * this.analysis.playerStatMap.get(this.activePlayer.id).hp);

        const tooltipHTML = `

        <div class="event-tooltip-container">

            <p class="m-0 p-0">(${this.toFightTime(0, curTime)}) - ${this.activePlayer.name}</p>
            <p class="m-0 p-0">HP: ${curHp} (${data.entries[0].dataPoint.y.toFixed(1)}%)</p>

            <hr style="border-color: white" class="m-0 p-0 mb-1"/>

            <span style="display: flex;
                align-items: center;
                margin: 5px 0 0 5px;">

                <img src="${icon}" class="ability-icon mat-elevation-z6" style = "
                    border: 1px solid black!important;
                    border-radius: 4px;
                    cursor: pointer;">
                <p class="m-0 p-0"> &nbsp;- ${event.ability.name}</p>
            </span>

        </div>`;

        return tooltipHTML;
    }
}
