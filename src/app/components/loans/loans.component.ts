import { Component, OnInit } from '@angular/core';
import { LoanDialogComponent } from '../loan-dialog/loan-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceService } from 'src/app/services/data/data-service.service';
import { forkJoin, of, switchMap } from 'rxjs';
import { LoanService } from 'src/app/services/loan.service';
import { ProfileLoan } from 'src/app/models/loan';
import { uid } from 'chart.js/dist/helpers/helpers.core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {

  loanAmount!: number;
  loandisbursmentDate!: Date;
  emiAmount!: number
  emiDate!: Date;
  emiPayingType!: string;
  maturityDate!: Date;
  maturityAmount!: number;
  annualRateOfInterest!: number;
  id: any;
  totalLoanAmount: number = 0;
  user$ = this.usersService.currentUserProfile$;
  loanInfo:any[]=[];
  data: any;

  constructor(private dialog: MatDialog, private dataservice:DataServiceService, private usersService: UsersService, private loanservice: LoanService ) { }
  ngOnInit(): void {
    debugger
    
    this.user$.pipe(
      switchMap((data: any) => {
        if (!data || !data.uid) {
          // If user data or UID is not available, return an observable that emits null
          return of(null);
        } 
        return this.loanservice.getLoanByUid(data.uid, '1');
      
      })
    ).subscribe((loanData:any) => {
      if (loanData) {
        // Handle the insurance data here
        debugger
        this.loanInfo.push(loanData)
        console.log('loan Data:', loanData);
        console.log("loan inside array ", this.loanInfo)
        console.log("id",this.loanInfo[0].id)

        if(this.loanInfo){
          for(let i=0;i<this.loanInfo.length;i++){

            this.updateLoan(this.loanInfo[i],this.loanInfo[i].id)
          }
        }
      } else {
        // Handle case when insurance data is null
        console.log('No loan data found.');
      }
    });
 
 
  }
  
  openLoanDialog(id: number): void {
    
    const dialogRef = this.dialog.open(LoanDialogComponent, {
      width: '500px',
      data: {
        loanAmount: this.loanAmount,
        loandisbursmentDate: this.loandisbursmentDate,
        emiAmount: this.emiAmount,
        emiDate: this.emiDate,
        emiPayingType: this.emiPayingType,
        maturityDate: this.maturityDate,
        maturityamount: this.maturityAmount,
        annualRateOfInterest: this.annualRateOfInterest,
        id:id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result after closing the loans component", result)
      if (result) {
        this.updateLoan(result, id);
      }
    });
  }

  updateLoan(data: any, id: number): void {
    // Update investment data based on the result from the dialog
    this.loanAmount = data.loanAmount;
    this.loandisbursmentDate = data.loandisbursmentDate;
    this.emiAmount = data.emiAmount;
    this.emiDate = data.emiDate;
    this.emiPayingType = data.emiPayingType;
    this.maturityDate = data.maturityDate;
    this.maturityAmount = data.maturityAmount;
    this.annualRateOfInterest = data.annualRateOfInterest;
    this.totalLoanAmount += this.loanAmount;
    this['dataservice'].setTotalLoanAmount(this.totalLoanAmount);

    // Find the small card with the matching id and update its textRows
  const smallCardIndex = this.smallCards.findIndex(card => card.id === id);
  if (smallCardIndex !== -1) {
    this.smallCards[smallCardIndex].textRows.push(
      "Loan Amount Rs." + this.loanAmount,
      "Loan disbursment Date: " + this.loandisbursmentDate,
      "EMI Amount Rs." + this.emiAmount,
      "EMI Date: " + this.emiDate,
      "EMI Pay Type: " + this.emiPayingType,
      "Maturity Date: " + this.maturityDate,
      "Maturity Amount: " + this.maturityAmount,
      "Rate Of Interest In %: " + this.annualRateOfInterest
    );
  }
    
  }
   

  heading = 'Loans';
  smallCards: { id: number; textRows: string[] }[] = [
    { id: 1, textRows:  ['Ecpected Loan Rs. 50000000/-', 'Home Loan'] },    
    { id: 2, textRows: ['Expected Loan Rs. 10000000/-', 'Education Loan'] },
    { id: 3, textRows: ['Expected Loan Rs. 20000000/-', 'Car Loan'] },
    { id: 4, textRows: ['Expected Loan Rs. 40000000/-', 'Personal Loan'] },
    { id: 5, textRows: ['Expected Loan Rs. 30000000/-', 'Business Loan'] },
    // { id: 6, textRows: ['Expected Loan Rs. 400000/-', 'Real Estate/Properties'] },
    // { id: 7, textRows: ['Expected Loan Rs. 6000000/-', 'NPS/PPF'] }
  ];

  addSmallCard() {
    this.smallCards.push({
      id: this.smallCards.length + 1,
      textRows: [`Card ${this.smallCards.length + 1}.1`, `Card ${this.smallCards.length + 1}.2`, `Card ${this.smallCards.length + 1}.3`]
    });
  }

  cardClickHandler(cardText: string) {
    alert(`Clicked: ${cardText}`);
  }
}

