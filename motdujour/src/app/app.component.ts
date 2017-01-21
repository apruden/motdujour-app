import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Push, Splashscreen } from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { TranslateService } from 'ng2-translate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform,
              public http: Http,
              translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      translate.setDefaultLang('fr');

      if (platform.is('cordova')) {
        let push = Push.init({
          android: {
            senderID:'1069024173850'
          },
          ios: {
            alert: "true",
            badge: false,
            sound: "true"
          },
          windows: {}
        });

        push.on('registration', (data)=> {
          console.log('onRegistration', data);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          this.http.post('https://motdujour.monolitosoft.com/api/_register', data, options)
          .subscribe(r => {
            console.log(r);
          });
        });

        push.on('notification', (data) => {
          console.log('onNotifaction', data);
        });

        push.on('error', (e) => {
          console.log('error', e);
        });
      }
    });
  }
}
