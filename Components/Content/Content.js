import { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/styles';
import Background from '../Background/Background';
import { Grid } from '@material-ui/core';
import Balance from './Balance';
import PaymentForm from './PaymentForm';

const useStyles = makeStyles(() => ({
  container: {
    gridGap: '30px',
    justifyContent: 'center',
  },
}));

export default function Content({
  currentAccount,
  marketPrice,
  currentBalance,
  tokensBalances,
  currentTreasuryBalance,
  getTreasuryBalance,
  whitelistedBalances,
  getEthMarketPrice,
  connectWallet,
  doTx,
  setCurrentAccount,
  cryptoPayment,
  setCryptoPayment,
}) {
  const classes = useStyles();
  const [amountToPay, setAmountToPay] = useState(0);
  // const [cryptoPayment, setCryptoPayment] = useState('$ETH');

  //create an input on the front end for the user to add a token
  //2. Display balance of such token
  //--- Before doing the above whitelist certain addresses
  //3. User's balance is fetched from the contract address
  //4. Conditionnally call a function whether user pays with $ETH or with another ERC20 Token

  return (
    <>
      <Background />

      <Grid container className={classes.container}>
        <Grid item xs={false} sm={false}></Grid>
        <Grid item xs={12} sm={5}>
          <PaymentForm
            tokensBalances={tokensBalances}
            setCryptoPayment={setCryptoPayment}
            cryptoPayment={cryptoPayment}
            amountToPay={amountToPay}
            setAmountToPay={setAmountToPay}
            doTx={doTx}
            currentAccount={currentAccount}
          />
          <Balance
            currentTreasuryBalance={currentTreasuryBalance}
            marketPrice={marketPrice}
            currentBalance={currentBalance}
          />
        </Grid>

        <Grid item xs={false} sm={false}></Grid>
      </Grid>
    </>
  );
}
