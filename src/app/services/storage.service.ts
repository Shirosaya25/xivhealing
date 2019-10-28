import { Injectable } from '@angular/core';
import { HttpHeaderResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { SortSearchService } from './sort-search.service';

import { Report, ReportFight, SortedFight, Friendly } from '../models/report';
import { Event, EventResponse } from '../models/event';

import { jobs } from '../constants/jobs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    loading = false;
    ready = false;
    loadingText: string;
    report: Report = null;

    analyzing = false;

    code: string;

    sortedFights: SortedFight[] = [];
    trashFights: ReportFight[] = [];

    fightPlayerMap: Map<number, Friendly[]>;
    fightPlayerIdMap: Map<number, Map<number, Friendly>>;

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
        this.fightPlayerIdMap = new Map<number, Map<number, Friendly>>();

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

                            if (jobs[player.type.toLowerCase()] !== undefined) {

                                for (const instance of player.fights) {

                                    const players: Friendly[] = this.fightPlayerMap.get(instance.id) || [];

                                    players.push(player);
                                    players.sort(this.sorts.sortPlayersByJob);

                                    this.fightPlayerMap.set(instance.id, players);

                                    const playerIdMap = this.fightPlayerIdMap.get(instance.id) || new Map<number, Friendly>();
                                    playerIdMap.set(player.id, player);
                                    this.fightPlayerIdMap.set(instance.id, playerIdMap);
                                }
                            }
                        }

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

    async buildEvents(code: string, view: string, fight: ReportFight): Promise<Event[]> {

        const startTime = fight.start_time;
        const endTime = fight.end_time;

        return new Promise(

            (resolve) => {

                const eventPromise = this.buildHelper(code, view, startTime, endTime, []);

                eventPromise.then(

                    (events: Event[]) => {

                        resolve(events);
                    }
                );
            }
        );
    }

    async buildHelper(code: string, view: string, start: number, end: number, events: Event[]): Promise<Event[]> {

        return new Promise(

            (resolve) => {

                this.api.getEventsByCode(code, view, start.toString(), end.toString()).subscribe(

                    (resp: EventResponse) => {

                        events = events.concat(resp.events);

                        if (resp.nextPageTimestamp !== undefined) {

                            const eventPromise = this.buildHelper(code, view, resp.nextPageTimestamp, end, events);

                            eventPromise.then(

                                (ret: Event[]) => {

                                    resolve(resp.events.concat(ret));
                                }
                            );

                        } else {

                            resolve(resp.events);
                        }
                    }
                );
            }
        );
    }
}
