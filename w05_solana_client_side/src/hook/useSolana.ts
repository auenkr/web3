import { ed25519 } from "@noble/curves/ed25519.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import { toUint8Array } from "js-base64"
import { useCallback, useEffect, useState } from "react"

export function useSolana() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number>(0)

  const sendAirDrop = useCallback((amountInLamport: number) => {
    async function sendSol() {
      if (!wallet.publicKey) {
        console.log("No public key")
        return
      }
      const amount = amountInLamport
      const data = await connection.requestAirdrop(wallet.publicKey, amount)
      alert(`success airdrop request, amount:  ${amount},\nsignature, ${data}`)
      setBalance((prev) => prev + amount)
    }
    sendSol()
  }, [connection, wallet.publicKey])

  const sendSolana = useCallback((publicKey: string, amountInLamport: number) => {
    console.log('sendSolana')
    console.log(publicKey, amountInLamport)
    async function sendSol() {
      if (!wallet.publicKey) {
        console.log("No public key")
        return
      }
      // const lamports = await connection.getMinimumBalanceForRentExemption(0);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(publicKey),
          // lamports: lamports,
          lamports: amountInLamport,
        })
      )
      console.log("Transaction", transaction)

      const latestBlockHashData = await connection.getLatestBlockhashAndContext();
      console.log("latest block hash and context", latestBlockHashData)

      const signature = await wallet.sendTransaction(
        transaction,
        connection,
        {
          minContextSlot: latestBlockHashData.context.slot,
        }
      )

      console.log("Signature", signature)

      const status = await connection.getSignatureStatuses([signature]);
      console.log("Sign status", status)

      // This pool failed with Alchemy rpc url because it does not support web sockets
      const result = await connection.confirmTransaction({
        blockhash: latestBlockHashData.value.blockhash,
        lastValidBlockHeight: latestBlockHashData.value.lastValidBlockHeight,
        signature: signature,
      });
      alert(`success airdrop request, amount:  ${amountInLamport / LAMPORTS_PER_SOL}`)
      console.log("Result", result)
    }
    sendSol()
  }, [connection, wallet.publicKey, wallet.sendTransaction])

  useEffect(() => {
    async function getBalance() {
      if (!wallet.publicKey) {
        return
      }
      const balance = await connection.getBalance(wallet.publicKey)
      setBalance(balance)
    }
    getBalance()
  }, [connection, wallet.publicKey])

  const [SignatureMessage, setSignatureMessage] = useState<string>("")
  const [Signature, setSignature] = useState<Uint8Array<ArrayBufferLike>>(new Uint8Array())

  const signMessage = useCallback((message: string) => {
    async function sign() {
      if (!wallet.publicKey || !wallet.signMessage) {
        return
      }
      const messageData = new TextEncoder().encode(message)
      const signature = await wallet.signMessage(messageData)
      setSignatureMessage(message)
      setSignature(signature)
    }
    sign()
  }, [connection, wallet.publicKey])

  const VerifySignature = useCallback((message: string, signature: string) => {
    if (!wallet.publicKey || !wallet.signMessage) {
      return
    }
    const messageData = new TextEncoder().encode(message)
    const signatureData = toUint8Array(signature)
    const result = ed25519.verify(signatureData, messageData, wallet.publicKey.toBytes())
    return result
  }, [connection, wallet.publicKey, Signature, SignatureMessage])

  return {
    wallet,
    sendAirDrop,
    balance,
    sendSolana,
    signMessage,
    SignatureMessage,
    Signature,
    VerifySignature
  }
}
