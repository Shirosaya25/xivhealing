const skills = {

    /** Raidwide */
    reprisal: {

        name: 'Reprisal',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a00',
        path: '000000-000806',
        desc: 'Reprisal - Single Enemy\n' +
            ' - Reduces target\'s damage dealt by 10%\n' +
            ' - Duration: 10s\n' +
            ' - Recast: 90s'
    },

    feint: {

        name: 'Feint',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a01',
        path: '000000-000828',
        desc: 'Feint - Single Enemy\n' +
            ' - Reduces target\'s physical damage dealt by 10%\n' +
            ' - Duration 10s\n' +
            ' - Recast: 90s'
    },

    addle: {

        name: 'Addle',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a02',
        path: '000000-000861',
        desc: 'Addle - Single Enemy\n' +
            ' - Reduces target\'s magical damage dealt by 10%\n' +
            ' - Duration: 10s\n' +
            ' - Recast: 90s'
    },

    'divine veil': {

        name: 'Divine Veil',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a10',
        path: '002000-002508',
        desc: 'Divine Veil - Party\n' +
            ' - Creates a barrier for your party members that absorbs damage up to 10% of your maximum HP\n' +
            ' - Duration: 30s\n' +
            ' - Recast: 90s'
    },

    'passage of arms': {

        name: 'Passage of Arms',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a11',
        path: '002000-002515',
        desc: 'Passage of Arms - Party\n' +
            ' - Increases block rate to 100% and decreases damage taken by party members standing behind you by 15%\n' +
            ' - Duration: 18s\n' +
            ' - Recast: 150s'
    },

    'shake it off': {

        name: 'Shake it Off',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a20',
        path: '002000-002563',
        desc: 'Shake it Off - Party\n' +
            ' - Creates a barrier for you and your party members that absorbs damage up to 12% of your maximum HP\n' +
            ' - Additional Effect: Dispels Thrill of Battle, Vengeance, and Raw Intuition,' +
            ' increasing damage absorbed by 2% for each effect removed\n' +
            ' - Duration: 15s\n' +
            ' - Recast: 90s'
    },

    'shield samba': {

        name: 'Shield Samba',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'a70',
        path: '003000-003469',
        desc: 'Shield Samba - Party\n' +
            ' - Reduces damage taken by self and nearby party members by 10%\n' +
            ' - Duration: 15s\n' +
            ' - Recast: 180s\n' +
            ' - Cannot be stacked with Troubadour or Tactician'
    },

    /** Single Target */

    rampart: {

        name: 'Rampart',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b00',
        path: '000000-000801',
        desc: 'Rampart - Self\n' +
            ' - Reduces damage taken by 20%\n' +
            ' - Duration: 20s\n' +
            ' - Recast: 90s'
    },

    sheltron: {

        name: 'Sheltron',
        type: 'ability',
        cost: 50,
        resource: 'gauge',
        priority: 'b10',
        path: '002000-002510',
        desc: 'Sheltron - Self\n' +
            ' - Blocks incoming attacks (20%)\n' +
            ' - Duration: 6s\n' +
            ' - Oath Gauge Cost: 50'
    },

    sentinel: {

        name: 'Sentinel',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b11',
        path: '000000-000151',
        desc: 'Sentinel - Self\n' +
            ' - Reduces damage taken by 30%\n' +
            ' - Duration: 15s\n' +
            ' - Recast: 120s'
    },

    'hallowed ground': {

        name: 'Hallowed Ground',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b12',
        path: '002000-002502',
        desc: 'Hallowed Ground - Self\n' +
            ' - Renders you impervious to most attacks\n' +
            ' - Duration: 10s\n' +
            ' - Recast: 7m'
    },

    intervention: {

        name: 'Intervention',
        type: 'ability',
        cost: 50,
        resource: 'gauge',
        priority: 'b13',
        path: '002000-002512',
        desc: 'Intervention - Single Ally\n' +
            ' - Reduces target party member\'s damage taken by 5%\n' +
            ' - Duration: 6s\n' +
            ' - Additional Effect: Increases damage reduction by another 50% of the effect of Rampart or Sentinel if either are active\n' +
            ' - Oath Gauge Cost: 50'
    },

    cover: {

        name: 'Cover',
        type: 'ability',
        cost: 50,
        resource: 'gauge',
        priority: 'b14',
        path: '002000-002501',
        desc: 'Cover - Single Ally\n' +
            ' - Take all damage intended for another party member\n' +
            ' - Duration: 12s\n' +
            ' - Oath Gauge Cost: 50' +
            ' - Can only be executed when target is closer than 10 yalms\n' +
            ' - Does not activate for certain attacks'

    },

    'raw intuition': {

        name: 'Raw Intuition',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b20',
        path: '002000-002559',
        desc: 'Raw Intuition - Self\n' +
            ' - Reduces damage taken by 20%\n' +
            ' - Duration: 6s\n' +
            ' - Recast: 25s\n' +
            ' - Shares a recast timer with Nascent Flash'
    },

    vengeance: {

        name: 'Vengeance',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b21',
        path: '000000-000267',
        desc: 'Vengeance - Self\n' +
            ' - Reduces damage taken by 30%\n' +
            ' - Additional Effect: Delivers an attack with a potency of 55 each time you suffer physical damage\n' +
            ' - Duration: 15s\n' +
            ' - Recast: 120s'
    },

    holmgang: {

        name: 'holmgang',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b22',
        path: '000000-000266',
        desc: 'Holmgang - Self\n' +
            ' - Prevents most attacks from reducing your HP below 1\n' +
            ' - Duration: 8s\n' +
            ' - Recast: 4m'
    },

    'riddle of earth': {

        name: 'Riddle of Earth',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'b50',
        path: '002000-002537',
        desc: 'Riddle of Earth - Self\n' +
            ' - Grants Earth\'s Reply if damage is taken when active\n' +
            ' - Additional Effect: Extends Greased Lightning duration to maximum' +
            ' - Earth\'s Reply Bonus: Reduces damage taken by 10% and nullifies all action direction requirements' +
            ' - Duration: 30s\n' +
            ' - Recast: 60s'
    },

    /** Healing */
    bloodbath: {

        name: 'Bloodbath',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c00',
        path: '000000-000823',
        desc: 'Bloodbath - Self\n' +
            ' - Converts a portion of physical damage dealt into HP\n' +
            ' - Duration: 20s\n' +
            ' - Recast: 90s'
    },

    'second wind': {

        name: 'Second Wind',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c01',
        path: '000000-000821',
        desc: 'Second Wind - Self\n' +
            ' - Restores own HP\n' +
            ' - Cure Potency: 500\n' +
            ' - Recast: 120s'
    },

    clemency: {

        name: 'Clemency',
        type: 'spell',
        cost: 2000,
        resource: 'mp',
        priority: 'c10',
        path: '002000-002509',
        desc: 'Clemency - Single Ally\n' +
            ' - Restores target\'s HP\n' +
            ' - Cure Potency: 1200\n' +
            ' - Additional Effect: Restores to self 50% of the HP restored if used on an ally'
    },

    'nascent flash': {

        name: 'Nascent Flash',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c20',
        path: '002000-002567',
        desc: 'Nascent Flash - Single Ally\n' +
            ' - Grants Nascent Flash to self and Nascent Glint to target party member\n' +
            ' - Nascent Flash Effect: Absorbs 50% of damage dealt as HP\n' +
            ' - Nascent Glint Effect: Reduces damage taken by 10% and restores HP equaling 50% of that recovered by Nascent Flash\n' +
            ' - Duration: 6s\n' +
            ' - Recast: 6s\n' +
            ' - Shares a recast timer with Raw Intuition'
    },

    equilibrium: {

        name: 'Equilibrium',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c21',
        path: '002000-002560',
        desc: 'Equilibrium - Self\n' +
            ' - Restores own HP\n' +
            ' - Cure Potency: 1200\n' +
            ' - Recast: 60s'
    },

    'thrill of battle': {

        name: 'Thrill of Battle',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c22',
        path: '000000-000263',
        desc: 'Thrill of Battle - Self\n' +
            ' - Increases maximum HP by 20% and restores the amount increased\n' +
            ' - Additional Effect: Increases HP restored of self by 20%\n' +
            ' - Duration: 10s\n' +
            ' - Recast: 90s'
    },

    mantra: {

        name: 'Mantra',
        type: 'ability',
        cost: 0,
        resource: '',
        priority: 'c50',
        path: '000000-000216',
        desc: 'Mantra - Party\n' +
            ' - Increases HP recovered from healing by 10%\n' +
            ' - Duration: 15s\n' +
            ' - Recast: 90s'
    }

};

export { skills };
