import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  createUser(name: string, email: string, password: string): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          type: 'error',
          title: 'Error al Iniciar Sesión',
          text: error.message
        });
      });
  }

  logIn(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error('Error:', error);
        Swal.fire({
          type: 'error',
          title: 'Error al Iniciar Sesión',
          text: error.message
        });
      });
  }
}
