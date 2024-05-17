import { SelectedData } from "./types";

export const transactiondata: SelectedData[] = [
  {
    _id: "661fbe6145ba3df7a350a61b",
    type: "Payment",
    payment: {
      linkID: "IYK5XC",
      created: "2024-04-17T12:14:40.661Z",
      expired: "2024-04-17T12:21:45.395Z",
      amount_created: 130,
      amount_paid: 0,
      isPaid: "expired",
      isRedeemed: false,
      sender: {
        account_name: "Sample",
        account_number: "122889393",
      },
      reciever: "Sample",
    },
    owner: "6617f5eceff90e0819e901de",
    track_id: "IYK5XC",
    status: "expired",
    createdAt: "2024-04-17T12:19:45.396Z",
    updatedAt: "2024-04-17T12:21:51.121Z",
    __v: 0,
  },
  {
    _id: "661fbe6145ba3df7a350a234",
    type: "Withdrawal",
    withdrawal: {
      amount: 500,
      sender: "Micheal",
      reciever: {
        account_name: "Sample",
        account_number: "122889393",
      },
      description: 130,
      status: 0,
    },
    owner: "6617f5eceff90e0819e901de",
    track_id: "IYK5XC",
    status: "success",
    createdAt: "2024-04-17T12:19:45.396Z",
    updatedAt: "2024-04-17T12:21:51.121Z",
    __v: 0,
  },
];

export const bonus: any = [
  {
    _id: "661fbe6145ba3df7a350a255",
    type: "Referral",
    status: "successful",
    amount: 50,
    owner: "david",
    createdAt: "2024-04-17T12:19:45.396Z",
  },
];
