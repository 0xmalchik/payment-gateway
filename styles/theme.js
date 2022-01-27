import { createTheme } from '@material-ui/core';
import { green,amber, blue, deepOrange, grey, purple } from '@material-ui/core/colors';


const theme = createTheme({
    palette: {
      primary: {
        main: green[50],
      },
      secondary: {
        main: green[500],
      },
    },
  });
  export default theme;
