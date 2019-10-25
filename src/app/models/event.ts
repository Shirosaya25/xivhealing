export interface Event {
    timestamp: number;
    type: string;
    sourceID: number;
    sourceIsFriendly: boolean;
    targetID: number;
    targetIsFriendly: boolean;
    ability: Ability;
    hitType?: number;
    amount?: number;
    absorbed?: number;
    debugMultiplier?: number;
    packetID?: number;
    sourceResources?: Resources;
    targetResources?: Resources;
}

export interface Ability {
    name: string;
    guid: number;
    type: number;
    abilityIcon: string;
}

export interface Resources {
    hitPoints: number;
    maxHitPoints: number;
    mp: number;
    maxMP: number;
    tp: number;
    maxTP: number;
    x: number;
    y: number;
    facing: number;
    absorb: number;
}

export interface EventResponse {

    events: Event[];
    nextPageTimestamp?: number;
}

export interface DamageTakenEvent {

    ability: Ability;
    calculated: Event[];
    calculatedTimestamp: number;
    damage: Event[];
    damageTimestamp: number;
    lethal: boolean;
}

export class CastEvent {

    timestamp: number;
    type: string;
    sourceID: number;
    sourceIsFriendly: boolean;
    targetID: number;
    targetIsFriendly: boolean;
    ability: Ability;

    constructor(event: Event) {

        this.timestamp = event.timestamp;
        this.type = event.type;
        this.sourceID = event.sourceID;
        this.sourceIsFriendly = event.sourceIsFriendly;
        this.targetID = event.targetID;
        this.targetIsFriendly = event.targetIsFriendly;
        this.ability = event.ability;
    }
}