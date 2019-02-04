import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class Auth {


    public token_id: string;

    constructor(private router: Router) {}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        console.log('chegamos no servico ' + usuario);

     return   firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        this.router.navigate(['/home']);
                    });
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    public authenticated(): boolean {
        return this.token_id !== undefined;
    }
}
