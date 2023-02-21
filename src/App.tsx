import React from 'react';
import {Provider} from 'react-redux';

import {store} from '@store/redux';

import AppContextProvider from './contexts/AppContext';
import Navigator from './navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Navigator />
      </AppContextProvider>
    </Provider>
  );
}

export default App;
