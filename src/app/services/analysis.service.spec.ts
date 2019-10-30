import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { AnalysisService } from './analysis.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AnalysisService', () => {
    beforeEach(() => TestBed.configureTestingModule({

        imports: [

            HttpClientModule, RouterTestingModule,

            MatSnackBarModule
        ]

    }));

    it('should be created', () => {
        const service: AnalysisService = TestBed.get(AnalysisService);
        expect(service).toBeTruthy();
    });
});
