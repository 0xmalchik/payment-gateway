import React from 'react';
import { ethers } from 'ethers';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  headerContent: {
    flex: 1,
    textAlign: 'center',
    
  },
  navContent: {
    color: 'black',
    textDecoration: 'none',
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  navText: {
    color: 'black',
  },
}));

export default function Header({
  connectWallet,
  disconnectWallet,
  currentAccount,
}) {
  // const navElem = [
  //   {
  //     name: 'Buy',
  //     path: '/buy',
  //   },
  //   {
  //     name: 'Tokenomics',
  //     path: '/tokenomics',
  //   },
  //   {
  //     name: 'Roadmap',
  //     path: '/roadmap',
  //   },
  //   {
  //     name: 'Team',
  //     path: '/team',
  //   },
  //   {
  //     name: 'F.A.Q.',
  //     path: '/faq',
  //   },
  // ];
  const classes = useStyles();

  // function renderNavElem() {
  //   return navElem.map((e, index) => (
  //     <Grid className={classes.navContent} item sm={1}>
  //       <Link className={classes.navText} href={e.path}>
  //         {e.name}
  //       </Link>
  //     </Grid>
  //   ));
  // }

  function renderConnectionButton(currentAccount) {
    if (!currentAccount) {
      return (
        <Button key={Math.random()} onClick={() => connectWallet()} variant='outlined'>
          Connect
        </Button>
      );
    } else {
      return (
        <Button  key={Math.random()} onClick={() => disconnectWallet()} variant='outlined'>
          {currentAccount.substring(0, 4) +
            '...' +
            currentAccount.substring(38, 43)}
        </Button>
      );
    }
  }

  return (
    <AppBar style={{ marginBottom:'30px'}} position='static'>
       
      <Toolbar >
      <Grid container>
          <Typography className={classes.headerContent}>
          <h1>Payment gateway</h1>
          </Typography>
        </Grid>
        {renderConnectionButton(currentAccount)}
      </Toolbar>
    </AppBar>
  );
}
