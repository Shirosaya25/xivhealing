import { Injectable } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { SortSearchService } from './sort-search.service';

import { Report, ReportFight, SortedFight, Friendly, Jobs } from '../models/report';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    loading = false;
    ready = false;
    loadingText: string;
    report: Report = null;

    code: string;

    sortedFights: SortedFight[] = [];
    trashFights: ReportFight[] = [];

    fightPlayerMap: Map<number, Friendly[]>; 

    constructor(private api: ApiService,
                private router: Router,
                private sorts: SortSearchService) { }

    async getReportByCode(code: string, nav: boolean): Promise<Report> {

        this.loading = true;
        this.loadingText = 'Loading Curricula...';
        this.report = null;
        this.sortedFights = null;
        this.trashFights = null;
        this.code = '';
        this.fightPlayerMap = new Map<number, Friendly[]>();

        this.ready = false;

        return new Promise(

            (resolve) => {

                this.api.getReportByCode(code).subscribe(

                    (resp: Report) => {

                        if (resp !== null) {
                            
                            this.report = resp;
                            this.loading = false;

                        } else {

                            this.loading = false;
                        }
                    },

                    (error: HttpHeaderResponse) => {

                        this.loading = false;
                    },

                    () => {

                        this.trashFights = [];
                        this.sortedFights = [];

                        let lastId = -1;
                        let idx = -1;

                        for (const fight of this.report.fights) {

                            if (fight.boss === 0) {

                                this.trashFights.push(fight);

                            } else if (fight.boss !== lastId) {

                                lastId = fight.boss;
                                idx ++;

                                this.sortedFights.push(

                                    {
                                        name: fight.name,
                                        zoneName: fight.zoneName,
                                        kills: [],
                                        wipes: []
                                    }
                                );

                                this.sortedFights[idx][fight.kill ? 'kills' : 'wipes'].push(fight);

                            } else {

                                this.sortedFights[idx][fight.kill ? 'kills' : 'wipes'].push(fight);
                            }
                        }

                        for (const player of this.report.friendlies) {

                            if (Object.values(Jobs).some(job => job === player.type)) {

                                for (const instance of player.fights) {

                                    let players: Friendly[] = this.fightPlayerMap.get(instance.id) || [];

                                    players.push(player)
                                    players.sort(this.sorts.sortPlayersByJob);

                                    this.fightPlayerMap.set(instance.id, players);
                                }
                            }
                        }

                        console.log(this.sortedFights);
                        console.log(this.report)
                        console.log(this.fightPlayerMap);
                        this.code = code;
                        this.ready = true;

                        if (nav) {

                            this.router.navigate([`/report/${code}`]);
                        }

                        resolve(this.report);
                    }
                );
            }
        );
    }

    async getReportEventsByCode(code: string, fight: ReportFight) {

        return new Promise(

            (resolve) => {

                this.api.getReportEventsByCode(code, fight.start_time.toString(), fight.end_time.toString()).subscribe(

                    (resp: Report) => {

                        console.log(resp);
                    }
                );
            }
        );
    }

    asy
}
