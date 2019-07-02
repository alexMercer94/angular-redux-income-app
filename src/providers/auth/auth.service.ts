import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) {}

  /**
   * Listen for event when user's status changed
   */
  initAuthListener(): void {
    this.afAuth.authState.subscribe((fbUser: User) => {
      console.log(fbUser);
    });
  }

  /**
   * Register an user in database
   * @param name User's name
   * @param email User's email
   * @param password User's password
   */
  createUser(name: string, email: string, password: string): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user: MUser = {
          uid: response.user.uid,
          name: name,
          email: response.user.email
        };

        this.afDB
          .doc(`${user.uid}/user`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
          });
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

  /**
   * Auth an user in the aplication consulting firebase
   * @param email User's email
   * @param password User's password
   */
  logIn(email: string, password: string): void {
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

  /**
   * Close a session in the aplication
   */
  logOut(): void {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  /**
   * Verify if a user is authenticated
   */
  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((fbUser: User) => {
        if (fbUser === null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }
}
