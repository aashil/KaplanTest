import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

    private backendUrl = 'http://localhost:3000/data';  // URL to web API

    constructor (private http: Http) {}

    //Fire a http request to the backend asking for the data.
    getChannels (): Observable<any> {
        return this.http.get(this.backendUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Extract JSON data from the response received.
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    //Handle the error
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}