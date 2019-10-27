export interface Report {
    fights: ReportFight[];
    lang: string;
    friendlies: Friendly[];
    enemies: Enemy[];
    friendlyPets: FriendlyPet[];
    enemyPets: any[];
    phases: Phase[];
    logVersion: number;
    gameVersion: number;
    title: string;
    owner: string;
    start: number;
    end: number;
    zone: number;
    exportedCharacters: any[];
}

export interface Enemy {
    name: string;
    id: number;
    guid: number;
    type: string;
    fights: EnemyFight[];
}

export interface EnemyFight {
    id: number;
    instances: number;
    groups: number;
}

export interface ReportFight {
    id: number;
    start_time: number;
    end_time: number;
    boss: number;
    name: string;
    zoneID: number;
    zoneName: string;
    size: number;
    difficulty: number;
    kill: boolean;
    partial: number;
    standardComposition: boolean;
    bossPercentage: number;
    fightPercentage: number;
    lastPhaseForPercentageDisplay: number;
}

export interface Friendly {
    name: string;
    id: number;
    guid: number;
    type: string;
    server: string;
    fights: FriendlyFight[];
}

export interface FriendlyFight {
    id: number;
}

export interface FriendlyPet {
    name: string;
    id: number;
    guid: number;
    type: string;
    petOwner: number;
    fights: FriendlyPetFight[];
}

export interface FriendlyPetFight {
    id: number;
    instances: number;
}

export interface Phase {
    boss: number;
    phases: string[];
}

export interface SortedFight {

    name: string;
    zoneName: string;
    kills: ReportFight[];
    wipes: ReportFight[];
}

export interface PlayerStats {

    hp: number;
}
