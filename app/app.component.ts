import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    private data: JSON[];

    constructor(private appService: AppService){
        this.appService.getChannels().subscribe(
            resp => this.data = this.processData(resp),
            error => console.log(error)
        );
    }

    private displayTime(dateString: string){
        let date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        let padMinutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + padMinutes + ' ' + ampm + ' - ' +
            (hours+1) + ':' + padMinutes + ' ' + ampm + ' EDT';
        return  strTime;
    }

    private processData(resp: JSON[]){
        resp.sort(function (a, b) {
            return new Date(a.time) - new Date(b.time);
        });
        return resp;
    }

}
