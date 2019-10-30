import { Injectable } from '@angular/core';
import { HttpHeaderResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { SortSearchService } from './sort-search.service';

import { Report, ReportFight, SortedFight, Friendly, FriendlyPet } from '../models/report';
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

    code: string;

    sortedFights: SortedFight[] = [];
    trashFights: ReportFight[] = [];

    fightPlayerMap: Map<number, Friendly[]>;
    fightPlayerIdMap: Map<number, Map<number, Friendly>>;

    playerPetMap: Map<number, FriendlyPet[]>;
    petIdMap: Map<number, FriendlyPet>;

    constructor(private api: ApiService,
                private router: Router,
                private sorts: SortSearchService) { }

    async getReportByCode(code: string): Promise<Report> {

        this.loading = true;
        this.ready = false;
        this.loadingText = 'Loading Reporta...';

        this.report = null;

        this.code = '';

        this.sortedFights = [];
        this.trashFights = [];

        this.fightPlayerMap = new Map<number, Friendly[]>();
        this.fightPlayerIdMap = new Map<number, Map<number, Friendly>>();

        this.playerPetMap = new Map<number, FriendlyPet[]>();
        this.petIdMap = new Map<number, FriendlyPet>();

        return new Promise(

            (resolve, reject) => {

                this.api.getReportByCode(code).subscribe(

                    (resp: Report) => {

                        if (resp !== null) {

                            this.report = resp;
                            this.loading = false;

                        } else {

                            this.loading = false;
                            reject('Report was null.');
                        }
                    },

                    (resp: HttpErrorResponse) => {

                        this.loading = false;
                        reject(resp.error.error);
                    },

                    () => {

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

                                this.playerPetMap.set(player.id, []);
                            }
                        }

                        for (const pet of this.report.friendlyPets) {

                            const petList = this.playerPetMap.get(pet.petOwner);
                            petList.push(pet);

                            this.playerPetMap.set(pet.petOwner, petList);
                            this.petIdMap.set(pet.id, pet);
                        }

                        this.code = code;
                        this.ready = true;

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

            (resolve, reject) => {

                this.buildHelper(code, view, startTime, endTime, []).then(

                    (events: Event[]) => {

                        resolve(events);

                    },

                    (error) => {

                        reject(error);
                    }
                );
            }
        );
    }

    async buildHelper(code: string, view: string, start: number, end: number, events: Event[]): Promise<Event[]> {

        return new Promise(

            (resolve, reject) => {

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
                    },

                    (resp: HttpErrorResponse) => {

                        reject(resp.error.error);
                    }
                );
            }
        );
    }
}
