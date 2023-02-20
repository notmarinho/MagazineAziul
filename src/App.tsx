import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';

import {store} from '@store/redux';

import AppContextProvider from './contexts/AppContext';
import Navigator from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <AppContextProvider>
          <Navigator />
        </AppContextProvider>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
