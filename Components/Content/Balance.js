import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#e8f5e9',
    padding: '10px 10px 10px 10px',
    color: 'black',
    width: '100%',
    height: '100%',
  },
}));

export default function Balance({ marketPrice, currentBalance }) {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid className={classes.container} item>
          <p> Ethereum market price : ${marketPrice} </p>

          <p>
            Amount : {currentBalance.toFixed(5) + ' '}
            $ETH which is equal to ${(currentBalance * marketPrice).toFixed(2)}
          </p>
        </Grid>
      </Grid>
    </>
  );
}
