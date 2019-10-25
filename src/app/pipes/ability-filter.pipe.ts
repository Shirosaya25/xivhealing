import { Pipe, PipeTransform } from '@angular/core';

import { priority } from '../constants/mitigation';

@Pipe({
    name: 'abilityFilter'
})
export class AbilityFilterPipe implements PipeTransform {

    transform(abilities: string[], filter: string): string[] {

        return abilities.filter(

            (ability: string) => {

                return priority[ability.toLowerCase()] ? priority[ability.toLowerCase()].includes(filter) : false;
            }
        );
    }

}
