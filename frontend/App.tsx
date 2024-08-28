/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/components/providers/AppProvider';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
