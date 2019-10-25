import { Injectable } from '@angular/core';

import { EventFilterPipe } from '../pipes/event-filter.pipe';

import { StorageService } from '../services/storage.service';

import { ReportFight, Report, Friendly } from '../models/report';
import { Event, EventResponse, DamageTakenEvent, CastEvent } from '../models/event';
import { Jobs } from '../models/jobs';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {

    fight: ReportFight;

    ready: number[] = [1, 1];

    fetchPromise: Promise<Event[]>

    damageTakenEvents: DamageTakenEvent[];
    castMap: Map<number, CastEvent[]>;
    mitigationMap: Map<number, CastEvent[]>;

    constructor(private ss: StorageService) { }

    getReady() {

        let sum = 0;

        for (const n of this.ready) {

            sum += n;
        }

        return sum;
    }

    async analyze(code: string, fight: ReportFight) {

        this.ready = [1, 1];

        this.fight = fight;

        this.damageTakenEvents = [];
        this.castMap = new Map<number, CastEvent[]>();
        this.mitigationMap = new Map<number, CastEvent[]>();

        this.ss.buildEvents(code, 'damage-taken', fight).then(

            (events: Event[]) => {

                this.sortDamageTaken(events);
            }
        );

        this.ss.buildEvents(code, 'casts', fight).then(

            (events: Event[]) => {

                this.sortCasts(events);
            }
        );
    }

    async sortDamageTaken(events: Event[]) {

        let idx = -1;
        let lastType = '';
        let lastTimestamp = -1;

        for (const event of events) {

            if (event.type !== lastType && (lastType === '' || lastType === 'damage')) {

                idx ++;

                this.damageTakenEvents.push(

                    {
                        ability: event.ability,
                        calculated: [],
                        calculatedTimestamp: event.timestamp,
                        damage: [],
                        damageTimestamp: -1,
                        lethal: false
                    }
                );

            } else if (event.type !== lastType && (lastType === '' || lastType !== 'damage')) {

                this.damageTakenEvents[idx].damageTimestamp = event.timestamp;
            }

            if (event.type === 'damage') {

                this.damageTakenEvents[idx].damage.push(event);

                if (event.targetResources.hitPoints === 0) {

                    this.damageTakenEvents[idx].lethal = true;
                }

            } else {

                this.damageTakenEvents[idx].calculated.push(event);
            }

            lastType = event.type;
        }

        this.ready[0] = 0;
    }

    async sortCasts(events: Event[]) {

        const eventFilterPipe = new EventFilterPipe();

        for (const event of events) {

            if (this.ss.fightPlayerMap.get(this.fight.id).some(

                    (player: Friendly) => {

                        return player.id === event.sourceID;
                    }
                )

            ) {

                let castList = this.castMap.get(event.sourceID) || [];

                castList.push(event);
                this.castMap.set(event.sourceID, castList);
            }
        }

        for (const key of this.castMap.keys()) {

            const player = this.ss.fightPlayerMap.get(this.fight.id).find(

                (player: Friendly) => {

                    return player.id === key;
                }
            );

            const mitigationEvents = eventFilterPipe.transform(this.castMap.get(key), Jobs[player.type])
            this.mitigationMap.set(key, mitigationEvents)
        }

        console.log(this.mitigationMap);
        this.ready[1] = 0;
    }
}
