import { useWeb3React } from "@web3-react/core";
import { Grid, Loading } from "@nextui-org/react";
import { useNFTsData } from "../hooks/useNFTsData";
import CardNFT from "../components/cardNFT";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { active, account } = useWeb3React();
  const { nfts, loading } = useNFTsData({owner: account});
  let navigate = useNavigate();

  function handleClick(tokenId) {
    navigate(`/assets/${tokenId}`);
  }

  if (!active) return <h1>please connect your Wallet</h1>;

  if (loading) return <Loading />;

  console.log("nfts", nfts);

  return (
    <Grid.Container gap={2} justify="center">
        {nfts?.map((nft, index) => (
            <Grid xs={6} sm={3} key={index}>
                <CardNFT 
                  hoverable 
                  clickable 
                  {...nft} 
                  onClick={() => handleClick(nft?.tokenId)}
                  />
            </Grid>
        ))}
    </Grid.Container>
  );
}
