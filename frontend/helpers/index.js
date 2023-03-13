const { Contract } = require("ethers");
const {
  CRYPTODEVS_NFT_CONTRACT_ADDRESS,
  CRYPTODEVS_NFT_ABI,
} = require("../constants");

// Helper function to connect wallet
const connectWallet = async () => {
  try {
    await getProviderOrSigner();
    setWalletConnected(true);
  } catch (e) {
    console.error(e);
  }
};

// Helper function to fetch a Provider/Signer instance from Metamask
const getProviderOrSigner = async (needSigner = false) => {
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 5) {
    window.alert("Please switch to the Goerli network!");
    throw new Error("Please switch to the Goerli network");
  }

  if (needSigner) {
    const signer = web3Provider.getSigner();
    return signer;
  }
  return web3Provider;
};

const getCryptoDevsNFTContractInstance = (providerOrSigner) => {
  return new Contract(
    CRYPTODEVS_NFT_CONTRACT_ADDRESS,
    CRYPTODEVS_NFT_ABI,
    providerOrSigner
  );
};

module.exports = {
  connectWallet,
  getProviderOrSigner,
  getCryptoDevsNFTContractInstance,
};
