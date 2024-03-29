import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-insuraance-dialog',
  templateUrl: './insuraance-dialog.component.html',
  styleUrls: ['./insuraance-dialog.component.css']
})
export class InsuraanceDialogComponent implements OnInit {

  formData: any = {};
  
    constructor(
      public dialogRef: MatDialogRef<InsuraanceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
  
    ngOnInit(): void {
      // Initialize form data with the received data
      this.formData = { ...this.data };
    }
  
    submitForm(): void {
      this.dialogRef.close(this.formData);
    }
  
    cancel(): void {
      this.dialogRef.close();
    }
  }



