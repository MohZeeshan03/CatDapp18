import { useEffect, useState } from "react"
import { useAccount } from 'wagmi';
import { getNftContract, multiCallContractConnect } from "../hooks/contractHelper";
import { toast } from "react-toastify";


export const useCommonStats = (updater) => {
   
    const [stats, setStats] = useState({
        pCost: 0,
        publicMintEnabled: false,
        wCost: 0,
        whitelistMintEnabled: false

    });


    let nftContract = getNftContract();
   

    useEffect(() => {
        const fetch = async () => {

            try {
                const data = await Promise.all(
                    [
                        await nftContract.methods.pCost().call(), //0
                        await nftContract.methods.publicMintEnabled().call(), //1
                        await nftContract.methods.wCost().call(), //2
                        await nftContract.methods.whitelistMintEnabled().call(), //3
                    ]
                );

                
              




                setStats({
                    pCost: data[0] / Math.pow(10,18),
                    publicMintEnabled: data[1],
                    wCost: data[2] / Math.pow(10,18),
                    whitelistMintEnabled: data[3]
                })


            }
            catch (err) {
                console.log(err.message);
                toast.error(err.reason)

            }
        }

        if (nftContract) {
            fetch();
        }
        else {
            setStats({
                pCost: 0,
                publicMintEnabled: false,
                wCost: '',
                whitelistMintEnabled: false
            })
        }

        // eslint-disable-next-line
    }, [updater]);

    return stats;
}

export const useAccStats = (updater) => {
    const { address } = useAccount()


    const [stats, setStats] = useState({
        userBal: 0
    });


    let mc = multiCallContractConnect();

    useEffect(() => {
        const fetch = async () => {

            try {
                const data = await Promise.all(
                    [
                        await mc.methods.getEthBalance(address).call() //0
                    ]
                );




                setStats({
                    userBal: data[0].toString() / Math.pow(10,18),
                })


            }
            catch (err) {
                console.log(err.message);
                toast.error(err.reason)

            }
        }

        if (mc) {
            fetch();
        }
        else {
            setStats({
                userBal: 0,
            })
        }

        // eslint-disable-next-line
    }, [updater, address]);

    return stats;
}















