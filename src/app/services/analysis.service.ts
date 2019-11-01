import { Injectable, EventEmitter, Output } from '@angular/core';

import { EventFilterPipe } from '../pipes/event-filter.pipe';

import { StorageService } from '../services/storage.service';
import { SortSearchService } from '../services/sort-search.service';
import { StateService } from '../services/state.service';

import { ReportFight, Report, Friendly, PlayerStats } from '../models/report';
import { Event, EventResponse, DamageTakenEvent, CastEvent, HealingEvent, Mechanic } from '../models/event';

import { jobs } from '../constants/jobs';
import { blacklist } from '../constants/blacklist';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {

    fight: ReportFight;

    damageTakenEvents: DamageTakenEvent[];
    damageTakenEventMap: Map<number, DamageTakenEvent[]>;

    damageTakenEventsCondensed: Event[][];
    mechanicMap: Map<number, Mechanic>;
    mechanics: number[];

    castMap: Map<number, CastEvent[]>;
    mitigationEventMap: Map<number, CastEvent[]>;
    mitigationTableMap: Map<number, Map<string, CastEvent[]>>;
    mitigationTableKeys: Map<number, string[]>;

    playerStatMap: Map<number, PlayerStats>;

    healingOutputMap: Map<number, HealingEvent[]>;
    healingReceivedMap: Map<number, Map<number, HealingEvent[]>>;

    timelineMap: Map<number, Event[]>;

    ready = false;

    @Output() $operation: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() $ready: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private ss: StorageService,
                private sorts: SortSearchService,
                private state: StateService) { }

    async analyze(code: string, fight: ReportFight): Promise<boolean> {

        this.$ready.emit(false);
        this.ready = false;

        this.fight = fight;

        this.damageTakenEvents = [];
        this.damageTakenEventMap = new Map<number, DamageTakenEvent[]>();

        this.damageTakenEventsCondensed = [];
        this.mechanicMap = new Map<number, Mechanic>();

        this.castMap = new Map<number, CastEvent[]>();
        this.mitigationEventMap = new Map<number, CastEvent[]>();
        this.mitigationTableMap = new Map<number, Map<string, CastEvent[]>>();
        this.mitigationTableKeys = new Map<number, string[]>();

        this.playerStatMap = new Map<number, PlayerStats>();

        this.healingOutputMap = new Map<number, HealingEvent[]>();
        this.healingReceivedMap = new Map<number, Map<number, HealingEvent[]>>();

        this.timelineMap = new Map<number, Event[]>();

        this.ss.buildEvents(code, 'damage-taken', fight).then(

            (events: Event[]) => {

                this.sortDamageTaken(events);
            },

            (error) => {

                this.state.openSnackBar(error, 5000);
            }
        );

        this.ss.buildEvents(code, 'casts', fight).then(

            (events: CastEvent[]) => {

                this.sortCasts(events);
            },

            (error) => {

                this.state.openSnackBar(error, 5000);
            }
        );

        this.ss.buildEvents(code, 'healing', fight).then(

            (events: HealingEvent[]) => {

                this.sortResources(events);
            },

            (error) => {

                this.state.openSnackBar(error, 5000);
            }
        );

        return new Promise(

            (resolve, reject) => {

                let counter = 0;

                this.$operation.subscribe(

                    (done) => {

                        if (!done) {

                            reject('Failed to build timeline');
                        }

                        counter++;

                        if (counter === 3) {

                            this.buildTimeline();

                        } else if (counter === 4) {

                            this.ready = true;
                            this.$ready.emit(true);
                            resolve(true);
                        }
                    }
                );
            }
        );
    }

    async sortDamageTaken(events: Event[]) {

        let idx = -1;
        const playerIdx = new Map<number, number>();
        const playerDamageIdx = new Map<number, number>();

        for (const player of this.ss.fightPlayerMap.get(this.fight.id)) {

            playerIdx.set(player.id, -1);
            playerDamageIdx.set(player.id, -1);
        }

        let lastType = '';
        let lastName = '';
        let condensedIdx = -1;

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

                if (!blacklist.includes(event.ability.guid)) {

                    if (lastName !== event.ability.name) {

                        this.damageTakenEventsCondensed.push([]);
                        lastName = event.ability.name;
                        condensedIdx ++;
                    }

                    this.damageTakenEventsCondensed[condensedIdx].push(event);

                    const mech: Mechanic = this.mechanicMap.get(event.ability.guid) ||

                        {
                            name: event.ability.name,
                            timestamps: [],
                            eventMap: new Map<number, Event[]>()
                        };

                    const instance = mech.timestamps.find(

                        (timestamp: number) => {

                            return event.timestamp - timestamp < 1000;
                        }

                    ) || event.timestamp;

                    const mechEvents = mech.eventMap.get(instance) || [];

                    mechEvents.push(event);

                    if (!mech.timestamps.some(

                            (timestamp: number) => {

                                return instance === timestamp;
                            }

                        )
                    ) {

                        mech.timestamps.push(event.timestamp);
                    }

                    mech.eventMap.set(instance, mechEvents);
                    this.mechanicMap.set(event.ability.guid, mech);
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
        console.log(this.mechanicMap);

        this.mechanics = Array.from(this.mechanicMap.keys());
        this.$operation.emit(true);
    }

    async sortCasts(events: CastEvent[]) {

        const eventFilterPipe = new EventFilterPipe();

        for (const player of this.ss.fightPlayerMap.get(this.fight.id)) {

            this.mitigationTableMap.set(player.id, new Map<string, CastEvent[]>());
        }

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

        this.$operation.emit(true);
    }

    async sortResources(events: HealingEvent[]) {

        for (const event of events) {

            if (event.type !== 'heal' || event.ability.name.toLowerCase() === 'combined hots') {

                continue;
            }

            const healingMap = this.healingReceivedMap.get(event.targetID) || new Map<number, HealingEvent[]>();

            const allHealingList = healingMap.get(0) || [];
            const idHealingList = healingMap.get(event.sourceID) || [];

            allHealingList.push(event);
            idHealingList.push(event);

            healingMap.set(0, allHealingList);
            healingMap.set(event.sourceID, idHealingList);

            this.healingReceivedMap.set(event.targetID, healingMap);

            if (this.ss.fightPlayerMap.get(this.fight.id).some(

                    (player: Friendly) => {

                        return event.sourceID === player.id;
                    }
                )
            ) {
                const job = jobs[this.ss.fightPlayerIdMap.get(this.fight.id).get(event.sourceID).type.toLowerCase()];

                if (job && job.role === 'healer') {

                    const healingOutputList = this.healingOutputMap.get(event.sourceID) || [];

                    healingOutputList.push(event);

                    this.healingOutputMap.set(event.sourceID, healingOutputList);
                }
            }
        }

        this.$operation.emit(true);
    }

    async buildTimeline() {

        for (const player of this.ss.fightPlayerMap.get(this.fight.id)) {

            const damageList = this.damageTakenEventMap.get(player.id);

            const damageTakenList = [];
            const healingList = this.healingReceivedMap.get(player.id).get(0);

            for (const event of damageList) {

                if (event.damageTimestamp === -1) {

                    continue;
                }

                damageTakenList.push(event.damage[0]);
            }

            const timeline = damageTakenList.concat(healingList).sort(this.sorts.sortEventByTimestamp);

            this.timelineMap.set(player.id, timeline);
        }

        this.$operation.emit(true);
    }
}
