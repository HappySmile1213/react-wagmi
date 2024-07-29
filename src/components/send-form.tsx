import * as React from 'react'
import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { useWriteContract } from 'wagmi';
import tokenABI from './sm_abi.json';
import { SMTK_ADDRESS } from '../config/constants';
import { bscTestnet } from 'viem/chains';

const SendForm: React.FC = () => {

    const [to, setTo] = useState<string>("");
    const [amount, setAmount] = React.useState(0);

    const balance = useReadContract({
        address: SMTK_ADDRESS,
        chainId: bscTestnet.id,
        abi: tokenABI,
        functionName: 'balanceOf',
        args: ['0x08b3A4Fa26CaD04f82c315a0a12CA04ECB49370B'],
    })

    const {
        data: hash,
        isPending,
        writeContract
    } = useWriteContract()

    async function handleSend() {
        // validataion
        if (!to) {
            alert("Address is invalid");
            return;
        }
        if (amount <= 0) {
            alert("Amount is invalid");
            return;
        }

        writeContract({
            address: SMTK_ADDRESS,
            chainId: bscTestnet.id,
            abi: tokenABI,
            functionName: 'transfer',
            args: [to, BigInt(amount)],
        })

    }
    return (
        <div className='text-4xl mt-12 py-2'>
            <div> Balance: {balance.isLoading ? "Loading..." : balance.data?.toString()}</div>
            <div className='py-4'>
                To:
                <input type='text'
                    onChange={(e) => {
                        setTo(e.target.value)
                    }}
                    value={to}
                ></input>
            </div>
            <div className='py-4'>
                Amount:
                <input type='number'
                    onChange={(e) => {
                        setAmount(Number(e.target.value))
                    }}
                    value={amount}
                ></input>
            </div>

            <div className='mt-1 py-10'>
                <button onClick={handleSend}> Send</button>
            </div>
            <div className='py-10'>
                {isPending ? "Pending" : ""}
            </div>
        </div>

    );
};

export default SendForm;