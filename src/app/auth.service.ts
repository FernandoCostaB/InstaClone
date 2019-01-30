import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Auth {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('chegamos no servico ' + usuario);

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((response: any) => {
            delete usuario.senha;
           firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`).set(usuario);
        })
        .catch((error: Error) => {
            console.log(error);
        });
    }

    public auth(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((response: any) => {
                console.log(response);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }
}
