import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useCallback, useEffect, useState } from "react";
import type { WalletData } from ".";

const RPC_NODE_URL =
  "https://solana-devnet.g.alchemy.com/v2/alch_BbaFedRbXFkz7jzDl6c6R";

const connection = new Connection(RPC_NODE_URL);

export function useSolana(mnemonic: string) {
  const [solanaWallet, setSolanaWallet] = useState<WalletData[]>([]);

  const generateSolanaWallet = useCallback(() => {
    setSolanaWallet((prev) => {
      const seedPhrase = mnemonicToSeedSync(mnemonic);
      const derivationPath = `m/44'/501'/${prev.length}'/0'`;
      const privateKey = derivePath(
        derivationPath,
        seedPhrase.toString("hex"),
      ).key;
      const keys = Keypair.fromSeed(privateKey);

      const walletData: WalletData = {
        privateAddress: Buffer.from(keys.secretKey).toString("base64"),
        publicAddress: Keypair.fromSeed(privateKey).publicKey.toBase58(),
        balance: 0,
        unit: 1,
      };

      const wallets = [...prev, walletData];
      window.localStorage.setItem("solanaWallet", JSON.stringify(wallets));
      return wallets;
    });
  }, [mnemonic]);

  const deleteSolanaWallet = useCallback((privateAddress: string) => {
    setSolanaWallet((prev) => {
      const wallets = prev.filter(
        (wallet) => wallet.privateAddress !== privateAddress,
      );
      window.localStorage.setItem("solanaWallet", JSON.stringify(wallets));
      return wallets;
    });
  }, []);

  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    setLoader(true);
    // let wallets: WalletData[] = [];
    // if (solanaWallet.length === 0) {
    const wallets = JSON.parse(
      window.localStorage.getItem("solanaWallet") || "[]",
    ) as WalletData[];
    // }

    // Get Balance
    wallets.forEach(async (wallet) => {
      const secretKey = Buffer.from(wallet.privateAddress, "base64");
      const keypair = Keypair.fromSecretKey(secretKey);

      const balance = await connection.getBalance(keypair.publicKey);
      wallet.balance = balance;
      wallet.unit = LAMPORTS_PER_SOL;
    });

    window.localStorage.setItem("solanaWallet", JSON.stringify(wallets));
    setSolanaWallet(wallets);
    setLoader(false);
  }, []);

  return {
    solanaWallet,
    generateSolanaWallet,
    deleteSolanaWallet,
    loader,
  };
}
