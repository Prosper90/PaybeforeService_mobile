import React, { createContext, useState, useContext, ReactNode } from "react";
import { CancelTx } from "./types";
import {
  Dispute,
  SelectedData,
  SignUpData,
  UserProfileData,
  WithdrawObj,
} from "./types";

interface DataContextProps {
  signUpData: SignUpData;
  setSignUpData: React.Dispatch<React.SetStateAction<SignUpData>>;
  userProfile: UserProfileData | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileData | null>>;
  selectedViewTransaction: SelectedData | null;
  setSelectedViewTransaction: React.Dispatch<
    React.SetStateAction<SelectedData | null>
  >;
  selectedViewDispute: Dispute | null;
  setSelectedViewDispute: React.Dispatch<React.SetStateAction<Dispute | null>>;
  successPayment: boolean;
  setSuccessPayment: React.Dispatch<React.SetStateAction<boolean>>;
  paymentPaidFor: string;
  setPaymentPaidFor: React.Dispatch<React.SetStateAction<string>>;
  withdraw: WithdrawObj;
  setWithdraw: React.Dispatch<React.SetStateAction<WithdrawObj>>;
  cancelPayment: CancelTx;
  setCancelPayment: React.Dispatch<React.SetStateAction<CancelTx>>;
  recentTransactions: SelectedData[] | null;
  setRecentTransactions: React.Dispatch<
    React.SetStateAction<SelectedData[] | null>
  >;
}

interface ContextProviderProps {
  children: ReactNode;
}

// export const DataContext = createContext<DataContextProps | null>(null);
export const DataContext = createContext<DataContextProps>(
  {} as DataContextProps
);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [signUpData, setSignUpData] = useState<SignUpData>({
    email: "",
    otp: "",
    username: "",
    gender: "",
    password: "",
    pin: null,
    date_of_birth: null,
  });
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [selectedViewTransaction, setSelectedViewTransaction] =
    useState<SelectedData | null>(null);
  const [selectedViewDispute, setSelectedViewDispute] =
    useState<Dispute | null>(null);
  const [successPayment, setSuccessPayment] = useState<boolean>(false);
  const [paymentPaidFor, setPaymentPaidFor] = useState<string>("");
  const [withdraw, setWithdraw] = useState<WithdrawObj>({
    amount: "",
    bankName: "Access Bank",
    bankImg: "../../assets/banks/access-bank.png",
    bankCode: "000014",
    bankShortCode: "044",
    accNo: "",
    accName: "",
    details: "",
    status: false,
  });
  const [cancelPayment, setCancelPayment] = useState<CancelTx>({
    modal: false,
    code: "",
  });

  //for transaction
  const [recentTransactions, setRecentTransactions] = useState<
    SelectedData[] | null
  >(null);

  const valuesEntered: DataContextProps = {
    signUpData,
    setSignUpData,
    userProfile,
    setUserProfile,
    selectedViewTransaction,
    setSelectedViewTransaction,
    selectedViewDispute,
    setSelectedViewDispute,
    successPayment,
    setSuccessPayment,
    paymentPaidFor,
    setPaymentPaidFor,
    withdraw,
    setWithdraw,
    cancelPayment,
    setCancelPayment,
    recentTransactions,
    setRecentTransactions,
  };

  return (
    <DataContext.Provider value={valuesEntered}>
      {children}
    </DataContext.Provider>
  );
};
