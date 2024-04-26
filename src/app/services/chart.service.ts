import { Injectable } from '@angular/core';
// import { combineLatest, Observable, of } from 'rxjs';
// import { map, switchMap } from 'rxjs/operators';
// import {  } from '@angular/router';
import { DocumentReference } from '@angular/fire/firestore';

import {
  collection,
  doc,
  docData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { filter, from, map, Observable, of, switchMap, combineLatest} from 'rxjs';
import { AuthService } from './auth.service';
import { InsuraanceDialogComponent } from '../components/insuraance-dialog/insuraance-dialog.component';
import { ProfileUser } from '../models/user';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { Data } from '@angular/router';
import { IncomeExpenseComponent } from '../components/income-expense/income-expense.component';
import { InsuranceComponent } from '../components/insurance/insurance.component';
import { InvestmentComponent } from '../components/investment/investment.component';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// interface ComponentData {
//   // Define the structure of your data submitted from components
//   uid: string;
//   IncomeExpenseComponent: string;
//   InsuranceComponent: string;
//   InvestmentComponent: string;
//   LoansComponent: string;
//   // ... other data fields
// }




@Injectable({
  providedIn: 'root'
})
// let data: any;
export class ChartService {

  combinedData$!: Observable<any>;  

  constructor(private firestore: Firestore, private authService: AuthService) {}
  // combinedData$: Observable<ComponentData[]> | undefined;

  // fetchAllData(): void {
  //   this.authService.currentUser$.subscribe(user => {
  //     if (user) { // Check if user is logged in
  //       const uid = user.uid; // Access the UID from the user object

  //       // Get references to documents based on your folder structure
  //       // const userDocRef: DocumentReference<any> = this.firestore.collection('users').doc(userId);
  //       // return userDocRef.valueChanges();
  //       // const userRef = this.firestore.doc<ComponentData>(`users/${uid}`);
  //       const userRef = doc(this.firestore, 'users', uid)
  //       // const investmentRef = this.firestore.doc<ComponentData>(`investment/${uid}`);
  //       const investmentRef = doc(this.firestore, 'investment', uid)
  //       // const insuranceRef = this.firestore.doc<ComponentData>(`insurance/${uid}`);
  //       const insuranceRef = doc(this.firestore, 'insurance', uid)
  //       // const incomeExpenseRef = this.firestore.doc<ComponentData>(`incomeExpense/${uid}`);
  //       // const incomeExpenseRef = doc(this.firestore, 'incomeExpense', uid)
  //       const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
  //       console.log("income expence information", incomeExpenseRef)

  //       const loanRef = doc(this.firestore, 'loan', uid)

  //       let a = {
  //         userinfo: userRef,
  //         invesmentinfo:investmentRef,
  //         insuranceinfo: insuranceRef,
  //         incomeexpenceinfo: incomeExpenseRef,
  //         loaninfo: loanRef
  //       }
  //       console.log("totalinformation",a)
  //       // Combine observables using combineLatest
  //       // this.combinedData$ = combineLatest([
  //       //   userRef.valueChanges(),
  //       //   investmentRef.valueChanges(),
  //       //   insuranceRef.valueChanges(),
  //       //   incomeExpenseRef.valueChanges(),
  //       // ])
  //         // .pipe(
  //         //   map(datasets => datasets.filter(data => !!data)) // Filter out null/undefined values
  //         // );
  //     } else {
  //       // Handle case where user is not logged in (e.g., display error message)
  //     }
  //   });
  // }
  fetchAllData(): void {
    console.log('fetchAllData called');

    debugger
    this.combinedData$ = this.authService.currentUser$.pipe(
    map(user => {
    this.authService.currentUser$.subscribe(user => {
      console.log('currentUser$', user);

      if (user) {
        console.log('Setting up combinedData$');

        const uid = user.uid;

        // Create document references
        const userRef = doc(this.firestore, 'users', uid);
        const investmentRef = doc(this.firestore, 'investment', uid);
        const insuranceRef = doc(this.firestore, 'insurance', uid);
        const incomeExpenseRef = doc(this.firestore, 'incomeexpence', uid);
        const loanRef = doc(this.firestore, 'loan', uid);

        // Convert document references to data streams
        const userObs = docData(userRef);
        const investmentObs = docData(investmentRef);
        const insuranceObs = docData(insuranceRef);
        const incomeExpenseObs = docData(incomeExpenseRef);
        const loanObs = docData(loanRef);

        // Combine observables into a single observable stream
        this.combinedData$ = combineLatest([
          userObs,
          investmentObs,
          insuranceObs,
          incomeExpenseObs,
          loanObs
        ]).pipe(
          map(([userInfo, investmentInfo, insuranceInfo, incomeExpenseInfo, loanInfo]) => ({
            userInfo,
            investmentInfo,
            insuranceInfo,
            incomeExpenseInfo,
            loanInfo
          }))
        );
      } else {
        // Optionally handle the case where the user is not logged in
        console.error('User not logged in');
      }
    });
    }));
  
  // });

  }

}
