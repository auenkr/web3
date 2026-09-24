import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { type Cluster } from "@solana/web3.js"
import { useMemo } from "react"
import HomePage from "./component/AirDrop"
import '@solana/wallet-adapter-react-ui/styles.css'

function App() {
  const network: Cluster = "devnet"
  const endpoint = useMemo(() => {
    // const url = clusterApiUrl(network)
    const url = "https://devnet.helius-rpc.com/?api-key=a2b0e6b5-4918-42d4-a9c9-848c7ac3b2f7"
    return url
  }, [network])
  // empty array -> default all wallets it was able to find
  const wallets = useMemo(() => [], [])
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <section className="faucet">
            <div>
              <div>Connect Wallet</div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: '20px',
                }}>
                <span><WalletMultiButton /></span>
                <span><WalletDisconnectButton /></span>
              </div>
            </div>
            <HomePage />
          </section>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
