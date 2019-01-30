import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instaClone';

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyD-b0GyXFcVCxsuEe3vHjjAdfV_RpbXics',
      authDomain: 'instaclone-a7f07.firebaseapp.com',
      databaseURL: 'https://instaclone-a7f07.firebaseio.com',
      projectId: 'instaclone-a7f07',
      storageBucket: 'instaclone-a7f07.appspot.com',
      messagingSenderId: '791020921364'
    };
    firebase.initializeApp(config);
  }
}
