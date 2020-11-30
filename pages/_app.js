import React from 'react';

import '../styles/index.css';
import {theme} from '../tailwind.config';

export default ({Component, pageProps}) =>
    <>
        <Component {...pageProps} />
        <style
            jsx
            global
        >
            {`
                html {
                    box-sizing: border-box;
                }
                
                body {
                    color: ${theme.extend.colors.gold.DEFAULT};
                    font-size: 16px;
                    background-image: url(${require('../public/background.svg')});
                }
                
                html,
                body {
                    width: 100%;
                    margin: 0;
                }
                
                a {
                    color: ${theme.extend.colors.gold.DEFAULT};
                    cursor: pointer;
                }
                
                p {
                    margin: 0 0 8px;
                }
                
                #__next {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                
            `}
        </style>
    </>;
