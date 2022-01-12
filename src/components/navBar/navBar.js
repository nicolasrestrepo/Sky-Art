import { Container } from './styles';
import { Button, Card } from '@nextui-org/react';

export default function NavBar({ 
        address, 
        isUnsupportedChain, 
        balance, 
        connect, 
        disconnect,
        active,
}){
    return(
        <Container>
            <h1>MarketNFT</h1>

        <>

            { active ?
                <>
                <Card color="gradient"  width="150px">
                    {address}
                </Card>
                {/* {balance} */}
                </>
                : 
                <Button 
                    disabled={isUnsupportedChain}
                    shadow 
                    color="gradient" 
                    auto
                    onClick={connect}>
                    {isUnsupportedChain ? "Unsupported chain" : "connect Wallet"}
                </Button>
            }
        </>
    </Container>
    )
}

