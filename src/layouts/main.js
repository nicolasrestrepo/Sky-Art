import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { useCallback, useEffect, useState } from 'react';
import { connector } from '../config/web3';
import { formatBalanceEth } from '../utils/format';
import useTruncatedAddress from '../hooks/useTruncatedAddress';
import NavBar from '../components/navBar/navBar';

function MainLayout({ children }) {
  const [ balance, setBalance ] = useState(0);

  const { active, activate, deactivate, account, error, library } = useWeb3React();

  const truncatedAddress = useTruncatedAddress(account);

  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', true);
  }, [activate]);

  const getBalance = useCallback(async () => {
    const responseBalance = await library.eth.getBalance(account)

    setBalance(formatBalanceEth(responseBalance))
  }, [library?.eth, account]);

  const disconnect = () => {
    deactivate(connector)
    localStorage.removeItem('previouslyConnected');
  }

  useEffect(() => {
    if(localStorage.getItem('previouslyConnected') === "true") connect();
  }, [connect]);

  useEffect(() => {
    if(active) getBalance()
  }, [active, getBalance]);

  console.log('isUnsupportedChain', isUnsupportedChain);

  return ( 
    <>

        <NavBar 
            address={truncatedAddress}
            isUnsupportedChain={isUnsupportedChain}
            balance={balance}
            connect={connect}
            disconnect={disconnect}
            active={active}
        />
        
        {children}
    </>
  );
}

export default MainLayout;
