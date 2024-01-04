// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import store from 'app/store/index';
import AppContext from 'app/AppContext';

const withAppProviders = (Component) => (props) => {
  const WrapperComponent = () => (
    <AppContext.Provider
      value={{
        routes,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <Component {...props} />
          </StyledEngineProvider>
        </Provider>
      </LocalizationProvider>
    </AppContext.Provider>
  );

  return WrapperComponent;
};

export default withAppProviders;
