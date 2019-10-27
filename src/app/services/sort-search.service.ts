import { Injectable } from '@angular/core';

import { Friendly } from '../models/report';

import { jobs } from '../constants/jobs';
import { skills } from '../constants/skills';

@Injectable({
    providedIn: 'root'
})
export class SortSearchService {

    constructor() { }

    sortPlayersByJob(p1: Friendly, p2: Friendly) {

        if (jobs[p1.type.toLowerCase()].priority < jobs[p2.type.toLowerCase()].priority) {

            return -1;
        }

        if (jobs[p1.type.toLowerCase()].priority > jobs[p2.type.toLowerCase()].priority) {

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
