import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    constructor(private snackBar: MatSnackBar) { }

    openSnackBar(msg: string, dur: number) {

        this.snackBar.open(msg, 'Close',

            {
                duration: dur,
                panelClass: ['snackbar'],
                horizontalPosition: 'left'
            }
        );
    }
}
