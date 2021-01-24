import React from 'react';
import Link from 'next/link';

import Page from '../components/page';
import Header from '../components/header';

const Home = () =>
    <Page title={'Home | Secret Message'}>
        <Header />
        <div className={'flex flex-1 flex-col justify-center items-center'}>
            <div className={'flex flex-col text-center'}>
                <span className={'text-4xl'}>{'Send a secret message.'}</span>
                <span className={'text-2xl mt-5'}>{'Fully secure.'}</span>
                <span className={'text-2xl'}>{'Dead simple.'}</span>
            </div>
            <div className={'p-3 w-full flex justify-center'}>
                <Link href="/send">
                    <button
                        type={'button'}
                        className={'border outline-none focus:outline-none h-16 my-10 rounded px-8 align-middle'}
                    >
                        {'Send message'}
                    </button>
                </Link>
            </div>
        </div>
    </Page>;

export default Home;
