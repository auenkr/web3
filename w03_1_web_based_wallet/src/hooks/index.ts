export enum MnemonicsType {
  character_12 = 128,
  character_24 = 256,
}

export type WalletData = {
  privateAddress: string;
  publicAddress: string;
  balance: number;
  unit: number;
};
