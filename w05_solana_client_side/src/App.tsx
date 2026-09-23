import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletDisconnectButton, WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl, type Cluster } from "@solana/web3.js"
import { useMemo } from "react"
import HomePage from "./component/AirDrop"
import '@solana/wallet-adapter-react-ui/styles.css'

function App() {
  const network: Cluster = "devnet"
  const endpoint = useMemo(() => {
    const url = clusterApiUrl(network)
    // const url = "https://solana-devnet.g.alchemy.com/v2/alch_BbaFedRbXFkz7jzDl6c6R"
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
