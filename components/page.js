import Head from 'next/head';
import React from 'react';

const Page = ({children, title}) =>
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap" rel="stylesheet" />
        </Head>
        {children}
    </>;

export default Page;
