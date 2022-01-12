import { useState } from 'react'
import { useWeb3React } from "@web3-react/core";
import { useParams } from "react-router-dom";
import { useNFTDetail } from "../hooks/useNFTsData";
import { Card, Grid, Text, Button } from "@nextui-org/react";

export default function NFTDetail() {
  const { active, account } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, nft } = useNFTDetail(tokenId);

  if (!active) return <h2>Please Connect the wallet</h2>;

  if (loading) return <h2>Loading ....</h2>;

  console.log("nft", nft);

  const tranfer = () => {
    console.log('transfer');
  }

  return (
    <>
      { account === nft?.owner && <Button size="large" onClick={tranfer}>
          Transfer</Button>
      }
      <Grid.Container gap={2}>
        {Object.keys(nft?.attributes).map((attribute) => (
          <Grid xs={12} md={4}>
            <Card color="green" textColor="white">
              <Text h5 transform="capitalize">
                {attribute} : {nft?.attributes[attribute]}
              </Text>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
}
