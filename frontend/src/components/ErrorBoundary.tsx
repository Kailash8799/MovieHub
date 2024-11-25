import {Component, ErrorInfo, ReactNode} from 'react';
import {ToastAndroid} from 'react-native';
import RNRestart from 'react-native-restart';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({hasError: true});

    ToastAndroid.showWithGravityAndOffset(
      "Oops! We need to restart the app. Hold tight, it'll be quick.",
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      0,
      0,
    );
    RNRestart.restart();
  }

  render() {
    if (this.state.hasError) {
      return null; // You can customize this to show an error UI.
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
