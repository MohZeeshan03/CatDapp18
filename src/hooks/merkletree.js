import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { WhitelistedAddress } from "./whitelist.js";

export const getMerkleteByte = (useraddrses) => {
  try {
    const leafNodes = WhitelistedAddress.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });

    const rootHash = merkleTree.getRoot();

    // console.log("Whitelist Merkle Tree \n", merkleTree.toString());
    // console.log("Root Hash: ", rootHash);

    // const claimingAddress = leafNodes[0];    //msg.sender
    const claimingAddress = keccak256(useraddrses);

    const hexProof = merkleTree.getHexProof(claimingAddress); //proof of address
    // console.log(rootHash.toString('hex'));
    var conversion = "0x" + rootHash.toString("hex");

    console.log(hexProof);
    console.log("Root in Hex Format :", conversion);
    console.log(merkleTree.verify(hexProof, claimingAddress, rootHash));

    if (hexProof) {
      return hexProof;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
