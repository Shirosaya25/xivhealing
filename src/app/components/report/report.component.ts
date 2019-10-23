import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    code: string;

    constructor(private route: ActivatedRoute,
                public ss: StorageService) { }

    ngOnInit() {

        this.route.paramMap.subscribe(

            (params) => {

                this.code = params.get('code');
                this.ss.getReportByCode(this.code, false);
            }
        );
    }

}
