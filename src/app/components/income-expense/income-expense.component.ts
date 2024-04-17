import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionPopupComponent } from '../transaction-popup/transaction-popup.component';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { Subscription } from 'rxjs';
import { IncomeExpenceService } from 'src/app/services/income-expence.service';
// import { TransactionPopupComponent } from './transaction-popup/transaction-popup.component';
import { ProfileIncomeExpence } from 'src/app/models/income-expence';
import { forkJoin, of, switchMap } from 'rxjs';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {
  // activeIncome!: number;
  // passiveIncome!: number;
  // otherIncome!: number;
  // monthlyExpense!: number;
  // quarterlyExpense!: number;
  // yearlyExpense!: number;
  // totalBalance!: number;
  transactions: any[] = []; 
  
  user$ = this.usersService.currentUserProfile$;
  currentuid:any
  incomeexpenceInfo:any[]=[];
  data: any;// Define an array to store transactions
// openTransactionPopup : boolean = false;


deleteTransaction(transaction: any) {
// Assuming this method deletes a transaction from the array
const index = this.transactions.indexOf(transaction);
if (index !== -1) {
  this.transactions.splice(index, 1);
}
}
addTransaction(transaction: any) {
  this.transactions.push(transaction);
}

// openNewTransactionDialog() {
//   const newTransaction = {
//   date: '2024-04-10', // Replace with actual date
//   type: 'Expense', // Replace with actual type (Income or Expense)
//   amount: 100 // Replace with actual amount
// };
// this.transactions.push(newTransaction);
// }
  activeIncome: number = 0;
  passiveIncome: number = 0;
  otherIncome: number = 0;
  monthlyExpense: number = 0;
  quarterlyExpense: number = 0;
  yearlyExpense: number = 0;
  totalBalance: number = 0;

  private  totalBalanceSubscription!: Subscription;


  incomeTypes: string[] = ['Active Income', 'Passive Income', 'Other Income'];
  expenseTypes: string[] = ['Monthly Expense', 'Quarterly Expense', 'Yearly Expense'];


  constructor(private dialog: MatDialog, private dataservice:DataServiceService, private incomeexpenceservice: IncomeExpenceService, private usersService: UsersService) { }
  ngOnInit(): void {
    debugger
    this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
    this.totalBalance= totalbalance
       })

       this.user$.subscribe(data=>{
        this.currentuid = data?.uid
        console.log("current user id", this.currentuid);
       })
    
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits null
          return of(null);
        } 
        return this.incomeexpenceservice.getIncomeexpenceByUid(data.uid);
      
      })
    ).subscribe((incomeexpenceData:any) => {
      if (incomeexpenceData) {
        // Handle the insurance data here
        debugger
        this.incomeexpenceInfo.push(incomeexpenceData)
        console.log('Incomeexpence Data:', incomeexpenceData);
        console.log("incomeexpence inside array ", this.incomeexpenceInfo)
        console.log("id",this.incomeexpenceInfo[0].id)

        // if(this.incomeexpenceInfo){
        //   for(let i=0;i<this.incomeexpenceInfo.length;i++){

        //     this.updateincomeexpence(this.incomeexpenceInfo[i],this.incomeexpenceInfo[i].id)
        //   }
        // }
      } else {
        // Handle case when insurance data is null
        console.log('No incomeexpence data found.');
      }
    });
  }
  
  
  // constructor(public dialog: MatDialog, private dataservice:DataServiceService) {}
  // ngOnInit(): void {
  //   this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
  //     this.totalBalance= totalbalance
  //   })
  // }

  openTransactionPopup(): void {
    const dialogRef = this.dialog.open(TransactionPopupComponent, {
      width: '300px',
      data: {
        incomeTypes: this.incomeTypes,
        expenseTypes: this.expenseTypes,
        
      } 
    });

  //   {
  //     "type": "Income",
  //     "incomeType": "Active Income",
  //     "expenseType": "",
  //     "description": "hbiu",
  //     "amount": 1000
  // }
  // {
  //   uid: string;
  //   activeIncome: number;
  //   passiveIncome: number;
  //   otherIncome: number;
  //   monthlyExpense: number;
  //   quarterlyExpense: number;
  //   yearlyExpense: number;
  //   totalBalance: number;
  //   totalIncome:number;
  //   totalExpense:number
  // }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 'Income') {
          this.handleIncomeTransaction(result);
        } else if (result.type === 'Expense') {
          this.handleExpenseTransaction(result);
        }

        let a:ProfileIncomeExpence = this.getalldata()
        console.log('income,ecpense result', result)
        this.incomeexpenceservice.addIncomeexpence(a)
      }
    });
  }
  getalldata(){


    let a:ProfileIncomeExpence= {
      uid: '',
      activeIncome: 0,
      passiveIncome: 0,
      otherIncome: 0,
      monthlyExpense: 0,
      quarterlyExpense: 0,
      yearlyExpense: 0,
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0
    }
    a.activeIncome = this.activeIncome;
    a.passiveIncome = this.passiveIncome;
    a.otherIncome = this.otherIncome;
    a.monthlyExpense = this.monthlyExpense;
    a.quarterlyExpense = this.quarterlyExpense;
    a.yearlyExpense=this.yearlyExpense;
    a.totalBalance = this.totalBalance;
    a.totalIncome= this.getTotalIncome();
    a.totalExpense = this.getTotalExpense()
    a.uid= this.currentuid

    console.log("total info" , a)
    return a;
  }

  handleIncomeTransaction(data: any): void {
    if (data.incomeType === 'Active Income') {
      this.activeIncome += data.amount;
    } else if (data.incomeType === 'Passive Income') {
      this.passiveIncome += data.amount;
    } else if (data.incomeType === 'Other Income') {
      this.otherIncome += data.amount;
    }
    // this.calculateTotalBalance();
  }
  // updateincomeexpence(i: any, id: any){
  //   debugger
  //   if(this.transactionType == 'Income'){
  //     this.dataservice.addIncome(this.amount)
  //   }else{
  //     this.dataservice.addExpense(this.amount)
  //   }
  // }
  handleExpenseTransaction(data: any): void {
    if (data.expenseType === 'Monthly Expense') {
      this.monthlyExpense += data.amount;
    } else if (data.expenseType === 'Quarterly Expense') {
      this.quarterlyExpense += data.amount;
    } else if (data.expenseType === 'Yearly Expense') {
      this.yearlyExpense += data.amount;
    }
    // this.calculateTotalBalance();
  }

  // calculateTotalBalance(): void {
  //   this.totalBalance = this.activeIncome + this.passiveIncome + this.otherIncome - this.monthlyExpense - this.quarterlyExpense - this.yearlyExpense;
  // }

  getTotalIncome(): number {
    return this.activeIncome + this.passiveIncome + this.otherIncome;
  }

  getTotalExpense(): number {
    return this.monthlyExpense + this.quarterlyExpense + this.yearlyExpense;
  }

  getIncomeValue(type: string): number {
    if (type === 'Active Income') {
      return this.activeIncome;
    } else if (type === 'Passive Income') {
      return this.passiveIncome;
    } else if (type === 'Other Income') {
      return this.otherIncome;
    }
    return 0;
  }

  getExpenseValue(type: string): number {
    if (type === 'Monthly Expense') {
      return this.monthlyExpense;
    } else if (type === 'Quarterly Expense') {
      return this.quarterlyExpense;
    } else if (type === 'Yearly Expense') {
      return this.yearlyExpense;
    }
    return 0;
  }
}



