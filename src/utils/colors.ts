import { ThemeColor } from './types';

const commonColor = {
    primaryblack: '#1c1c1e',
    primarywhite: '#1c3c1e',
    primaryyellow:'rgba(255,159,11,1)',
};

const darkThemeColor: ThemeColor = {
    primary: '#FFD645',
    secondary: 'rgba(34, 38, 49,1)',
    teritary: '#30343F',
    quantenary: '#151618',
    quinary: '#FFFFFF',
};

const lightThemeColor: ThemeColor = {
    primary: '#FFD645',
    secondary: '#222632',
    teritary: '#30343F',
    quantenary: '#151618',
    quinary: '#FFFFFF',
};

export { darkThemeColor, lightThemeColor, commonColor };
