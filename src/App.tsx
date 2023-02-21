import React from 'react';
import {Provider} from 'react-redux';

import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';

import {store} from '@store/redux';
import database from '@store/watermelon';

import AppContextProvider from './contexts/AppContext';
import Navigator from './navigation';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <DatabaseProvider database={database}>
        <AppContextProvider>
          <Navigator />
        </AppContextProvider>
      </DatabaseProvider>
    </Provider>
  );
}

export default App;
