import React from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import store from './store';
import AppRoutes from './routes';
import './styles/index.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0781D0',
    },
    secondary: {
      main: '#f63',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseLine />
      <div className="container" style={{ height: '100%' }}>
        <Provider store={store}>
          <React.Fragment>
            <AppRoutes />
          </React.Fragment>
        </Provider>
      </div>
    </MuiThemeProvider>
  );
}
