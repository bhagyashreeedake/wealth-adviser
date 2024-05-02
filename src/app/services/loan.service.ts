import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  docData,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, filter, forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
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

  // getLoanByUid(uid: string, id:string): Observable<ProfileLoan | null> {
  //   const ref = doc(this.firestore, 'loan', uid+id);
  //   return docData(ref) as Observable<ProfileLoan>;
  // }

  // getLoanByUid(uid: string): Observable<ProfileLoan[]> {
  //   const loanObservables: Observable<ProfileLoan>[] = [];
  //   for (let i = 1; i <= 5; i++) { // Assuming 5 small cards based on your provided data
  //     const ref = doc(this.firestore, 'loan', uid + i); // Update the ID based on each small card ID
  //     loanObservables.push(docData(ref) as Observable<ProfileLoan>);
  //   }
  //   return forkJoin(loanObservables);
  // }

  // getLoanByUidAndId(uid: string, id: string): Observable<ProfileLoan | null> {
  //   const loanDocRef = doc(this.firestore, 'loans', `${uid}-${id}`);
  //   return docData(loanDocRef) as Observable<ProfileLoan | null>;
  // }

  // getLoanByUidAndId(uid: string, id: string): Observable<ProfileLoan | null> {
  //   const loanRef = doc(this.firestore, `loan/${uid}/${id}`);
  //   return docData(loanRef) as Observable<ProfileLoan | null>;
  // }

  // getLoanByUidAndId(uid: string, id: string): Observable<ProfileLoan | null> {
  //   const subcollectionName = `${uid}${id}`; // Combine UID and ID to form subcollection name
  //   const ref = doc(this.firestore, 'loan', subcollectionName);
  //   console.log("name of uid is", subcollectionName)
  //   return docData(ref) as Observable<ProfileLoan>;
  // }
  // getLoanByUidAndId(uid: string, id: string): Observable<ProfileLoan | null> {
  //   const path = `/loan/${uid}${id}`; // Construct the path dynamically
  //   const ref = doc(this.firestore, path);

  //   return docData(ref).pipe(
  //     catchError(error => {
  //       console.error('Error fetching loan data:', error);
  //       return of(null);
  //     })
  //   ) as Observable<ProfileLoan | null>;
  // }

  

  getLoanByUidAndId(uid: string, id: string): Observable<ProfileLoan | null> {
    if (!id) {
      // Handle the case where id is undefined or null
      console.error('Invalid id:', id);
      return of(null);
    }
  
    const subcollectionName = `${uid}${id}`; // Combine UID and ID to form subcollection name
    const ref = doc(this.firestore, 'loan', subcollectionName);
    console.log("ref value is", ref)
    console.log("name of uid is", subcollectionName)
    // return docData(ref) as Observable<ProfileLoan>;
    return docData(ref).pipe(
      map((data: any) => {
        // Assuming ProfileLoan is the correct type for your data
        return data as ProfileLoan; // Casting to ProfileLoan
      }),
      catchError(error => {
        console.error('Error fetching loan data:', error);
        return of(null);
      })
    );
  }

  
  getLoanByUid(uid: string): Observable<ProfileLoan[]> {
    const loansCollection = collection(this.firestore, 'loans');
    const q = query(loansCollection, where('uid', '==', uid));
    return new Observable<ProfileLoan[]>((observer) => {
      getDocs(q).then((snapshot: QuerySnapshot<DocumentData>) => {
        const loanData: ProfileLoan[] = [];
        snapshot.forEach((doc) => {
          loanData.push(doc.data() as ProfileLoan);
        });
        observer.next(loanData);
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  // getLoansByUid(uid: string): Observable<ProfileLoan[]> {
  //   const loansCollection = collection(this.firestore, 'loans');
  //   const q = query(loansCollection, where('uid', '==', uid));
  //   return docData(q) as Observable<ProfileLoan[]>;
  // }

}
