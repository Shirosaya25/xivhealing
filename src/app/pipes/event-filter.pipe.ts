import { Pipe, PipeTransform } from '@angular/core';

import { mitigation } from '../constants/mitigation';

import { CastEvent } from '../models/event';

@Pipe({
    name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

    transform(events: CastEvent[], job: string): CastEvent[] {

        return events.filter(

            (event: CastEvent) => {

                return mitigation[job].some(

                    (ability: string) => {

                        return ability.toLowerCase() === event.ability.name.toLowerCase();
                    }
                );
            }
        );
    }
}
