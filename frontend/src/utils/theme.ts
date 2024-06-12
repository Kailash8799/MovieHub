import type { Theme } from './types';

const DarkTheme: Theme = {
    dark: true,
    colors: {
        primary: '#FFD645',
        // primary: 'rgb(10, 132, 255)',
        background: '#2a2f3d',
        card: 'rgb(18, 18, 18)',
        text: 'rgb(229, 229, 231)',
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    },
};

const LightTheme: Theme = {
    dark: false,
    colors: {
        primary: 'rgb(0, 122, 255)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
};

export { DarkTheme, LightTheme };
