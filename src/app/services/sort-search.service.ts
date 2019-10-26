import { Injectable } from '@angular/core';

import { Friendly } from '../models/report';
import { skills } from '../constants/mitigation';

@Injectable({
    providedIn: 'root'
})
export class SortSearchService {

    constructor() { }

    sortPlayersByJob(p1: Friendly, p2: Friendly) {

        const jobsPriority = {

            Paladin: 0,
            Warrior: 1,
            'Dark Knight': 2,
            Gunbreaker: 3,
            'White Mage': 4,
            Scholar: 5,
            Astrologian: 6,
            Monk: 7,
            Dragoon: 8,
            Ninja: 9,
            Samurai: 10,
            Bard: 11,
            Machinist: 12,
            Dancer: 13,
            'Black Mage': 14,
            Summoner: 15,
            RedMage: 16
        };

        if (jobsPriority[p1.type] < jobsPriority[p2.type]) {

            return -1;
        }

        if (jobsPriority[p1.type] > jobsPriority[p2.type]) {

            return 1;
        }

        return 0;
    }

    sortSkillsByType(s1: string, s2: string) {

        if (skills[s1.toLowerCase()].priority.substring(0, 3) < skills[s2.toLowerCase()].priority.substring(0, 3)) {

            return -1;
        }

        if (skills[s1.toLowerCase()].priority.substring(0, 3) > skills[s2.toLowerCase()].priority.substring(0, 3)) {

            return 1;
        }

        return 0;
    }
}
