import Head from 'next/head';
import React from 'react';

const Page = ({children, title}) =>
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
        </Head>
        {children}
    </>;

export default Page;
