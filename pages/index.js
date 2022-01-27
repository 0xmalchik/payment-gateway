import React from 'react';
import { ethers } from 'ethers';
import Content from '../Components/Content/Content';
import Header from '../Components/Header/Header';
import { ThemeProvider } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import theme from '../styles/theme';
import { useState, useEffect } from 'react';

import usdtImg from '../public/usdc.png';
import wbtcImg from '../public/wbtc.png';
import ethImg from '../public/eth.png';
import ERC20abi from '../public/abi/ERC20.json';
import Background from '../Components/Background/Background';
import NotConnected from '../Components/NotConnected/NotConnected';

const axios = require('axios').default;
const treasuryAddress = '0x4F0be2B25d159CCB3173316A31c8680B8147cBb1';

export default function Index() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [chainId, setChainId] = useState('0x0');
  const [marketPrice, setMarketPrice] = useState(0);
  const [currentBalance, setBalance] = useState(0);
  const [currentTreasuryBalance, setTreasuryBalance] = useState(0);
  const [tokensBalances, setTokenBalances] = useState([]);
  //set up in container
  const [amountToPay, setAmountToPay] = useState(0);
  const [cryptoPayment, setCryptoPayment] = useState('$ETH');

  const whitelistedPaymentAddresses = [
    {
      token: '$ETH',
      ContractAddress: null,
      img: ethImg,
    },
    {
      token: '$WBTC',
      ContractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      img: wbtcImg,
      abi: ERC20abi,
    },
    {
      token: '$USDC',
      ContractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      img: usdtImg,
      abi: ERC20abi,
    },
  ];

  const whitelistedBalances = async () => {
    let arr = [];
    let token;

    whitelistedPaymentAddresses.map(e => {
      token = e.token;

      let promise = getTokenBalance(token);
      arr.push(promise);
      // console.log(promise)
    });
    //console.log(arr)
    await Promise.all(arr).then(res => {
      // console.log('resolve', res)
      setTokenBalances(res);
      //console.log('res', res)

      return res;
    });
  };

  const getTokenBalance = async token => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('get a life');

      return;
    } else if (token === '$ETH') {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
        );
        const balance = await provider.getBalance(
          `${currentAccount.toString()}`,
          'latest'
        );
        const tokenBalance = Number(ethers.utils.formatEther(balance));

        let tkn = token;
        const getToken = whitelistedPaymentAddresses.find(
          el => el.token === tkn
        );
        setBalance(tokenBalance);
        const img = getToken.img.src;

        return { tkn, tokenBalance, img };
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const getSelectedTokenAttributes = whitelistedPaymentAddresses.find(
          el => el.token === token
        );
        //console.log("getSelectedTokenAttributes",getSelectedTokenAttributes)

        const { ContractAddress } = getSelectedTokenAttributes;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const connectedContract = new ethers.Contract(
          ContractAddress,
          ERC20abi,
          signer
        );

        let txn = await connectedContract.balanceOf(currentAccount);

        let tknBalance = ethers.utils.formatEther(txn._hex);

        const tkn = getSelectedTokenAttributes.token;
        const img = getSelectedTokenAttributes.img.src;
        return { tkn, tknBalance, img };
      } catch (e) {
        console.log(e);
      }
    }
  };

  const getEthMarketPrice = async () => {
    const fetchEth = await axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
      )
      .then(function (response) {
        // handle success
        const price = response.data.ethereum.usd;
        console.log(price.toFixed(0));

        setMarketPrice(response.data.ethereum.usd);
      });
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      let _chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain ' + _chainId);
      // let balance = await ethereum.request({ method: "eth_balance" });
      // console.log(balance)
      // String, hex code of the chainId
      const mainnet = '0x1';

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      } else if (_chainId !== mainnet) {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }], // chainId must be in hexadecimal numbers
        });
        return;
      } else {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        console.log('Connected', accounts[0]);
        setCurrentAccount(ethers.utils.getAddress(accounts[0]));
        setChainId(_chainId);
        localStorage.setItem(
          'web3Address',
          ethers.utils.getAddress(accounts[0])
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    setCurrentAccount(null);
    window.localStorage.removeItem('web3Address');
  };

  const getTreasuryBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
    );
    const balance = await provider.getBalance(treasuryAddress, 'latest');
    const treasury = Number(ethers.utils.formatEther(balance));
    console.log(treasury);
    setTreasuryBalance(treasury);
  };

  const doTx = async (e, currentAccount, amountToPay, cryptoPayment) => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('no ethereum found');
      return;
    } else if (cryptoPayment === '$ETH') {
      try {
        console.log('is eth');
        e.preventDefault();
        console.log(
          'eventEther',
          e,
          currentAccount,
          amountToPay,
          cryptoPayment
        );
        const transactionParameters = {
          nonce: '0x00', // ignored by MetaMask
          // gasPrice: ethers.utils.hexValue(21000000), // customizable by user during MetaMask confirmation.
          // gas: ethers.utils.hexValue(21000000), // customizable by user during MetaMask confirmation.
          to: treasuryAddress, // Required except during contract publications.
          from: currentAccount, // must match user's active address.
          value: ethers.utils.parseEther(amountToPay)._hex, // Only required to send ether to the recipient from the initiating external account.
          // data:
          //   '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // Optional, but used for defining smart contract creation and interaction.
          chainId, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });
        //console.log(txHash)
        return;
      } catch (e) {
        console.log(e);
      }
    } else if (cryptoPayment !== '$ETH') {
      try {
        e.preventDefault();
        console.log('isnot eth', currentAccount, amountToPay, cryptoPayment);
        let getSelectedTokenAttributes = whitelistedPaymentAddresses.find(
          ev => ev.token === cryptoPayment
        );

        const { ContractAddress, abi } = getSelectedTokenAttributes;

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          ContractAddress,
          abi,
          signer
        );

        const decimals = await connectedContract.decimals();
        let txn = await connectedContract.transfer(
          treasuryAddress,
          amountToPay * Math.pow(10, decimals),
          {
            gasPrice: 1000,
            gasLimit: 4300000000000,
          }
        );

        return;
      } catch (e) {
        console.log(e);
      }
    }
  };

  function renderContent() {
    return !currentAccount ? (
      <>
        {' '}
        <Background /> <NotConnected />{' '}
      </>
    ) : (
      <Content
        currentAccount={currentAccount}
        marketPrice={marketPrice}
        currentBalance={currentBalance}
        tokensBalances={tokensBalances}
        currentTreasuryBalance={currentTreasuryBalance}
        getTreasuryBalance={getTreasuryBalance}
        whitelistedBalances={whitelistedBalances}
        getEthMarketPrice={getEthMarketPrice}
        connectWallet={connectWallet}
        doTx={doTx}
        setCurrentAccount={setCurrentAccount}
        cryptoPayment={cryptoPayment}
        setCryptoPayment={setCryptoPayment}
      />
    );
  }
  useEffect(() => {
    const prevAddr = window.localStorage.getItem('web3Address');
  
    if (currentAccount) {
      whitelistedBalances();
      getEthMarketPrice();
      getTreasuryBalance();
      console.log('currentAccount', currentAccount);
      return;
    } else if (prevAddr) {
      setCurrentAccount(prevAddr);
    } else {
      return;
    }
  }, [currentAccount, cryptoPayment]);

  return (
    <ThemeProvider theme={theme}>
      <Typography>
        <Header
          connectWallet={connectWallet}
          currentAccount={currentAccount}
          disconnectWallet={disconnectWallet}
        />
        {renderContent()}
      </Typography>
    </ThemeProvider>
  );
}
