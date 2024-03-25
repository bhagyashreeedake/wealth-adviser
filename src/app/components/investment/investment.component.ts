import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvesstmentDialogComponent } from '../invesstment-dialog/invesstment-dialog.component';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent {
  // Define variables to hold investment data
  emergencyFund!: number;
  realEstateValue!: number
  monthlySIP!: number;
  debtInvestment!: number;
  equityInvestment!: number
  goldBondInvestment!: number;
  savingsInvestment!: number;

  constructor(private dialog: MatDialog) { }

  openInvestmentDialog(): void {
    const dialogRef = this.dialog.open(InvesstmentDialogComponent, {
      width: '500px',
      data: {
        emergencyFund: this.emergencyFund,
        realEstateValue: this.realEstateValue,
        monthlySIP: this.monthlySIP,
        debtInvestment: this.debtInvestment,
        equityInvestment: this.equityInvestment,
        goldBondInvestment: this.goldBondInvestment,
        savingsInvestment: this.savingsInvestment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInvestments(result);
      }
    });
  }

  updateInvestments(data: any): void {
    // Update investment data based on the result from the dialog
    this.emergencyFund = data.emergencyFund;
    this.realEstateValue = data.realEstateValue;
    this.monthlySIP = data.monthlySIP;
    this.debtInvestment = data.debtInvestment;
    this.equityInvestment = data.equityInvestment;
    this.goldBondInvestment = data.goldBondInvestment;
    this.savingsInvestment = data.savingsInvestment;
    this.smallCards[0].textRows.push("actual Rs."+this.emergencyFund)
    this.smallCards[1].textRows.push("actual Rs."+this.realEstateValue)
    this.smallCards[2].textRows.push("actual Rs."+this.monthlySIP)
    this.smallCards[3].textRows.push("actual Rs."+this.debtInvestment)
    this.smallCards[4].textRows.push("actual Rs."+this.equityInvestment)
    this.smallCards[5].textRows.push("actual Rs."+this.goldBondInvestment)
    this.smallCards[6].textRows.push("actual Rs."+this.savingsInvestment)
  }
   

  heading = 'Investment';
  smallCards: { id: number; textRows: string[] }[] = [
    { id: 1, textRows:  ['Expected Rs. 50000000/-', 'Emergency Fund'] },
    { id: 2, textRows: ['Expected Rs. 10000000/-', 'Mutual Funds'] },
    { id: 3, textRows: ['Expected Rs. 20000000/-', 'Equity'] },
    { id: 4, textRows: ['Expected Rs. 40000000/-', 'Debt'] },
    { id: 5, textRows: ['Expected Rs. 30000000/-', 'Gold'] },
    { id: 6, textRows: ['Expected Rs. 400000/-', 'Real Estate/Properties'] },
    { id: 7, textRows: ['Expected Rs. 6000000/-', 'NPS/PPF'] }
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

