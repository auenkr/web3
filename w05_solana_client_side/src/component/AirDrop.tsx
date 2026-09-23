import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { useSolana } from "../hook/useSolana";
import { useRef } from "react";
import { fromUint8Array } from "js-base64";

export default function HomePage() {
  // using hooks from library
  const amountRef = useRef<HTMLInputElement>(null)
  const { wallet, balance, sendAirDrop, sendSolana, signMessage, SignatureMessage, Signature, VerifySignature } = useSolana();

  const publicKeyRef = useRef<HTMLInputElement>(null)
  const amountToSendRef = useRef<HTMLInputElement>(null)

  const messageRef = useRef<HTMLInputElement>(null)

  const signatureMessage = useRef<HTMLInputElement>(null)
  const signatureRef = useRef<HTMLInputElement>(null)
  return (
    <section
      id="airdrop"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px',
      }}>
      {
        wallet.connected &&
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>PublicKey: {wallet.publicKey?.toBase58().toString()}</span>
              <span>Balance: {balance / LAMPORTS_PER_SOL}</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: "10px",
              }}
            >
              <label>Amount</label>
              <input ref={amountRef} type="number" defaultValue={0} />
              <button
                onClick={() => {
                  if (!amountRef.current || !amountRef.current.value || amountRef.current.value === "0") {
                    alert(`Please enter a valid amount ${amountRef.current?.value}`)
                    return
                  }
                  const amount = parseFloat(amountRef.current.value) * LAMPORTS_PER_SOL
                  sendAirDrop(amount)
                  return
                }}
              >Request Airdrop</button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              gap: "10px",
              border: "1px solid var(--border)",
            }}
          >
            <div>Send Solana</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label>Public Address</label>
                <input ref={publicKeyRef} type="text" placeholder="Public Address of reciever" />
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label>Amount</label>
                <input ref={amountToSendRef} type="number" defaultValue={0} />
              </span>
              <button onClick={() => {
                if (!amountToSendRef.current || !amountToSendRef.current.value || amountToSendRef.current.value === "0") {
                  alert(`Please enter a valid amount ${amountToSendRef.current?.value}`)
                  return
                }
                if (!publicKeyRef.current || !publicKeyRef.current.value) {
                  alert(`Please enter a valid public key ${publicKeyRef.current?.value}`)
                  return
                }
                const amount = parseFloat(amountToSendRef.current.value) * LAMPORTS_PER_SOL
                const publicKey = publicKeyRef.current.value
                sendSolana(publicKey, amount)
              }}>Send</button>
            </div>
          </div>
          <div
            style={{
              gap: "20px",
            }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid var(--border)",
              }}
            >
              <div>Sign Message</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <label >Message to sign</label>
                <input ref={messageRef} type="text" placeholder="Message to sign" />
                <button onClick={() => {
                  if (!messageRef.current || !messageRef.current.value) {
                    alert(`Please enter a valid message ${messageRef.current?.value}`)
                    return
                  }
                  signMessage(messageRef.current.value)
                }}>Sign</button>
              </div>
              {Signature &&
                <div>
                  {fromUint8Array(Signature)}
                </div>
              }
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                gap: "10px",
                border: "1px solid var(--border)",
              }}
            >
              <div>Verify Signature</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Signature Message</label>
                  <input ref={signatureMessage} type="text" placeholder="Signature Message" defaultValue={SignatureMessage} />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px",
                    gap: "10px",
                  }}
                >
                  <label>Signature</label>
                  <input ref={signatureRef} type="text" placeholder="Signature" defaultValue={fromUint8Array(Signature)} />
                </div>
                <button
                  onClick={() => {
                    if (!signatureMessage.current || !signatureMessage.current.value) {
                      alert("Invalid signature message")
                      return
                    }
                    if (!signatureRef.current || !signatureRef.current.value) {
                      alert("Invalid signature")
                      return
                    }
                    console.log("Signature", signatureRef.current.value)
                    if (VerifySignature(signatureMessage.current.value, signatureRef.current.value)) {
                      alert(`Signature is valid`)
                    } else {
                      alert(`Signature is invalid`)
                    }
                  }}
                >Verify Signature</button>
              </div>
            </div>
          </div>
        </div>
      }
    </section >
  )
}
