import { Injectable } from '@angular/core';

import { StorageService } from '../services/storage.service';

import { ReportFight, Report } from '../models/report';
import { Event, EventResponse, SortedEvent } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class AnalysisService {

    analyzing = true;
    fetchPromise: Promise<Event[]>

    sortedEvents: SortedEvent[];

    constructor(private ss: StorageService) { }

    async analyze(code: string, fight: ReportFight) {

        this.sortedEvents = [];
        this.fetchPromise = this.ss.buildEvents(code, 'damage-taken', fight);
        this.fetchPromise.then(

            (event: Event[]) => {

                this.siftEvents(event);
            }
        );
    }

    async siftEvents(events: Event[]) {

        let idx = -1;
        let lastType = '';
        let lastTimestamp = -1;

        console.log(events);

        for (const event of events) {

            if (event.type !== lastType && (lastType === '' || lastType === 'damage')) {

                idx ++;

                this.sortedEvents.push(

                    {
                        ability: event.ability,
                        calculated: [],
                        damage: []
                    }
                );
            }

            if (event.type === 'damage') {

                this.sortedEvents[idx].damage.push(event);

            } else {

                this.sortedEvents[idx].calculated.push(event);
            }

            lastType = event.type;
        }

        console.log(this.sortedEvents)
        this.analyzing = false;
    }
}
