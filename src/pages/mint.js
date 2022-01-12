import { useWeb3React } from "@web3-react/core";
import { toast } from 'react-toastify';
import { Grid, Button } from '@nextui-org/react';
import { useCallback, useEffect, useState } from "react";
import useMarketContract from '../hooks/useMarketContract'; 
import { useNFTsData } from '../hooks/useNFTsData';


export default function Mint(){
    const { active, account } = useWeb3React();
    const { nfts, loading } = useNFTsData()

    const [ imageSrc, setImageSrc ] = useState('');
    const [ isMinting, setIsMinting ] = useState(false);

    const marketNFT = useMarketContract();

    const getNFTData = useCallback(async () => {
        if(marketNFT){
            const resultTotalSupply = await marketNFT.methods.totalSupply().call();
            console.log('resultTotalSupply', resultTotalSupply);

            const resultMaxSupply = await marketNFT.methods.maxSupply().call();

            console.log('resultMaxSupply', resultMaxSupply);

            const dnaPreview = await marketNFT.methods.deterministicPseudoRandomDNA(
                resultTotalSupply,
                account
            ).call();
            
            const imagePreview = await marketNFT.methods.imageByDNA(dnaPreview).call();
            
            console.log('imagePreview', imagePreview);

            setImageSrc(imagePreview);
        }
    }, [marketNFT, account]);

    useEffect(() => {
     getNFTData();
    }, [getNFTData]);



    const mint = () => {
        setIsMinting(true);

        marketNFT.methods.mint().send({
            from: account
        }).on('transactionHash', (txHash) => {
            setIsMinting(false);
            toast.success('transaction sent');

        })
        .on('receipt', () => {
            setIsMinting(false);
            toast.success('Transaction Sucess');
        })
        .on('error', (error) => {
            setIsMinting(false);
            console.log('error --->', error);
    
            toast.error(error.message);
        })
    }
    console.log('loading', loading);
    console.log('nfts', nfts);

    return (
    <Grid xs={12} sm={5}>
        <Button onClick={mint}>mint</Button>
    </Grid>
    )
}