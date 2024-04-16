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
import { ProfileIncomeExpence } from '../models/income-expence';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenceService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserIncomeExpence$(): Observable<ProfileIncomeExpence | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'incomeexpence', user?.uid);
        return docData(ref) as Observable<ProfileIncomeExpence>;
      })
    );
  }

  addIncomeexpence(user: ProfileIncomeExpence, id:any): Observable<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid+id);
    return from(setDoc(ref, user));
  }

  updateIncomeexpence(user: ProfileIncomeExpence): Observable<void> {
    const ref = doc(this.firestore, 'incomeexpence', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getIncomeexpenceByUid(uid: string, id:string): Observable<ProfileIncomeExpence | null> {
    const ref = doc(this.firestore, 'incomeexpence', uid+id);
    return docData(ref) as Observable<ProfileIncomeExpence>;
  }
}
