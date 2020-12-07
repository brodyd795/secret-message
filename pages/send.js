import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import Form from '../components/form';

const Send = () => (
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
            <div className={'relative flex justify-center w-3/4 sm:w-1/2 md:w-2/5'}>
                <Form />
            </div>
        </div>
    </Page>
);

export default Send;
