import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { FightComponent } from './fight.component';

import { EventFilterPipe } from '../../pipes/event-filter.pipe';
import { AbilityFilterPipe } from '../../pipes/ability-filter.pipe';
import { MinorFilterPipe } from '../../pipes/minor-filter.pipe';
import { JobSortPipe } from '../../pipes/job-sort.pipe';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';

describe('FightComponent', () => {
    let component: FightComponent;
    let fixture: ComponentFixture<FightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, HttpClientModule,

                MatSidenavModule, MatInputModule, MatFormFieldModule,
                MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
                MatTreeModule, MatExpansionModule, MatListModule,
                MatGridListModule, MatProgressBarModule, MatCardModule,
                MatRippleModule, MatTooltipModule, MatSnackBarModule,
                MatSlideToggleModule, MatTableModule
            ],
            declarations: [

                FightComponent, EventFilterPipe, AbilityFilterPipe,
                JobSortPipe, MinorFilterPipe
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
