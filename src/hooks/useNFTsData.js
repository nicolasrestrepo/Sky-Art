import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import useMarketContract from "./useMarketContract";

const getDataByNft = async ({ marketNFTContract, tokenId }) => {
  console.log("marketNFTContract", marketNFTContract);

  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    marketNFTContract.methods.tokenURI(tokenId).call(),
    marketNFTContract.methods.tokenDNA(tokenId).call(),
    marketNFTContract.methods.ownerOf(tokenId).call(),
    marketNFTContract.methods.getAccessoriesType(tokenId).call(),
    marketNFTContract.methods.getAccessoriesType(tokenId).call(),
    marketNFTContract.methods.getClotheColor(tokenId).call(),
    marketNFTContract.methods.getClotheType(tokenId).call(),
    marketNFTContract.methods.getEyeType(tokenId).call(),
    marketNFTContract.methods.getEyeBrowType(tokenId).call(),
    marketNFTContract.methods.getFacialHairColor(tokenId).call(),
    marketNFTContract.methods.getFacialHairType(tokenId).call(),
    marketNFTContract.methods.getHairColor(tokenId).call(),
    marketNFTContract.methods.getHatColor(tokenId).call(),
    marketNFTContract.methods.getGraphicType(tokenId).call(),
    marketNFTContract.methods.getMouthType(tokenId).call(),
    marketNFTContract.methods.getSkinColor(tokenId).call(),
    marketNFTContract.methods.getTopType(tokenId).call(),
  ]);

  const responseMetaData = await fetch(tokenURI);
  const metaData = await responseMetaData.json();

  return {
    tokenId,
    tokenURI,
    dna,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    owner,
    ...metaData,
  };
};

export const useNFTsData = ({ owner = null } = {}) => {
  console.log("owner", owner);

  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { library } = useWeb3React();
  const marketNFTContract = useMarketContract();

  const update = useCallback(async () => {
    if (marketNFTContract) {
      setLoading(true);

      // for the standart RC721 we need to get each nft individualy
      let tokenIds;

      if (!library.utils.isAddress(owner)) {
        const totalSupply = await marketNFTContract.methods.totalSupply().call();
        tokenIds = new Array(Number(totalSupply))
          .fill()
          .map((_, index) => index);
      } else {
        const balanceOf = await marketNFTContract.methods.balanceOf(owner).call();

        const tokenIdsOfOwner = new Array(Number(balanceOf))
          .fill()
          .map((_, index) =>
            marketNFTContract.methods.tokenOfOwnerByIndex(owner, index).call()
          );

        tokenIds = await Promise.all(tokenIdsOfOwner);
      }

      const nftsPromise = tokenIds.map((tokenId) =>
        getDataByNft({ marketNFTContract, tokenId })
      );

      const nftsResult = await Promise.all(nftsPromise);

      setNfts(nftsResult);
      setLoading(false);
    }
  }, [marketNFTContract, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    update,
    loading,
    nfts,
  };
};

export const useNFTDetail = (tokenId = null) => {
  const [nft, setNft] = useState({});
  const [loading, setLoading] = useState(true);

  const marketNFTContract = useMarketContract();

  const update = useCallback(async () => {
    if (marketNFTContract && tokenId !== null) {
      setLoading(true);

      const responseNft = await getDataByNft({ marketNFTContract, tokenId });

      setNft(responseNft);

      setLoading(false);
    }
  }, [marketNFTContract, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    nft,
    update,
  };
};
