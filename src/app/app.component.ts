import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate;
  _id = null;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
  ) {
    if(localStorage.getItem('token')){
      this._id =  JSON.parse(localStorage.getItem('token'))._id.$oid;
    }else{
      this._id = null;
    }
    
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  sideMenu(){
this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title:"Search",
        url:"/search",
        icon:"search-outline"
      },
      {
        title:'Portfolio',
        url:`/portfolio/${this._id}`,
        icon:'book-outline'
      },
      {
        title : "User",
        url   : "/user",
        icon  : "person-outline"
      },
      {
        title : "Logout",
        url   : "/logout",
        icon  : "log-out-outline"
      }
      
    ]
  }
}
