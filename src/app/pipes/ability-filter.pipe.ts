import { Pipe, PipeTransform } from '@angular/core';

import { skills } from '../constants/skills';

@Pipe({
    name: 'abilityFilter'
})
export class AbilityFilterPipe implements PipeTransform {

    transform(abilities: string[], filter: string): string[] {

        return abilities.filter(

            (ability: string) => {

                if (skills[ability.toLowerCase()] === undefined) {

                    return false;
                }

                return skills[ability.toLowerCase()].priority ? skills[ability.toLowerCase()].priority.includes(filter) : false;
            }
        );
    }

}
