import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
      const initialScore = 3;  // Set the initial score here
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
    const myDonutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 20],
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
  
}
