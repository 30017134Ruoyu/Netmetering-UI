// src/types/index.ts
export interface Transaction {
    transactionID: string
    fromAccount: EnergyAccount
    toAccount: EnergyAccount
    amount: number
    dateTime: Date
  }
  
  export interface EnergyAccount {
    accountID: string
    email: string
    energyBalance: number
    user?: User
  }
  
  export interface User {
    userID: string
    given_name: string
    family_name: string
    full_name: string
    email: string
    location: string
    account?: EnergyAccount
  }
  
  export interface Receiver {
    id: string
    name: string
    email: string
  }