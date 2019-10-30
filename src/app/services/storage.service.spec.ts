import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { StorageService } from './storage.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('StateService', () => {

    beforeEach(() => TestBed.configureTestingModule({

        imports: [

            HttpClientModule, RouterTestingModule,

            MatSnackBarModule
        ]

    }));

    it('should be created', () => {

        const service: StorageService = TestBed.get(StorageService);
        expect(service).toBeTruthy();
    });
});
