import { Pipe, PipeTransform } from '@angular/core';

import { skills } from '../constants/mitigation';

@Pipe({
    name: 'abilityFilter'
})
export class AbilityFilterPipe implements PipeTransform {

    transform(abilities: string[], filter: string): string[] {

        return abilities.filter(

            (ability: string) => {

                return skills[ability.toLowerCase()].priority ? skills[ability.toLowerCase()].priority.includes(filter) : false;
            }
        );
    }

}
