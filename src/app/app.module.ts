import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FightComponent } from './components/fight/fight.component';

import { EventFilterPipe } from './pipes/event-filter.pipe';
import { AbilityFilterPipe } from './pipes/ability-filter.pipe';
import { MinorFilterPipe } from './pipes/minor-filter.pipe';

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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { JobSortPipe } from './pipes/job-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SideNavComponent,
        ProgressBarColorDirective,
        FightComponent,
        EventFilterPipe,
        AbilityFilterPipe,
        MinorFilterPipe,
        JobSortPipe
    ],

    imports: [
        BrowserModule, AppRoutingModule, BrowserAnimationsModule,
        FormsModule, HttpClientModule, CommonModule,
        MatSidenavModule, MatInputModule, MatFormFieldModule,
        MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
        MatTreeModule, MatExpansionModule, MatListModule,
        MatGridListModule, MatProgressBarModule, MatCardModule,
        MatRippleModule, MatTooltipModule, MatSnackBarModule,
        MatSlideToggleModule, MatDividerModule, MatTableModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule { }
