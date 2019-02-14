import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public email: string;
  private imagem: any;

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  });


  constructor(private database: DataBase, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
   this.database.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
   });
   console.log(this.progresso.estado);
   console.log(this.progresso.status);
  }

  public upload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
