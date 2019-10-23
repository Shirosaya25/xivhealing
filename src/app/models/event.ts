export interface Event {
    timestamp: number;
    type: string;
    sourceID: number;
    sourceIsFriendly: boolean;
    targetID: number;
    targetIsFriendly: boolean;
    ability: Ability;
    hitType: number;
    amount: number;
    absorbed: number;
    debugMultiplier: number;
    packetID: number;
    sourceResources: Resources;
    targetResources: Resources;
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

export interface SortedEvent {

    ability: Ability;
    calculated: Event[];
    damage: Event[];
}