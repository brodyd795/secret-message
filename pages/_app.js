import React, {useEffect} from 'react';
import {useRouter} from 'next/router';
import Head from 'next/head';

import {initGA, logPageView} from '../utils/analytics';
import '../styles/index.css';

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
            <Head>
                <meta charSet={'utf-8'} />
                <meta
                    httpEquiv={'X-UA-Compatible'}
                    content={'IE=edge'}
                />
                <meta
                    name={'viewport'}
                    content={'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'}
                />
                <title>Secret Message App</title>
            </Head>
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
                    color: #adafbb;
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
                    color: #c6c6c6;
                    cursor: pointer;
                }
                
                p {
                    margin: 0 0 8px;
                }
                
                #__next {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }`}
            </style>
        </>
    );
};
