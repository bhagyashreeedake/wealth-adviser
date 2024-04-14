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
import { ProfileInsurance } from '../models/insurance';



@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private firestore: Firestore, private authService: AuthService) {}

  get currentUserInsurance$(): Observable<ProfileInsurance | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'insurance', user?.uid);
        return docData(ref) as Observable<ProfileInsurance>;
      })
    );
  }

  addInsurance(user: ProfileInsurance, id:any): Observable<void> {
    const ref = doc(this.firestore, 'insurance', user.uid+id);
    return from(setDoc(ref, user));
  }

  updateInsurance(user: ProfileInsurance): Observable<void> {
    const ref = doc(this.firestore, 'insurance', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  getInsuranceByUid(uid: string, id:string): Observable<ProfileInsurance | null> {
    const ref = doc(this.firestore, 'insurance', uid+id);
    return docData(ref) as Observable<ProfileInsurance>;
  }

}

