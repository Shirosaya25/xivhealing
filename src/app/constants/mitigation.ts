const mitigation = {

    PLD: [

        'rampart',
        'reprisal',

        'sentinel',
        'sheltron',
        'hallowed ground',
        'intervention',
        'divine veil',
        'passage of arms',
        'clemency'
    ],

    WAR: [

        'rampart',
        'reprisal',

        'shake it off',
        'raw intuition',
        'vengeance',
        'holmgang',
        'nascent flash',
        'equilibrium',
        'thrill of battle'
    ],

    DRK: [

        'rampart',
        'reprisal',
    ],

    GBN: [

        'rampart',
        'reprisal',
    ],

    WHM: [

        'cure'
    ],

    SCH: [

        'physick'
    ],

    AST: [

        'benefic'
    ],

    MNK: [

        'feint',
        'second wind',
        'bloodbath'
    ],

    DRG: [

        'feint',
        'second wind',
        'bloodbath'
    ],

    NIN: [

        'feint',
        'second wind',
        'bloodbath'
    ],

    SAM: [

        'feint',
        'second wind',
        'bloodbath'
    ],

    BRD: [

        'troubadour'
    ],

    MCH: [

        'tactician'
    ],

    DNC: [

        'shield samba'
    ],

    BLM: [

        'addle'
    ],

    SMN: [

        'addle'
    ],

    RDM: [

        'addle'
    ]

};

const priority = {

    /** Raidwide mitigation */
    reprisal: 'a0',

    'divine veil': 'a1',
    'passage of arms': 'a2',

    'shake it off': 'a3',

    /** Personal / Cotank Mitigation */
    rampart: 'b0',

    sheltron: 'b1',
    sentinel: 'b2',
    'hallowed ground': 'b3',
    intervention: 'b4',

    'raw intuition': 'b5',
    vengeance: 'b6',
    holmgang: 'b7',

    /** Healing */
    bloodbath: 'c0',
    'second wind': 'c1',

    clemency: 'c2',
    'nascent flash': 'c3',
    equilibrium: 'c4',
    'thrill of battle': 'c5'
};

const descriptions = {

    reprisal: 'Reprisal - Single Enemy\n' +
        ' - Reduces target\'s damage dealt by 10%\n' +
        ' - Duration: 5s\n' +
        ' - Recast: 60s',

    rampart: 'Rampart - Self\n' +
        ' - Reduces damage taken by 20%\n' +
        ' - Duration: 20s\n' +
        ' - Recast: 90s',

    sheltron: 'Sheltron - Self\n' +
        ' - Blocks incoming attacks (20%\n' +
        ' - Duration: 6s\n' +
        ' - Oath Gauge Cost: 50',

    sentinel: 'Sentinel - Self\n' +
        ' - Reduces damage taken by 30%\n' +
        ' - Duration: 15s\n' +
        ' - Recast: 120s',

    'hallowed ground': 'Hallowed Ground - Self\n' +
        ' - Renders you impervious to most attacks\n' +
        ' - Duration: 10s\n' +
        ' - Recast: 7m',

    'divine veil': 'Divine Veil - Party\n' +
        ' - Creates a barrier for your party members that absorbs damage up to 10% of your maximum HP\n' +
        ' - Duration: 30s\n' +
        ' - Recast: 90s',

    'passage of arms': 'Passage of Arms - Party\n' +
        '- Increases block rate to 100% and decreases damage taken by party members standing behind you by 15%\n' +
        '- Duration: 18s\n' +
        ' - Recast: 150s',

    intervention: 'Intervention - Single Ally\n' +
        '- Reduces target party member\'s damage taken by 5%\n' +
        ' - Duration: 6s\n' +
        ' - Additional Effect: Increases damage reduction by another 50% of the effect of Rampart or Sentinel if either are active\n' +
        ' - Oath Gauge Cost: 50',

    'shake it off': 'Shake it Off - Party\n' +
        ' - Creates a barrier for you and your party members that absorbs damage up to 12% of your maximum HP\n' +
        ' - Additional Effect: Dispels Thrill of Battle, Vengeance, and Raw Intuition,' +
        ' increasing damage absorbed by 2% for each effect removed\n' +
        ' - Duration: 15s\n' +
        ' - Recast: 90s',

    'raw intuition': 'Raw Intuition - Self\n' +
        ' - Reduces damage taken by 20%\n' +
        ' - Duration: 5s\n' +
        ' - Recast: 25s\n' +
        ' - Shares a recast timer with Nascent Flash',

    vengeance: 'Vengeance - Self\n' +
        ' - Reduces damage taken by 30%\n' +
        '- Additional Effect: Delivers an attack with a potency of 55 each time you suffer physical damage\n' +
        ' - Duration: 10s\n' +
        ' - Recast: 120s\n',

    holmgang: 'Holmgang - Self\n' +
        ' - Prevents most attacks from reducing your HP below 1\n' +
        ' - Duration: 6s\n' +
        ' - Recast: 4m',

    'nascent flash': 'Nascent Flash - Single Ally\n' +
        ' - Grants Nascent Flash to self and Nascent Glint to target party member\n' +
        ' - Nascent Flash Effect: Absorbs 50% of damage dealt as HP\n' +
        ' - Nascent Glint Effect: Reduces damage taken by 10% and restores HP equaling 50% of that recovered by Nascent Flash\n' +
        ' - Duration: 6s\n' +
        ' - Recast: 6s\n' +
        ' - Shares a recast timer with Raw Intuition',

    equilibrium: 'Equilibrium - Self\n' +
        ' - Restores own HP\n' +
        ' - Cure Potency: 1200\n' +
        ' - Recast: 60s',

    'thrill of battle': 'Thrill of Battle - Self\n' +
        ' - Increases maximum HP by 20% and restores the amount increased\n' +
        ' - Additional Effect: Increases HP restored of self by 20%\n' +
        ' - Duration: 10s\n' +
        ' - Recast: 90s'
};

export interface Skill {

    name: string;
    path: string;
    desc: string;
}

const skills = {

    reprisal: {

        name: 'Reprisal',
        path: '000000-000806',
        desc: 'Reprisal - Single Enemy\n' +
                ' - Reduces target\'s damage dealt by 10%\n' +
                ' - Duration: 5s\n' +
                ' - Recast: 60s',
    }
};

export { mitigation, priority, descriptions };
