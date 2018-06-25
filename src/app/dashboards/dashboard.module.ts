import { DashfireService } from './dashfire.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule} from 'ng-chartist';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { RecentcommentComponent } from './dashboard-components/recent-comment/recent-comment.component';

import { EarningComponent } from './dashboard-components/earning-report/earning-report.component';

@NgModule({
	imports: [
    	FormsModule,
    	CommonModule,
        NgbModule,
        ChartsModule,
        ChartistModule,
        Ng2SmartTableModule,
    	RouterModule.forChild(DashboardRoutes)
    ],
	declarations: [
        Dashboard1Component, 
        RecentcommentComponent,
        EarningComponent
    ],
    providers:[DashfireService]
})
export class DashboardModule { }