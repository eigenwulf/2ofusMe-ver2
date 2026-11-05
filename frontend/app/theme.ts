'use client'
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
// 60-30-10” rule: 60 percent dominant neutral, 30 percent secondary, 10 percent primary or accent
  palette: {
    primary: {
      main: '#043a7e',
      // main: '#aac4a2',
      dark: '#010420',
      // contrastText: '#713e11ff',
      // contrastText: '#402416',
      contrastText: '#471d09'
    },
    secondary: {
      main:'#aac4a2',
      light: 'rgb(122, 105, 230)',
      dark:'#1565c0'
    },
  },

//Secondary color uses:
// Secondary buttons (outlined or lighter-filled versions of actions)
// Section backgrounds or banded content areas to separate parts of a page
// Illustrations, icons, charts, and infographics
// Tags, badges, and category labels
// Hover and pressed states
// Decorative accents, such as dividers, highlights, and promotional tiles


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
