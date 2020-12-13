import React from 'react';
import Link from 'next/link';

import Page from '../components/page';
import Header from '../components/header';

const Home = () =>
    <Page title={'Home | Secret Message'}>
        <Header />
        <div className={'flex flex-1 md:flex-none justify-center flex-col ml-4 sm:ml-16 md:items-center md:justify-end md:ml-0 md:mt-32'} style={{height: '30vh'}}>
            <span className={'text-4xl'}>Send a secret message.</span>
            <span className={'text-2xl mt-5 ml-3'}>Fully secure.</span>
            <span className={'text-2xl ml-3'}>Dead simple.</span>
        </div>
        <div className={'p-3 w-full flex justify-center'}>
            <Link href="/send">
                <button
                    type={'button'}
                    className={'w-full border h-16 mb-12 rounded md:w-auto md:mt-10 md:px-8 table-cell align-middle'}
                >
                    <a>
                        {'Send message'}
                    </a>
                </button>
            </Link>
        </div>
    </Page>;

export default Home;
