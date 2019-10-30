import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './api.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ApiService', () => {

    beforeEach(() => TestBed.configureTestingModule({

        imports: [

            HttpClientModule, RouterTestingModule,

            MatSnackBarModule
        ]

    }));

    it('should be created', () => {

        const service: ApiService = TestBed.get(ApiService);
        expect(service).toBeTruthy();
    });
});
