import Typography from '@material-ui/core/Typography';
import '../styles/globals.css'

import theme from '../styles/theme';

function MyApp({ Component, pageProps }) {
  return (
   
      <Typography>
        <Component {...pageProps} />
      </Typography>
   
  );
}

export default MyApp;
