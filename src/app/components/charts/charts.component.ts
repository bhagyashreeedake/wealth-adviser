import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { DataServiceService } from 'src/app/services/data/data-service.service';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  totalInitialInvestment: number = 0;
  totalLoanAmount: number = 0;
  totalIncome!:number
  totalExpence!:number 
  totalBalance!:number 
  // totalInitialamount!: number
  private totalIncomeSubscription!: Subscription;
  private  totalexpencesubscription!: Subscription;
  private  totalBalanceSubscription!: Subscription;
  private totalInitialInvestmentSubscription!: Subscription;
  private totalLoanamountSubscription!: Subscription;
  myDonutChart: any;

  

  constructor(private dataservice:DataServiceService) { }

  ngOnInit(): void {

    this.dataservice.totalInitialInvestment$.subscribe(total => {
      this.totalInitialInvestment = total;
    })

    this.dataservice.totalLoanAmount$.subscribe(total => {
      this.totalLoanAmount = total;
    })

    this.totalIncomeSubscription = this.dataservice.getlatestTotalIncome().subscribe(income=>{
      this.totalIncome = income;
      console.log('income', this.totalIncome)
      this.updateChartData();

    })
    // this.totalInitialamountSubscription = this.dataservice.getlatestTotalInitialamount().subscribe(totalInitialamount=>{
    //   this.totalInitialamount = totalInitialamount
    //   // /console.log('income', this.totalIncome)
    //   // this.updateChartData();

    // })

    this.totalexpencesubscription = this.dataservice.getlatestTotalExpence().subscribe(expence=>{
      this.totalExpence = expence;
      console.log('expence', this.totalExpence)
      this.updateChartData();
    })

    this.totalBalanceSubscription = this.dataservice.getlatestTotalBalance().subscribe(totalbalance=>{
      this.totalBalance= totalbalance
    })
    let expence = this.dataservice.getlatestTotalExpence()
    // Initialize your DOM-related operations in ngOnInit
    document.addEventListener('DOMContentLoaded', () => {
      const meterArrow = document.querySelector('.scoreMeter .meterArrow') as HTMLElement | null;
      const meterScore = document.querySelector('.scoreMeter .meterScore .score') as HTMLElement | null;

      const updateMeter = (score: number) => {
        if (meterArrow && meterScore) {
          const rotation = (score / 10) * 225;
          meterArrow.style.transform = `rotate(${rotation}deg)`;
          meterArrow.dataset['score'] = score.toFixed(0);
          meterScore.textContent = `${score.toFixed(0)}/10`;
        }
      };

      // Initial animation with a predefined score (e.g., 8)
      const initialScore = 10;  // Set the initial score here
      // window.updateInitialScore = (score: number) => {
      //   updateMeter(score);
      // };

      // Delay the initial animation to allow smooth transition
      setTimeout(() => {
        if (meterArrow) {
          meterArrow.style.transition = 'transform 3s ease-in-out';
          updateMeter(initialScore);
        }
      }, 500); 

      
    });
    this.initChart();

  }

  initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    let chartnumbers:number[] = [];
    chartnumbers.push(this.totalExpence);
    chartnumbers.push(this.totalIncome);
    this.myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
        data: [this.totalExpence, this.totalIncome],
          backgroundColor: ['#ff0000', '#00ff00'],
          // Additional dataset properties if needed
        }],
        labels: ['Expence', 'Income']
      },
      options: {
        // Chart options such as title, legend, etc.
      }
    });
  }
  updateChartData(): void {
    if (this.myDonutChart) {
      this.myDonutChart.data.datasets[0].data = [this.totalExpence, this.totalIncome];
      this.myDonutChart.update();
    }
  }
  
  
}
