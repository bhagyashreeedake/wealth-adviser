
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invesstment-dialog',
  templateUrl: './invesstment-dialog.component.html',
  styleUrls: ['./invesstment-dialog.component.css']
})
export class InvesstmentDialogComponent implements OnInit {

  
    formData: any = {};
  
    constructor(
      public dialogRef: MatDialogRef<InvesstmentDialogComponent>,
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


