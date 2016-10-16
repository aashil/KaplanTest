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
        //Subscribe to the observable returned from the service and send the response for processing.
        //Assign the processed data to the private 'data' array.
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
        let padMinutes = minutes < 10 ? '0'+minutes : minutes; //Append a 0 if minute is less than 10
        let newAmPm = ampm;

        //Handle the case where the course ends after 12 O' clock changing am to pm and vice versa.
        if(hours + 1 >= 12){
            if(ampm == 'am') newAmPm = 'pm';
            else newAmPm = 'am';
        }

        //Prepare the return string
        let strTime = hours + ':' + padMinutes + ' ' + ampm + ' - ' +
            (hours+1) + ':' + padMinutes + ' ' + newAmPm + ' EDT';

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
        //Sort the array of JSON object according to the date.
        resp.sort(function (a, b) {
            return new Date(a['time']) - new Date(b['time']);
        });

        //Prepare new data which contains the date JSON which will contains all the courses falling on
        //that day.
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
