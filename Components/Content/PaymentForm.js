import React, { useEffect } from 'react';
import { Button, Grid, Input, Menu, MenuItem,TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  item: {
    backgroundColor: '#e8f5e9',
    padding: '10px 10px 10px 10px',
    opacity: '1',
    color: 'black',
    width: '100%',
    height: '400px',
    textAlign: 'center',
  },
  PaymentForm: {
    justifyContent: 'center',
  },
}));

export default function PaymentForm({
  tokensBalances,
  setCryptoPayment,
  cryptoPayment,
  setAmountToPay,
  doTx,
  currentAccount,
  amountToPay,
}) {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const open = Boolean(menu);

  const handleClick = event => {
    setMenu(event.currentTarget);
  };
  const handleClose = event => {
    if (!event.target.firstChild) {
      setMenu(null);
      return;
    } else {
      setMenu(null);
      setCryptoPayment(event.target.firstChild.data);
    }
  };

  function renderTokenBalances() {
    return (
      <>
        {!tokensBalances
          ? null
          : tokensBalances.map((e, index) => (
              <>
                <img style={{heigth:'32',width:'32'}} key={index} src={e.img} alt='Not Showing' />
                <a   key={index}> {Number(e.tokenBalance).toFixed(5)}</a>
              </>
            ))}
      </>
    );
  }

  return (
    <>
      <Grid container>
        <Grid className={classes.item} item>
          <Grid className={classes.PaymentForm} container item>
            <form>
              <Grid  item>
                <h2>Payment form</h2>
                {renderTokenBalances()}
                <h4>Choose the desired crypto</h4>
              </Grid>
              <div>
                <Button
                  id='demo-positioned-button'
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  variant='outlined'
                  aria-required
                >
                  {cryptoPayment}
                </Button>
                <Menu
                  id='demo-positioned-menu'
                  aria-labelledby='demo-positioned-button'
                  anchorEl={menu}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {tokensBalances.map((e, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                      {e.tkn}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <p>
                Enter the value in {!cryptoPayment ? '$ETH' : cryptoPayment} you
                want to send
              </p>
              <TextField
                onChange={event => setAmountToPay(event.target.value)}
                type='text'
                placeholder='Amount to pay...'
                required='number'
                
              />

              <Button
                type='submit'
                className='cta-pay'
                onClick={e =>
                  doTx(e, currentAccount, amountToPay, cryptoPayment)
                }
              >
                PAY
              </Button>
            </form>
          </Grid>

         
        </Grid>
      </Grid>
    </>
  );
}
