import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private incomeSubject = new BehaviorSubject<number>(0);
  private expenseSubject = new BehaviorSubject<number>(0);
  private totalBalanceSubject = new BehaviorSubject<number>(0);

  income$ = this.incomeSubject.asObservable();
  expense$ = this.expenseSubject.asObservable();
  totalBalance$ = this.totalBalanceSubject.asObservable();

  constructor() { }

  addIncome(amount: number) {
    this.incomeSubject.next(this.incomeSubject.value + amount);
    this.updateTotalBalance();
  }

  addExpense(amount: number) {
    this.expenseSubject.next(this.expenseSubject.value + amount);
    this.updateTotalBalance();
  }

  addInvestment(initialinvestmentAmount: number, regularinvestmentAmount: number, maturityAmount: number) {
    // Assume you have separate methods to handle investment, premium, and maturity
    this.addExpense(initialinvestmentAmount);
    this.addExpense(regularinvestmentAmount);
    this.addIncome(maturityAmount);
  }

  public getlatestTotalIncome(){
    return this.income$;
  }

  public getlatestTotalExpence(){
    return this.expense$;
  }

  public getlatestTotalBalance(){
    return this.totalBalance$
  }

  private updateTotalBalance() {
    const totalBalance = this.incomeSubject.value - this.expenseSubject.value;
    this.totalBalanceSubject.next(totalBalance);
  }
}
