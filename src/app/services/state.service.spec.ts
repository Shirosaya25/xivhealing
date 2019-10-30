import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { StateService } from './state.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('StateService', () => {

    beforeEach(() => TestBed.configureTestingModule({

        imports: [

            HttpClientModule, RouterTestingModule,

            MatSnackBarModule
        ]

    }));

    it('should be created', () => {
        const service: StateService = TestBed.get(StateService);
        expect(service).toBeTruthy();
    });
});
