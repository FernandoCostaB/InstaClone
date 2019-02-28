import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataBase } from 'src/app/database.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import 'rxjs';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Output() public atualizarFeed: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  private imagem: any;

  public progressoPublicacao = 'pendente';
  public porcentagemUpload: number;

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

   const countUpload = interval(1500);

   const continua = new Subject();
   continua.next(true);

   countUpload.pipe(takeUntil(continua)).subscribe(() => {

    this.progressoPublicacao = 'andamento';
    this.porcentagemUpload = Math.round(( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100);

    if (this.progresso.status === 'concluido') {
      this.progressoPublicacao = 'concluido';
      this.atualizarFeed.emit();
      continua.next(false);
    }
   });

  }

  public upload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
