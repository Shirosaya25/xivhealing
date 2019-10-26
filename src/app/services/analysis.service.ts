import { Injectable } from '@angular/core';

import { EventFilterPipe } from '../pipes/event-filter.pipe';

import { StorageService } from '../services/storage.service';
import { SortSearchService } from '../services/sort-search.service';

import { ReportFight, Report, Friendly, PlayerStats } from '../models/report';
import { Event, EventResponse, DamageTakenEvent, CastEvent } from '../models/event';
import { Jobs } from '../models/jobs';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {

    fight: ReportFight;

    ready: number[] = [1, 1];

    fetchPromise: Promise<Event[]>;

    damageTakenEvents: DamageTakenEvent[];
    castMap: Map<number, CastEvent[]>;
    mitigationEventMap: Map<number, CastEvent[]>;
    mitigationTableMap: Map<number, Map<string, CastEvent[]>>;
    mitigationTableKeys: Map<number, string[]>;

    playerStatMap: Map<number, PlayerStats>;

    constructor(private ss: StorageService,
                private sorts: SortSearchService) { }

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
        this.mitigationEventMap = new Map<number, CastEvent[]>();
        this.mitigationTableMap = new Map<number, Map<string, CastEvent[]>>();
        this.mitigationTableKeys = new Map<number, string[]>();

        this.playerStatMap = new Map<number, PlayerStats>();

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

                if (this.playerStatMap.get(event.targetID) === undefined) {

                    const stats = {

                        hp: event.targetResources.maxHitPoints
                    };

                    this.playerStatMap.set(event.targetID, stats);
                }

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

                const castList = this.castMap.get(event.sourceID) || [];

                castList.push(event);
                this.castMap.set(event.sourceID, castList);
            }
        }

        for (const key of this.castMap.keys()) {

            const player = this.ss.fightPlayerMap.get(this.fight.id).find(

                (friendly: Friendly) => {

                    return friendly.id === key;
                }
            );

            const mitigationEvents = eventFilterPipe.transform(this.castMap.get(key), Jobs[player.type]);
            this.mitigationEventMap.set(key, mitigationEvents);

            for (const mitigationEvent of mitigationEvents) {

                const abilityMap = this.mitigationTableMap.get(key) || new Map<string, CastEvent[]>();
                const abilityEventList = abilityMap.get(mitigationEvent.ability.name.toLowerCase()) || [];
                abilityEventList.push(mitigationEvent);

                abilityMap.set(mitigationEvent.ability.name.toLowerCase(), abilityEventList);
                this.mitigationTableMap.set(key, abilityMap);
            }

            if (this.mitigationTableMap.get(key) !== undefined) {

                const keys: string[] = [];

                for (const abilityKey of this.mitigationTableMap.get(key).keys()) {

                    keys.push(abilityKey);
                }

                keys.sort(this.sorts.sortSkillsByType);
                this.mitigationTableKeys.set(key, keys);
            }
        }

        this.ready[1] = 0;
    }
}
