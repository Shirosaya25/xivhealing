export interface Zone {
    id: number;
    name: string;
    frozen: boolean;
    encounters: Encounter[];
    brackets: Brackets;
    partitions?: Partition[];
}

export interface Brackets {
    min: number;
    max: number;
    bucket: number;
    type: Type;
}

export enum Type {
    Patch = 'Patch',
}

export interface Encounter {
    id: number;
    name: string;
}

export interface Partition {
    name: Name;
    compact: Compact;
    area?: number;
    default?: boolean;
}

export enum Compact {
    Default = 'default',
    NStd = 'NStd',
    NStd355B = 'NStd (3.55b+)',
    NStdEcho = 'NStd (Echo)',
    Std = 'Std',
    Std355B = 'Std (3.55b+)',
    StdEcho = 'Std (Echo)',
}

export enum Name {
    Default = 'default',
    NonStandardComps = 'Non-Standard Comps',
    NonStandardComps355B = 'Non-Standard Comps (3.55b+)',
    NonStandardCompsEcho = 'Non-Standard Comps (Echo)',
    NonStandardCompsPreSavage = 'Non-Standard Comps (Pre-Savage)',
    StandardComps = 'Standard Comps',
    StandardComps355B = 'Standard Comps (3.55b+)',
    StandardCompsEcho = 'Standard Comps (Echo)',
    StandardCompsPreSavage = 'Standard Comps (Pre-Savage)',
}
