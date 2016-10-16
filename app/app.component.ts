import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    data: any;

    constructor(private appService: AppService){
        this.appService.getChannels().subscribe(
            resp => this.data = resp,
            error => console.log(error)
        );
    }

}
