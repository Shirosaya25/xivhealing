import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { EndpointService } from '../constants/endpoint.service';

import { Zone } from '../models/zone';
import { Report, ReportFight } from '../models/report';
import { Event, EventResponse } from '../models/event';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient,
                private eps: EndpointService) {}


    getZones(): Observable<Zone> {

        return this.http.get<Zone>(

            this.eps.GET_ZONES,
            {
                params: {

                    api_key: this.eps.key
                }
            }
        );
    }

    getReportByCode(code: string): Observable<Report> {

        return this.http.get<Report>(

            this.eps.GET_REPORT_BY_CODE.replace('{code}', code),
            {
                params: {

                    api_key: this.eps.key
                }
            }
        );
    }

    getEventsByCode(code: string, view: string, start: string, end: string ) {

        return this.http.get<EventResponse>(

            this.eps.GET_EVENTS_BY_CODE.replace('{view}', view).replace('{code}', code),
            {
                params: {

                    api_key: this.eps.key,
                    start,
                    end
                }
            }
        );
    }
}
