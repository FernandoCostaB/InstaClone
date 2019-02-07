import * as firebase from 'firebase';


export class DataBase {
    public publicar(publicacao: any): void {
        firebase.database().ref(`posts/${btoa(publicacao.email)}`)
            .push({titulo: publicacao.titulo });
    }
}
