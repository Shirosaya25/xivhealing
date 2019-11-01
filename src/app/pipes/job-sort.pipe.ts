import { Pipe, PipeTransform } from '@angular/core';

import { AnalysisService } from '../services/analysis.service';
import { StorageService } from '../services/storage.service';

import { Event } from '../models/event';

import { jobs } from '../constants/jobs';

@Pipe({
    name: 'jobSort'
})

export class JobSortPipe implements PipeTransform {

    constructor(private analysis: AnalysisService,
                private ss: StorageService) {}

    transform(events: Event[]): Event[] {

        return events.sort(

            (e1: Event, e2: Event) => {

                const p1 = this.ss.fightPlayerIdMap.get(this.analysis.fight.id).get(e1.targetID);
                const p2 = this.ss.fightPlayerIdMap.get(this.analysis.fight.id).get(e2.targetID);

                if (jobs[p1.type.toLowerCase()].priority < jobs[p2.type.toLowerCase()].priority) {

                    return -1;
                }

                if (jobs[p1.type.toLowerCase()].priority > jobs[p2.type.toLowerCase()].priority) {

                    return 1;
                }

                return 0;
            }
        );
    }

}
