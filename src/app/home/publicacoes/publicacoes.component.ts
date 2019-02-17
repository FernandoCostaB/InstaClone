import { Component, OnInit } from '@angular/core';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public email: string;
  public publicacoes: any;

  constructor(private databaseService: DataBase) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      this.atualizarFeed();
    });
  }

  public atualizarFeed(): void {
    this.databaseService.consultarPublicacoes(this.email)
    .then((publicacoes: any) => {
        this.publicacoes = publicacoes;
    });
  }
}
