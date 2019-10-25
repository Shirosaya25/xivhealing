import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ReportComponent } from './components/report/report.component';
import { FightComponent } from './components/fight/fight.component';

import { EventFilterPipe } from './pipes/event-filter.pipe';

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
import { AbilityFilterPipe } from './pipes/ability-filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SideNavComponent,
        ReportComponent,
        ProgressBarColorDirective,
        FightComponent,
        EventFilterPipe,
        AbilityFilterPipe
    ],

    imports: [
        BrowserModule, AppRoutingModule, BrowserAnimationsModule,
        FormsModule, HttpClientModule,
        MatSidenavModule, MatInputModule, MatFormFieldModule,
        MatToolbarModule, MatIconModule, MatProgressSpinnerModule,
        MatTreeModule, MatExpansionModule, MatListModule,
        MatGridListModule, MatProgressBarModule, MatCardModule,
        MatRippleModule, MatTooltipModule
    ],

    providers: [],

    bootstrap: [AppComponent]
})
export class AppModule { }
