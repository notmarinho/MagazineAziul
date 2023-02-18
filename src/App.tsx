import React from 'react';
import {SafeAreaView} from 'react-native';

import AuthContextProvider from './contexts/AuthContext';
import Navigator from './navigation';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthContextProvider>
        <Navigator />
      </AuthContextProvider>
    </SafeAreaView>
  );
}

export default App;
