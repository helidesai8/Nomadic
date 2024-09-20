// author: Smit Patel
//Button theme wrapper for login and signup button.
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
      ochre: Palette['primary'];
    }
  
    interface PaletteOptions {
      ochre?: PaletteOptions['primary'];
    }
  }
  
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      ochre: true;
    }
  }
  
  const theme = createTheme({
    palette: {
      ochre: {
        main: '#051036',
        light: '#051036',
        dark: '#051036',
        contrastText: '#FFFFFF',
      },
    },
  });

  const ButtonThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };
  
  export default ButtonThemeWrapper;