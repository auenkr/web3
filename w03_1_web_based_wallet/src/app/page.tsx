"use client";

import { useSolana } from "@/hooks/useSolana";
import { useEthereum } from "@/hooks/useEthereum";
import { useMnemonics } from "@/hooks/useMnemonics";
import { useRef } from "react";

export default function Home() {
  // Creating Mnemonics
  const { mnemonic, createMnemonics, deleteMnemonics } = useMnemonics();

  const { solanaWallet, generateSolanaWallet, deleteSolanaWallet } =
    useSolana(mnemonic);

  const { ethereumWallet, generateEthereumWallet, deleteEthereumWallet } =
    useEthereum(mnemonic);

  const mnemonicsInputRef = useRef<HTMLInputElement | undefined>(undefined);

  return (
    <main className="bg-zinc-50 font-sans dark:bg-black">
      {mnemonic.length === 0 ? (
        <section
          id="menonics"
          className="flex flex-col justify-center items-center gap-2"
        >
          <h2 className="text-2xl">Mnemonics Phase</h2>
          <div>
            <input
              ref={mnemonicsInputRef}
              id="mnemonics"
              placeholder="leave empty if want to generate new one"
              type="text"
              className="w-150 h-10"
            />
          </div>
          <button
            onClick={() => {
              const input = mnemonicsInputRef.current?.value;
              if (!input || input === "") {
                createMnemonics();
                return;
              }
              const length = input.split(" ").length;
              if (length !== 12 && length !== 24) {
                alert("Mnemonics must be 12 or 24 words");
                return;
              }
              createMnemonics(input);
            }}
            className="m-2 border-2 rounded-md"
          >
            Create Menonics
          </button>
        </section>
      ) : (
        <>
          <div className="p-4 flex flex-col justify-between items-center gap-2">
            <h1 className="text-3xl"> Web Based Wallet </h1>
            <div>
              <div className="flex justify-between">
                <h2 className="text-2xl">Mnemonics Phase</h2>
                <button
                  onClick={deleteMnemonics}
                  className="p-2 py-1 border-2 rounded-md border-red-800 bg-red-700 active:bg-red-800"
                >
                  Delete
                </button>
              </div>
              <p className="font-bold text-xl">{mnemonic}</p>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between items-left gap-2">
            <section id="Solana Wallet">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Keys Pair for Solana</h2>
                <button
                  onClick={generateSolanaWallet}
                  className="p-2 border-2 rounded-lg border-green-800 bg-green-600 bg-green-600"
                >
                  Create Solana wallet
                </button>
              </div>
              <div>
                <ol className="list-disc">
                  {solanaWallet.map((walletData) => {
                    const balance =
                      Number(walletData.balance) / Number(walletData.unit);
                    return (
                      <li
                        key={walletData.privateAddress}
                        className="p-2 m-2 flex justify-between items-center"
                      >
                        <div>
                          <div>
                            <span className="font-bold">Private Key:</span>
                            <span>{walletData.privateAddress}</span>
                          </div>
                          <div>
                            <span className="font-bold">Public Key:</span>
                            <span>{walletData.publicAddress}</span>
                          </div>
                          <div>
                            <span className="font-bold">Balance:</span>
                            <span>{balance}</span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            deleteSolanaWallet(walletData.privateAddress)
                          }
                          className="p-2 rounded-lg bg-red-700 active:bg-red-800"
                        >
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>{" "}
            <section id="Ethereum Wallet">
              <div className="flex justify-between">
                <h2 className="text-xl font-bold">Keys Pair for Ethereum</h2>
                <button
                  onClick={generateEthereumWallet}
                  className="p-2 border-2 rounded-lg border-green-800 bg-green-600 bg-green-600"
                >
                  Create Ethereum wallet
                </button>
              </div>
              <div>
                <ol className="list-disc">
                  {ethereumWallet.map((walletData, index) => {
                    const balance =
                      Number(walletData.balance) / Number(walletData.unit);
                    return (
                      <li
                        key={walletData.privateAddress}
                        className="p-2 m-2 flex justify-between items-center"
                      >
                        <div>
                          <div>
                            <span className="font-bold">Private Key:</span>
                            <span>{walletData.privateAddress}</span>
                          </div>
                          <div>
                            <span className="font-bold">Public Key:</span>
                            <span>{walletData.publicAddress}</span>
                          </div>
                          <div>
                            <span className="font-bold">Balance:</span>
                            <span>{balance}</span>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            deleteEthereumWallet(walletData.privateAddress)
                          }
                          className="p-2 rounded-lg bg-red-700 active:bg-red-800"
                        >
                          Delete
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
            <section id="private public keys"></section>
          </div>
        </>
      )}
    </main>
  );
}
