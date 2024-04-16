import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { ProfileLoan } from '../models/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserLoan$(): Observable<ProfileLoan | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'loan', user?.uid);
        return docData(ref) as Observable<ProfileLoan>;
      })
    );
  }

  addLoan(user: ProfileLoan, id:any): Observable<void> {
    const ref = doc(this.firestore, 'loan', user.uid+id);
    return from(setDoc(ref, user));
  }

  updateLoan(user: ProfileLoan): Observable<void> {
    const ref = doc(this.firestore, 'loan', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getLoanByUid(uid: string, id:string): Observable<ProfileLoan | null> {
    const ref = doc(this.firestore, 'loan', uid+id);
    return docData(ref) as Observable<ProfileLoan>;
  }
}
