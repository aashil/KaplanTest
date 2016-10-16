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


    private displayDate(dateString: string){
        let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August",
                            "September", "October", "November", "December"];

        let date = new Date(dateString);
        let day = daysOfWeek[date.getDay()];
        let month = monthsOfYear[date.getMonth()];
        let dateOfMonth = date.getDate();
        let year = date.getFullYear();
        return day + ', ' + month + ' ' + dateOfMonth + ', ' + year;
    }

    private processData(resp: JSON[]){
        resp.sort(function (a, b) {
            return new Date(a['time']) - new Date(b['time']);
        });

        let newData = [];
        let date: Date = new Date();
        for(let course of resp){
            let currentDate = new Date(course['time']);
            if(currentDate.getDate() != date.getDate()){
                date = currentDate;
                newData.push({'date': currentDate});
            }
            newData.push(course);
        }
        return newData;
    }

}
