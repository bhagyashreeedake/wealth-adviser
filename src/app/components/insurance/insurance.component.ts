import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { InvesstmentDialogComponent } from '../invesstment-dialog/invesstment-dialog.component';
import { InsuraanceDialogComponent } from '../insuraance-dialog/insuraance-dialog.component';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent {
  coverAmount!: number;
  premiumAmount!: number
  insuredDate!: Date;
  premiumPayingType!: string;
  maturityDate!: Date;
  maturityAmount!: number;
  annualRateOfReturn!: number;

  constructor(private dialog: MatDialog) { }

  openInsuraanceDialog(): void {
    const dialogRef = this.dialog.open(InsuraanceDialogComponent, {
      width: '500px',
      data: {
        coverAmount: this.coverAmount,
        premiumAmount: this.premiumAmount,
        insuredDate: this.insuredDate,
        premiumPayingType: this.premiumPayingType,
        maturityDate: this.maturityDate,
        maturityamount: this.maturityAmount,
        annualRateOfReturn: this.annualRateOfReturn
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInsurance(result);
      }
    });
  }

  updateInsurance(data: any): void {
    // Update investment data based on the result from the dialog
    this.coverAmount = data.coverAmount;
    this.premiumAmount = data.premiumAmount;
    this.insuredDate = data.insuredDate;
    this.premiumPayingType = data.premiumPayingType;
    this.maturityDate = data.maturityDate;
    this.maturityAmount = data.maturityAmount;
    this.annualRateOfReturn = data.rateOfReturn;
    this.smallCards[0].textRows.push("Cover Amount Rs."+this.coverAmount)
    this.smallCards[0].textRows.push("Premium Amount Rs."+this.premiumAmount)
    this.smallCards[0].textRows.push("Insured Date"+this.insuredDate)
    this.smallCards[0].textRows.push("Premium Pay Type"+this.premiumPayingType)
    this.smallCards[0].textRows.push("Maturity Date "+this.maturityDate)
    this.smallCards[0].textRows.push("Maturity Amount"+this.maturityAmount)
    this.smallCards[0].textRows.push("Rate Of Return In %"+this.annualRateOfReturn)
  }
   

  heading = 'Insurance';
  smallCards: { id: number; textRows: string[] }[] = [
    { id: 1, textRows:  ['Expected Cover Rs. 50000000/-', 'Term Insurance'] },    
    { id: 2, textRows: ['Expected Cover Rs. 10000000/-', 'Mediclaim Policy'] },
    // { id: 3, textRows: ['Expected Cover Rs. 20000000/-', 'Equity'] },
    // { id: 4, textRows: ['Expected Rs. 40000000/-', 'Debt'] },
    // { id: 5, textRows: ['Expected Rs. 30000000/-', 'Gold'] },
    // { id: 6, textRows: ['Expected Rs. 400000/-', 'Real Estate/Properties'] },
    // { id: 7, textRows: ['Expected Rs. 6000000/-', 'NPS/PPF'] }
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

