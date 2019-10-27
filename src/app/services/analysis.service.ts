import { Injectable, EventEmitter, Output } from '@angular/core';

import { EventFilterPipe } from '../pipes/event-filter.pipe';

import { StorageService } from '../services/storage.service';
import { SortSearchService } from '../services/sort-search.service';

import { ReportFight, Report, Friendly, PlayerStats } from '../models/report';
import { Event, EventResponse, DamageTakenEvent, CastEvent } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {

    fight: ReportFight;

    fetchPromise: Promise<Event[]>;

    damageTakenEvents: DamageTakenEvent[];
    damageTakenEventMap: Map<number, DamageTakenEvent[]>;

    castMap: Map<number, CastEvent[]>;
    mitigationEventMap: Map<number, CastEvent[]>;
    mitigationTableMap: Map<number, Map<string, CastEvent[]>>;
    mitigationTableKeys: Map<number, string[]>;

    playerStatMap: Map<number, PlayerStats>;

    ready = false;
    
    @Output() operationEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() readyEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private ss: StorageService,
                private sorts: SortSearchService) { }


    async analyze(code: string, fight: ReportFight): Promise<boolean> {

        this.readyEmitter.emit(false);

        this.fight = fight;

        this.damageTakenEvents = [];
        this.damageTakenEventMap = new Map<number, DamageTakenEvent[]>();

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

        return new Promise(

            (resolve) => {

                let counter = 0;

                this.operationEmitter.subscribe(

                    (done) => {

                        counter++;

                        if (counter === 2) {

                            this.ready = true;
                            this.readyEmitter.emit(true);
                            resolve(true);
                        }
                    }
                );
            }
        );
    }

    async sortDamageTaken(events: Event[]) {

        let idx = -1;
        let playerIdx = new Map<number, number>();
        let playerDamageIdx = new Map<number, number>();

        for (const player of this.ss.fightPlayerMap.get(this.fight.id)) {

            playerIdx.set(player.id, -1);
            playerDamageIdx.set(player.id, -1);
        }

        console.log(events);

        let lastType = '';
        let lastPlayer = -1;

        for (const event of events) {

            if (event.type === 'calculateddamage') {

                playerIdx.set(event.targetID, playerIdx.get(event.targetID) + 1);

                const damageTakenEventList = this.damageTakenEventMap.get(event.targetID) || [];
                const newDamageTakenEvent: DamageTakenEvent = {

                    ability: event.ability,
                    calculated: [],
                    calculatedTimestamp: event.timestamp,
                    damage: [],
                    damageTimestamp: -1,
                    lethal: false
                };
                
                damageTakenEventList.push(newDamageTakenEvent);
                this.damageTakenEventMap.set(event.targetID, damageTakenEventList);

                lastPlayer = event.targetID;

            } else {

                playerDamageIdx.set(event.targetID, playerDamageIdx.get(event.targetID) + 1);

                const damageTakenEventList = this.damageTakenEventMap.get(event.targetID) || [];

                if (damageTakenEventList[playerDamageIdx.get(event.targetID)] === undefined) {

                    const newDamageTakenEvent: DamageTakenEvent = {

                        ability: event.ability,
                        calculated: [],
                        calculatedTimestamp: event.timestamp,
                        damage: [],
                        damageTimestamp: -1,
                        lethal: false
                    };
                    
                    damageTakenEventList.push(newDamageTakenEvent);
                    this.damageTakenEventMap.set(event.targetID, damageTakenEventList);

                }
                
            }

            if (event.type !== lastType && (lastType === '' || lastType === 'damage')) {

                idx ++;

                const newDamageTakenEvent: DamageTakenEvent = {

                    ability: event.ability,
                    calculated: [],
                    calculatedTimestamp: event.timestamp,
                    damage: [],
                    damageTimestamp: -1,
                    lethal: false
                };

                this.damageTakenEvents.push(newDamageTakenEvent);

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
                this.damageTakenEventMap.get(event.targetID)[playerDamageIdx.get(event.targetID)].damage.push(event);
                this.damageTakenEventMap.get(event.targetID)[playerDamageIdx.get(event.targetID)].damageTimestamp = event.timestamp;

                if (event.targetResources.hitPoints === 0) {

                    this.damageTakenEvents[idx].lethal = true;
                    this.damageTakenEventMap.get(event.targetID)[playerDamageIdx.get(event.targetID)].lethal = true;
                }

            } else {

                this.damageTakenEvents[idx].calculated.push(event);
                this.damageTakenEventMap.get(event.targetID)[playerIdx.get(event.targetID)].calculated.push(event);
            }

            lastType = event.type;
        }

        console.log(this.damageTakenEventMap);

        this.operationEmitter.emit(true);
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

            const mitigationEvents = eventFilterPipe.transform(this.castMap.get(key), player);

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

        this.operationEmitter.emit(true);
    }
}
