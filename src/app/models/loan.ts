export interface ProfileLoan {
    uid: string;
    loanAmount?: number;
    loandisbursmentDate?: Date;
    emiAmount?: number
    emiDate?: Date;
    emiPayingType?: string;
    maturityDate?: Date;
    maturityAmount?: number;
    annualRateOfInterest?: number;
    id: any;
    totalLoanAmount?: number;
  }