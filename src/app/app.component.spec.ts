import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FightComponent } from './components/fight/fight.component';

import { EventFilterPipe } from './pipes/event-filter.pipe';
import { AbilityFilterPipe } from './pipes/ability-filter.pipe';

import { ProgressBarColorDirective } from './directives/progress-bar-color.directive';

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

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule, BrowserModule, AppRoutingModule,
                BrowserAnimationsModule,

                FormsModule, HttpClientModule,
                MatSidenavModule, MatInputModule, MatFormFieldModule,
                MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
                MatTreeModule, MatExpansionModule, MatListModule,
                MatGridListModule, MatProgressBarModule, MatCardModule,
                MatRippleModule, MatTooltipModule, MatSnackBarModule
            ],
            declarations: [
                AppComponent,
                HomeComponent,
                SideNavComponent,
                ProgressBarColorDirective,
                FightComponent,
                EventFilterPipe,
                AbilityFilterPipe
            ],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
