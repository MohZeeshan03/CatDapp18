import "./mintDisplay.scss";
import Button from "../button/button";
import mintApe0 from "../../../../assets/1.png";
import mintApe1 from "../../../../assets/2.png";
import mintApe2 from "../../../../assets/3.png";
import mintApe3 from "../../../../assets/4.png";
import mintApe4 from "../../../../assets/5.png";
import mintApe5 from "../../../../assets/6.png";
import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { useCommonStats, useAccStats } from "../../../../stats/useStats";
import {
  DEFAULT_CHAIN,
  contract,
  formatPrice,
} from "../../../../hooks/constant";
import { getWeb3 } from "../../../../hooks/connectors";
import { toast } from "react-toastify";
import { getContract } from "../../../../hooks/contractHelper";
import gameAbi from "../../../../json/game.json";
import { ethers } from "ethers";
import { getMerkleteByte } from "../../../../hooks/merkletree";
import { Web3Button } from "@web3modal/react";

function MintDisplay() {
  const { address, isDisconnected } = useAccount();
  const [mintQuantity, setMintQuantity] = useState(0);
  const mintLimit = 5;
  const [updater, setUpdater] = useState(false);
  const stats = useCommonStats(updater);
  const accStats = useAccStats(updater);
  const mintCost = stats.whitelistMintEnabled
    ? parseFloat(stats.wCost)
    : parseFloat(stats.pCost);
  const [loading, setLoading] = useState(false);
  const { data: signer } = useSigner();
  const [costTracker, setCostTracker] = useState(0);

  const mintApes = [mintApe0, mintApe1, mintApe2, mintApe3, mintApe4, mintApe5];
  const [mintApeIndex, setMintApeIndex] = useState(0);

  const mintTokens = async (id) => {
    setLoading(true);
    if (address && !isDisconnected) {
      try {
        let NftContract = getContract(
          gameAbi,
          contract[DEFAULT_CHAIN].NFT_ADDRESS,
          signer
        );
        let tx;
        if (id === 1) {
          let bytecode = getMerkleteByte(address);
          if (bytecode) {
            tx = await NftContract.whitelistMint(bytecode, mintQuantity, {
              from: address,
              value: ethers.utils.parseEther(costTracker.toString()),
            });
          } else {
            toast.error("Your address is not whitelisted.");
            return false;
          }
        } else {
          tx = await NftContract.publicMint(mintQuantity, {
            from: address,
            value: ethers.utils.parseEther(costTracker.toString()),
          });
        }

        toast.loading("Waiting for confirmation..");

        var interval = setInterval(async function () {
          let web3 = getWeb3();
          var response = await web3.eth.getTransactionReceipt(tx.hash);
          if (response != null) {
            clearInterval(interval);
            if (response.status === true) {
              toast.dismiss();
              toast.success("success ! your last transaction is success");
              setUpdater(Math.random());
              setLoading(false);
            } else if (response.status === false) {
              toast.dismiss();
              toast.error("error ! Your last transaction is failed.");
              setUpdater(Math.random());
              setLoading(false);
            } else {
              toast.dismiss();
              toast.error("error ! something went wrong.");
              setUpdater(Math.random());
              setLoading(false);
            }
          }
        }, 5000);
      } catch (err) {
        toast.dismiss();
        toast.error(err.reason ? err.reason : err.message);
        setLoading(false);
      }
    } else {
      toast.dismiss();
      toast.error("please connect wallet!!");
      setLoading(false);
    }
  };

  function handleMintQuantityChange(isIncrementing) {
    if (isIncrementing) {
      setMintQuantity(mintQuantity + 1);
      setCostTracker(costTracker + mintCost);
      setMintApeIndex(mintApeIndex + 1);
    } else if (!isIncrementing) {
      setMintQuantity(mintQuantity - 1);
      setCostTracker(costTracker - mintCost);
      setMintApeIndex(mintApeIndex - 1);
    }
  }

  return (
    <div>
      <div className="mintDisplay">
        <Web3Button />
        <p></p>
        <p>Wallet Address: {address}</p>
        <h4 className="p-3">
          {stats.whitelistMintEnabled
            ? "Whitelist Mint"
            : stats.publicMintEnabled
            ? "Public Mint"
            : "Sale Not Started"}
        </h4>
        <div className="mintDisplay-container">
          <div className="mintDisplay-LHS">
            <img
              className="hero-jeffrey"
              src={mintApes[mintApeIndex]}
              loading="lazy"
              alt="Jeffrey :D"
            />
            <p className="disclaimer-txt">
              ❊ Apes above are for{" "}
              <span className="highlight">display only</span> ❊ <br />
              &#40;Apes will be randomly minted&#41;
            </p>
          </div>
          <div className="mintDisplay-RHS">
            <p>
              Wallet Balance: {accStats ? formatPrice(accStats.userBal) : 0} ETH
            </p>
            <div className="p-0 line"></div>
            <p>Total Mint Cost: {costTracker.toFixed(2)} ETH</p>
            <div className="mintQuantify">
              <Button
                width="75px"
                value="-"
                disabledCondition={mintQuantity === 0}
                onClickHandler={() => handleMintQuantityChange(false)}
              />
              <p className="mintCount">{mintQuantity}</p>
              <Button
                width="75px"
                value="+"
                disabledCondition={mintQuantity === mintLimit}
                onClickHandler={() => handleMintQuantityChange(true)}
              />
            </div>
            {stats.whitelistMintEnabled ? (
              <Button
                width="200px"
                value="Mint Now!"
                onClickHandler={() => mintTokens(1)}
              />
            ) : stats.publicMintEnabled ? (
              <Button
                width="200px"
                disabledCondition={loading ? true : false}
                value={loading ? `Loading...` : "Mint Now!"}
                onClickHandler={() => mintTokens(2)}
              />
            ) : (
              <Button width="200px" value="Sale Not Start" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MintDisplay;
