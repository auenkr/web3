import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet, JsonRpcProvider, Wallet, WeiPerEther } from "ethers";
import { useCallback, useEffect, useState } from "react";
import type { WalletData } from ".";

const RPC_NODE_URL =
  "https://eth-sepolia.g.alchemy.com/v2/alch_BbaFedRbXFkz7jzDl6c6R";

const connection = new JsonRpcProvider(RPC_NODE_URL);

export function useEthereum(mnemonics: string) {
  const [ethereumWallet, setEthereumWallet] = useState<WalletData[]>([]);

  const generateEthereumWallet = useCallback(() => {
    setEthereumWallet((prev) => {
      const seedPhrase = mnemonicToSeedSync(mnemonics);
      const derivationPath = `m/44'/60'/${prev.length}'/0'`;

      const hdNode = HDNodeWallet.fromSeed(seedPhrase);
      const node = hdNode.derivePath(derivationPath);

      const privateKey = node.privateKey;
      const wallet = new Wallet(privateKey);

      const walletData: WalletData = {
        privateAddress: wallet.privateKey,
        publicAddress: wallet.address,
        balance: 0,
        unit: 1,
      };

      const wallets = [...prev, walletData];
      window.localStorage.setItem("ethereumWallet", JSON.stringify(wallets));

      return wallets;
    });
  }, [mnemonics]);

  const deleteEthereumWallet = useCallback((privateAddress: string) => {
    setEthereumWallet((prev) => {
      const wallets = prev.filter(
        (wallet) => wallet.privateAddress !== privateAddress,
      );
      window.localStorage.setItem("ethereumWallet", JSON.stringify(wallets));
      return wallets;
    });
  }, []);

  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    setLoader(true);
    // let wallets: WalletData[] = [];
    // if (ethereumWallet.length === 0) {
    const wallets = JSON.parse(
      window.localStorage.getItem("ethereumWallet") || "[]",
    ) as WalletData[];
    // }

    // Get Balance
    wallets.forEach(async (wallet) => {
      const balanace = await connection.getBalance(wallet.publicAddress);

      wallet.balance = Number(balanace);
      wallet.unit = Number(WeiPerEther);
      window.localStorage.setItem("ethereumWallet", JSON.stringify(wallets));

      return wallet;
    });

    // Cannot get balance as airdroping ethereum require some wallet ammount
    setEthereumWallet(wallets);
    setLoader(false);
  }, []);

  return {
    ethereumWallet,
    generateEthereumWallet,
    deleteEthereumWallet,
    loader,
  };
}
