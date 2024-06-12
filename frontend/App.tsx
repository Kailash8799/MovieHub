/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/components/providers/AppProvider';
// import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
