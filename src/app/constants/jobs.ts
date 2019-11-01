const jobs = {

    paladin: {

        role: 'tank',
        name: 'Paladin',
        short: 'PLD',
        priority: 'a0',
        defensive: [

            'reprisal',
            'rampart',

            'sentinel',
            'sheltron',
            'hallowed ground',
            'intervention',
            'divine veil',
            'passage of arms',
            'clemency',
            'cover'
        ]
    },

    warrior: {

        role: 'tank',
        name: 'Warrior',
        short: 'WAR',
        priority: 'a1',
        defensive: [

            'reprisal',
            'rampart',

            'shake it off',
            'raw intuition',
            'vengeance',
            'holmgang',
            'nascent flash',
            'equilibrium',
            'thrill of battle'
        ]
    },

    'dark knight': {

        role: 'tank',
        name: 'Dark Knight',
        short: 'DRK',
        priority: 'a2',
        defensive: [

            'reprisal',
            'rampart',
        ]
    },

    gunbreaker: {

        role: 'tank',
        name: 'Gunbreaker',
        short: 'GNB',
        priority: 'a3',
        defensive: [

            'reprisal',
            'rampart',
        ]
    },

    'white mage': {

        role: 'healer',
        name: 'White Mage',
        short: 'WHM',
        priority: 'b0',
        defensive: [

            'cure'
        ]
    },

    scholar: {

        role: 'healer',
        name: 'Scholar',
        short: 'SCH',
        priority: 'b1',
        defensive: [

            'physick'
        ]
    },

    astrologian: {

        role: 'healer',
        name: 'Astrologian',
        short: 'AST',
        priority: 'b2',
        defensive: [

            'benefic'
        ]
    },

    monk: {

        role: 'melee',
        name: 'Monk',
        short: 'MNK',
        priority: 'c0',
        defensive: [

            'feint',
            'second wind',
            'bloodbath',

            'riddle of earth',
            'mantra'
        ]
    },

    dragoon: {

        role: 'melee',
        name: 'Dragoon',
        short: 'DRG',
        priority: 'c1',
        defensive: [

            'feint',
            'second wind',
            'bloodbath'
        ]
    },

    ninja: {

        role: 'melee',
        name: 'ninja',
        short: 'NIN',
        priority: 'c2',
        defensive: [

            'feint',
            'second wind',
            'bloodbath'
        ]
    },

    samurai: {

        role: 'melee',
        name: 'Samurai',
        short: 'SAM',
        priority: 'c3',
        defensive: [

            'feint',
            'second wind',
            'bloodbath'
        ]
    },

    bard: {

        role: 'ranged',
        name: 'Bard',
        short: 'BRD',
        priority: 'd0',
        defensive: [

            'troubadour'
        ]
    },

    machinist: {

        role: 'ranged',
        name: 'Machinist',
        short: 'MCH',
        priority: 'd1',
        defensive: [

            'tactician'
        ]
    },

    dancer: {

        role: 'ranged',
        name: 'Dancer',
        short: 'DNC',
        priority: 'd2',
        defensive: [

            'second wind',

            'shield samba'
        ]
    },

    'black mage': {

        role: 'caster',
        name: 'Black Mage',
        short: 'BLM',
        priority: 'e0',
        defensive: [

            'addle'
        ]
    },

    summoner: {

        role: 'caster',
        name: 'Summoner',
        short: 'SMN',
        priority: 'e1',
        defensive: [

            'addle'
        ]
    },

    redmage: {

        role: 'caster',
        name: 'Red Mage',
        short: 'RDM',
        priority: 'e2',
        defensive: [

            'addle'
        ]
    }

};

export { jobs };
