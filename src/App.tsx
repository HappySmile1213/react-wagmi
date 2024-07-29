import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config/config'
import { Account } from './components/account'
import { WalletOptions } from './components/wallet-options'
import SendForm from './components/send-form'

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <SendForm />
      </QueryClientProvider>
    </WagmiProvider>

  )
}

export default App
