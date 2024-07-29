import { bscTestnet } from 'viem/chains'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { useBalance } from 'wagmi'
import { SMTK_ADDRESS } from '../config/constants'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    const balance = useBalance({
        address: address,
        token: SMTK_ADDRESS,
        chainId: bscTestnet.id
    })

    return (
        <div className='text-3xl'>
            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
            <button onClick={() => disconnect()}>Disconnect</button>

            <div>
                Wallet account: {address && <>{ensName ? `${ensName} (${address})` : address}</>}
                <p>Balance: {!balance ? 'Waiting' : balance.data?.value.toString()}  </p>
            </div>

        </div>
    )
}