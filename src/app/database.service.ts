import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class DataBase {

    constructor(private progresso: Progresso){

    }

    public publicar(publicacao: any): void {
        const nomeImagem = Date.now();
        firebase.storage().ref()
        .child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                this.progresso.status = 'andamento';
                this.progresso.estado = snapshot;
                 console.log('captura feita no serviço da base de dados: ', snapshot);
            },
            (error: any) => {
                this.progresso.status = 'erro';
                // console.log(error);
            },
            () => {
                this.progresso.status = 'concluído';
                // console.log('upload concluído');
            }
            );
        /*firebase.database().ref(`posts/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo }); */
    }
}
