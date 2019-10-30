import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SideNavComponent } from './side-nav.component';
import { ProgressBarColorDirective } from '../../directives/progress-bar-color.directive';

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

describe('SideNavComponent', () => {

    let component: SideNavComponent;
    let fixture: ComponentFixture<SideNavComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({

            imports: [
                RouterTestingModule, HttpClientModule, FormsModule,
                BrowserAnimationsModule,

                MatSidenavModule, MatInputModule, MatFormFieldModule,
                MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
                MatTreeModule, MatExpansionModule, MatListModule,
                MatGridListModule, MatProgressBarModule, MatCardModule,
                MatRippleModule, MatTooltipModule, MatSnackBarModule
            ],

            declarations: [

                SideNavComponent, ProgressBarColorDirective
            ]
        })

        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
