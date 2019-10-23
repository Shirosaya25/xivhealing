import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { FightComponent } from './components/fight/fight.component';

const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'report/:code', component: ReportComponent, children: [

        { path: ':id', component: FightComponent}
    ]}
];

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
