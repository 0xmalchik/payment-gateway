import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    content:{
        color:'white',
        display:'flex',
        flexDirection:"column",
        justifyContent: 'center',
        alignItems:'center'
    }
}));

export default function NotConnected() {

    const classes = useStyles()
  return (
    <>
      <Grid>
        <Typography className={classes.content}>
          <h1>Welcome to the payment gateway !</h1>
          <h3 >
            This payment gateway only allows payment with cryptocurrencies
          </h3>
          <h4 >How to process a payment ? </h4>
          <ul>
              <li>Install the metamask extension, fund your account
            with WBTC, ETH or USDT</li>
              <li>Click on connect and you will see all the information displayed</li>
          </ul>
        </Typography>
      </Grid>
    </>
  );
}
