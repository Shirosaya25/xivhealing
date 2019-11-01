import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../models/event';

import { minorBlacklist } from '../constants/blacklist';

@Pipe({
    name: 'minorFilter'
})
export class MinorFilterPipe implements PipeTransform {

    transform(mechs: number[], minor: boolean): number[] {

        return mechs.filter(

            (mech: number) => {

                return minor || !minorBlacklist.includes(mech);
            }
        );
    }

}
