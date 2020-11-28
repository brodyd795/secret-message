import React from 'react';
import Link from 'next/link';

import Page from '../components/page';
import Header from '../components/header';

const Home = () =>
    <Page title={'Message'}>
        <Header />
        <div className={'flex flex-1 justify-center flex-col ml-4 sm:ml-16 md:items-center md:ml-0'}>
            <span className={'text-4xl'}>Send a secret message.</span>
            <span className={'text-2xl mt-5 ml-3'}>Fully secure.</span>
            <span className={'text-2xl ml-3'}>Dead simple.</span>
        </div>
        <div className={'m-3'}>
            <Link href="/send">
                <button
                    type={'button'}
                    className={'w-full border h-16 rounded bg-green-500'}
                >
                    {'Send message'}
                </button>
            </Link>
        </div>
    </Page>;

export default Home;
