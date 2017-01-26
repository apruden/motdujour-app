import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  constructor(public navCtrl: NavController,
              public http: Http,
              public storage: Storage,
              public loadingCtrl: LoadingController,
              public translateService: TranslateService) {
        translateService.get(['day', 'week', 'month', 'pleaseWait']).subscribe(labels => {
          this.storage.get('stats').then(data => {
            if(data !== null) {
              let day = [];
              let week = [];
              let month = [];
              data.forEach((e, i) => {
                month.push({x: i, y: e.month});
                week.push({x: i, y: e.week});
                day.push({x: i, y: e.day});
              });
              this.lineChartData = [
                {data: day, label: labels.day},
                {data: week, label: labels.week},
                {data: month, label: labels.month}
              ];
            }
          });
        });
  }

  public lineChartData:Array<any> = [];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    animation: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 1.0,
          stepSize: 0.1
        }
      }],
      xAxes: [{
        ticks: {
          stepSize: 1,
          beginAtZero: true,
          min: 0,
          max: 60,
          suggestedMax: 60
        }
      }]
    }
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
}
