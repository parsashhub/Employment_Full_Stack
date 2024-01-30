// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
// check this link for more information : https://mui.com/x/react-date-pickers/adapters-locale/
import fa from 'date-fns/locale/fa-IR';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {StyledEngineProvider} from '@mui/material/styles';
import routes from 'app/configs/routesConfig';
import React, {useMemo} from 'react';
import {Provider} from 'react-redux';
import ErrorBoundary from '@fuse/utils/ErrorBoundary';
import AppContext from './AppContext';
import store from './store/store';

type ComponentProps = {
    name?: string;
};

function withAppProviders(Component: React.ComponentType<ComponentProps>) {
    function WithAppProviders(props: React.PropsWithChildren<ComponentProps>) {
        const val = useMemo(
            () => ({
                routes
            }),
            [routes]
        );

        return (
            <ErrorBoundary>
                <AppContext.Provider value={val}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fa}>
                        <Provider store={store}>
                            <StyledEngineProvider injectFirst>
                                <Component {...props} />
                            </StyledEngineProvider>
                        </Provider>
                    </LocalizationProvider>
                </AppContext.Provider>
            </ErrorBoundary>
        );
    }

    return WithAppProviders;
}

export default withAppProviders;
