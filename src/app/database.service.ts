import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';


@Injectable()
export class DataBase {

    constructor(private progresso: Progresso) {

    }

    public publicar(publicacao: any): void {
        firebase.database().ref(`posts/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo })
            .then((resposta: any) => {

                const nomeImagem = resposta.key;

                firebase.storage().ref()
                .child(`imagens/${nomeImagem}`)
                .put(publicacao.imagem)
                .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot: any) => {
                        this.progresso.status = 'andamento';
                        this.progresso.estado = snapshot;
                        //  console.log('captura feita no serviço da base de dados: ', snapshot);
                    },
                    (_error: any) => {
                        this.progresso.status = 'erro';
                    },
                    () => {
                        this.progresso.status = 'concluido';
                    }
                    );
            });
    }

    public consultarPublicacoes(email: string): Promise <any> {

        return new Promise ((resolve, reject) => {
            firebase.database().ref(`posts/${btoa(email)}`)
            .once('value')
            .then((snapshot: any) => {
               // lista de publicações
               const publicacoes: Array<any> = [];

                snapshot.forEach((childSnapshot: any) => {
                    const publicacao = childSnapshot.val();
                   //  recuperando a imagem do post
                   firebase.storage().ref().child(`imagens/${childSnapshot.key}`)
                   .getDownloadURL()
                   .then((url: string) => {
                       publicacao.url_imagem = url;
                       // recuperando o nome do usuario
                       firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                       .once('value')
                       .then((snapshot: any) => {
                           publicacao.nome_usuario = snapshot.val().nome_usuario;
                           publicacoes.push(publicacao);
                       });

                   });
                });
              resolve(publicacoes);
            });
        });



    }

}
