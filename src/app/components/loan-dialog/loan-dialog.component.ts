import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-loan-dialog',
  templateUrl: './loan-dialog.component.html',
  styleUrls: ['./loan-dialog.component.css']
})
export class LoanDialogComponent implements OnInit {

  formData: any = {};
  
  constructor(
    public dialogRef: MatDialogRef<LoanDialogComponent>,
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


