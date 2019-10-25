import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor() { }

    sidenavExpanded = true;
    sidenavTriggered = false;

    getSidenavState(): boolean {

        return (this.sidenavExpanded ||
                (!this.sidenavExpanded && this.sidenavTriggered))
                && !(this.sidenavTriggered && this.sidenavExpanded);
    }
}
