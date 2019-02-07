import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';
import { userInfo } from 'os';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public email: string;

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  });


  constructor(private database: DataBase) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
   this.database.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo
   });
  }
}
