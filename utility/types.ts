export type DownloadData = {
  // Define the properties of the object
};

export type UserProfileData = {
  _id: string;
  otp: number;
  otpExpire: {
    $date: string;
  };
  email: string;
  full_name: string;
  isVerified: boolean;
  isActive: boolean;
  referringUserIDs: any[]; // Change this to the correct type if possible
  recent_transactions: {
    $oid: string;
  }[];
  paymentLink: {
    linkID: string;
    issue_id: string;
    account_name: string;
    account_number: string;
    bank_name: string;
    created: {
      $date: string;
    };
    expired: {
      $date: string;
    };
    amount_created: number;
    amount_paid: number;
    isPaid: string;
    incompletePaymentCount: number;
    status: string;
    _id: {
      $oid: string;
    };
    sender_mail?: string; // This field is optional
  }[];
  withdrawalIssued: any[]; // Change this to the correct type if possible
  beneficiaries: {
    bank_Name: string;
    account_Number: string;
    account_Name: string;
    bank_Code: string;
    _id: string;
  }[];
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
  balances: {
    main_wallet: number;
    pending_wallet: number;
    refferal_wallet: number;
  };
  country: string;
  location: string;
  date_of_birth: {
    $date: string;
  };
  gender: string;
  password: string;
  pin: number;
  referer: number;
  userReferralID: number;
  username: string;
  phone: string;
};

export type SelectedData = {
  _id: string;
  type: "Payment" | "Withdrawal";
  payment?: {
    linkID: string;
    created: Date | undefined | string; // Assuming this is a string representing the date
    expired: Date | undefined | string; // Assuming this is a string representing the date
    amount_created: number;
    amount_paid: number;
    isPaid: string;
    isRedeemed: boolean;
    reciever: string;
    sender?: {
      account_name: string;
      account_number: string;
    };
  };
  withdrawal?: {
    amount: number;
    sender: string; // Assuming this is a string representing the date
    reciever?: {
      account_name: string;
      account_number: string;
    }; // Assuming this is a string representing the date
    description: string; // Since the value is 130 in your example
    status: string; // Since the value is 0 in your example
  };
  owner: string;
  track_id: string;
  status: string;
  createdAt: Date; // Assuming this is a string representing the date
  updatedAt: Date; // Assuming this is a string representing the date
  __v: number;
};

export interface SignUpData {
  email: string;
  otp: string;
  username: string;
  gender: string;
  password: string;
  pin: number | null;
  date_of_birth: Date | null;
}

export interface PaginationState<T> {
  currentPage: number;
  totalPages: number;
  goToPage: (pageNumber: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  getPageItems: (items: T[]) => T[];
}

export type Dispute = {
  type: string;
  status: string;
  payment_status: string;
  dispute_id: string;
  amount: number;
  email: string;
  sender: string;
  reciever: string;
  reason: string;
  client_tx: boolean;
  refund: string;
  reminder: number;
  owner: string;
  createdAt: Date; // Assuming this is a string representing the date
  updatedAt: Date; // Assuming this is a string representing the date
};

export type ReferralBonus = {
  type: string;
  status: string;
  amount: number;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PaymentReturnValue = {
  linkID: string;
  issue_id: string;
  account_number: string;
  bank_name: string;
  account_name: string;
  expired: string;
  amount_created: string;
  isPaid: string;
  status: string;
  user: string;
};

export type WithdrawObj = {
  amount: string;
  bankName: string;
  bankImg: string;
  bankCode: string;
  bankShortCode: string;
  accNo: string;
  accName: string;
  details: string;
  status: boolean;
};

export interface Bank {
  id: string;
  name: string;
  short_code: string;
  code: string;
  img_url: string;
}

export type CancelTx = {
  modal: boolean;
  code: string;
};
