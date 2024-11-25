/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import AppProvider from './src/components/providers/AppProvider';
import ErrorBoundary from './src/components/ErrorBoundary';

function App(): React.JSX.Element {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
