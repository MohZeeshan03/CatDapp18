import './mint.scss'
import Heading from './components/heading/heading'
import MintDisplay from './components/mintDisplay/mintDisplay'
import Button from './components/button/button'
import { useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount } from 'wagmi'

function Mint(){
    const { open } = useWeb3Modal();
    const { address, isDisconnected } = useAccount()
   


    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
        document.title = 'BC'
    }, [])

    return (
        <div>
            <title>BC</title>
            <div className="parent">
                <Heading />
                {address && !isDisconnected ? 
                    <MintDisplay/>    
                : <div className="connectMetamaskbtnParent">
                    <Button  className='connectMetamaskBtn' width="100%" value='Connect My Metamask!' onClickHandler={() => open()} />
                    </div>
                }
            </div>
        </div>
    )
}

export default Mint