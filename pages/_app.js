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
                    background-color: #03060c;
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

                .checkbox:before {
                    content: '';
                    position: absolute;
                    width: 1.25rem;
                    height: 1.25rem;
                    border-radius: 50%;
                    top: 0;
                    left: 0;
                    transform: scale(1.1);
                    box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.2);
                    background-color: white;
                    transition: 0.2s ease-in-out;
                }
        
                .checkbox:checked {
                    @apply: bg-indigo-400;
                    background-color: #7f9cf5;
                }
        
                .checkbox:checked:before {
                    left: 1.25rem;
                }
                
            `}
        </style>
    </>;
