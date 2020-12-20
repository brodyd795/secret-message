import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

import {initGA, logPageView} from '../utils/analytics';
import '../styles/index.css';
import {theme} from '../tailwind.config';

export default ({Component, pageProps}) => {
    const router = useRouter();

    // credit: https://github.com/react-ga/react-ga
    useEffect(() => {
        initGA();

        if (!router.asPath.includes('?')) {
            logPageView();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
    // Listen for page changes after a navigation or when the query changes
        router.events.on('routeChangeComplete', logPageView);

        return () => {
            router.events.off('routeChangeComplete', logPageView);
        };
    }, [router.events]);

    return (
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
                font-family: 'JetBrains Mono', monospace;
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
        </>
    );
};
