'use client'
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      // main: '#B6C6CB',
      main: '#aac4a2',
      dark: '#354d54',
      contrastText: '#713e11ff',
    },
    secondary: {
      main:'#1565C0',
      light: 'rgb(122, 105, 230)',
      dark:'rgb(31, 23, 87)'
    },
  },
  
  // current default is spectral. to use the below fonts, 
  // 1. load in layout.ts 2. add 'font'.variable to html className, 3. use in Typography sx, fontFamily: 'var(--font-quintessential)',
    typography: {
      fontFamily: [
        'var(--font-spectral)',
        'Montserrat',
        'Sacramento',
        'var(--font-goudy)', 
        'Courgette',
        'Tangerine',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          // backgroundColor: 'yellow!important',
          backgroundColor: 'main',
          textTransform: 'none',
        },
      },
    },


  },
});

//color names
// 'inherit'
// | 'action'
// | 'disabled'
// | 'primary'
// | 'secondary'
// | 'error'
// | 'info'
// | 'success'
// | 'warning'
// | string

{/* Typography sizes
h1: 6rem (96px)
h2: 3.75rem (60px)
h3: 3rem (48px)
h4: 2.125rem (34px)
h5: 1.5rem (24px)
h6: 1.25rem (20px)
subtitle1: 1rem (16px)
subtitle2: 0.875rem (14px)
body1: 1rem (16px)
body2: 0.875rem (14px)
button: 0.875rem (14px)
caption: 0.75rem (12px)
overline: 0.75rem (12px)
*/}

{/* 
  breakpoints: { 
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 900,
    xl: 1450,
    xxl: 1800  // custom breakpoint
  }
},
*/}
