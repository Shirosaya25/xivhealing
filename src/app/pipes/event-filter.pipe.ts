import { Pipe, PipeTransform } from '@angular/core';

import { jobs } from '../constants/jobs';

import { Friendly } from '../models/report';
import { CastEvent } from '../models/event';

@Pipe({
    name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

    transform(events: CastEvent[], player: Friendly): CastEvent[] {

        return events.filter(

            (event: CastEvent) => {

                return jobs[player.type.toLowerCase()].defensive.some(

                    (ability: string) => {

                        return ability.toLowerCase() === event.ability.name.toLowerCase();
                    }
                );
            }
        );
    }
}
