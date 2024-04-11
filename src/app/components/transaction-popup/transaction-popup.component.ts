import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data/data-service.service';

@Component({
  selector: 'app-transaction-popup',
  templateUrl: './transaction-popup.component.html',
  styleUrls: ['./transaction-popup.component.css']
})
export class TransactionPopupComponent {
  transactionType: string = 'Income';
  incomeType: string = '';
  expenseType: string = '';
  description: string = '';
  amount: number = 0;
  date!: Date;

  constructor(
    public dialogRef: MatDialogRef<TransactionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataservice:DataServiceService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateincomeexpence(){
    debugger
    if(this.transactionType == 'Income'){
      this.dataservice.addIncome(this.amount)
    }else{
      this.dataservice.addExpense(this.amount)
    }
  }
}
