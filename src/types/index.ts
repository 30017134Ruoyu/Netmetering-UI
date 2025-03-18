// src/types/index.ts
export interface Transaction {
  transactionID: string;
  fromAccount: EnergyAccount;
  toAccount: EnergyAccount;
  amount: number;
  dateTime: Date;
}

export interface EnergyAccount {
  email: string;
  energyBalance: number;
  availableBalance: number;
  transferedBalance: number;
  consumedBalance: number;
  cumulativeIncome: number;
  averageIncome: number;
}

export interface User {
  given_name: string;
  family_name: string;
  full_name: string;
  email: string;
  account?: EnergyAccount;
}

export interface Register {
  given_name: string;
  family_name: string;
  password: string;
  email: string;
  location: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Receiver {
  id: string;
  name: string;
  email: string;
}
