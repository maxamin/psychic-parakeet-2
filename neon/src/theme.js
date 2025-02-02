// theme.js

import { extendTheme } from '@chakra-ui/react';


const config= {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const simpleDarkTheme = extendTheme(config);



const neonTempestTheme = extendTheme({
    initialColorMode: 'dark',
    useSystemColorMode: false,


    fonts: {
        body: 'Helvetica Neue, sans-serif',
        heading: 'Montserrat, sans-serif',
    },
    colors: {
        black: '#000',
        white: '#fff',
        neonBlue: '#0f7ae5',
        neonPink: '#ff0099',
        neonPurple: '#aa00ff',
        gray: {
            50: '#f7f7f7',
            100: '#e0e0e0',
            200: '#c7c7c7',
            300: '#adadad',
            400: '#949494',
            500: '#7a7a7a',
            600: '#616161',
            700: '#474747',
            800: '#2e2e2e',
            900: '#141414',
        },
    },
    styles: {
        global: {
            'html, body': {
                fontFamily: 'body',
                lineHeight: 'tall',
            },
            a: {
                color: 'neonBlue',
                _hover: {
                    textDecoration: 'underline',
                },
            },
        },
    },
    components: {
        Heading: {
            baseStyle: {
                color: 'neonPurple',
            },
        },
        Button: {
            baseStyle: {
                borderRadius: 'full',
            },
            variants: {
                solid: {
                    bg: 'neonPink',
                    color: 'black',
                    _hover: {
                        bg: 'neonPurple',
                    },
                },
                outline: {
                    color: 'neonPink',
                    border: '1px solid',
                    borderColor: 'neonPink',
                    _hover: {
                        bg: 'neonPink',
                        color: 'black',
                    },
                },
            },
        },
    },
});

export default neonTempestTheme;
