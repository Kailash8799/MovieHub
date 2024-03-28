import { ImageProps } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type Theme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};


export type ThemeColor = {
  primary: string;
  secondary: string;
  teritary: string;
  quantenary: string;
  quinary: string;
};


export type CustomButtonType = {
  title: string;
  color?: string;
  borderRadius?: number;
  onClick: () => void;
};

export type OnboardingCardType = {
  image: ImageProps;
  title: string;
  description: string;
};

export type HomeScreenSliderType = {
  image: ImageProps;
  title: string;
  description: string;
  x: SharedValue<number>
  index: SharedValue<number>
};
