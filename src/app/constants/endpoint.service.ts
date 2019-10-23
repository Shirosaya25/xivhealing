import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EndpointService {

    private readonly baseUrl = 'https://www.fflogs.com/v1';
    public readonly key = '10f91b492ae12f54cc9cf487b687d791';

    public readonly GET_ZONES = `${this.baseUrl}/zones`;
    public readonly GET_REPORT_BY_CODE = `${this.baseUrl}/report/fights/{code}`;
    public readonly GET_REPORT_EVENTS_BY_CODE = `${this.baseUrl}/report/events/summary/{code}`

    constructor() { }
}
