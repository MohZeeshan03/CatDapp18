export const trimAddress = (addr) => {
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

export const contract = {
  137: {
    MULTICALL_ADDRESS: "0xca11bde05977b3631167028862be2a173976ca11",
    NFT_ADDRESS: "0x1cb220625c16f0f0098e8499ff5e172c582ba909",
  },
  5: {
    MULTICALL_ADDRESS: "0xA78B1c073483655DC5eCf568CFef12Ab9b30338C",
    NFT_ADDRESS: "0x57a4ECCEf97faa59E79d5c3177F6ED1993fDAf00",
  },
};

export const DEFAULT_CHAIN = 5;
export const RPC =
  "https://goerli.infura.io/v3/63f4b8ee61284419b46c780d03befc4e";

export const formatDate = (unixTime) => {
  try {
    let dateString = new Date(unixTime).toString();
    let startIndex = dateString.indexOf("GMT");
    let modifyDate = dateString.substring(0, startIndex);
    return modifyDate;
  } catch (err) {
    console.log(err.message);
  }
};

export const formatPrice = (num) => {
  try {
    return new Intl.NumberFormat("ja-JP").format(parseFloat(num).toFixed(5));
  } catch (err) {
    console.log(err.message);
    return 0;
  }
};
