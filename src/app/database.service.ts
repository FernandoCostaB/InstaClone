import * as firebase from 'firebase';


export class DataBase {



    public publicar(publicacao: any): void {
        let nomeImagem = Date.now();
        firebase.storage().ref().child(`imagens/${nomeImagem}`).put(publicacao.imagem);
        /*firebase.database().ref(`posts/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo }); */
    }
}
