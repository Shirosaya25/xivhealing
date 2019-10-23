import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { StorageService } from '../../services/storage.service';

import { Report } from '../../models/report';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

    fightId: number;

    constructor(private route: ActivatedRoute,
                public ss: StorageService) { }

    ngOnInit() {

        this.route.paramMap.subscribe(

            (params) => {

                this.fightId = + params.get('id');
            }
        );
  }

}
