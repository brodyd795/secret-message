import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import Form from '../components/form';

const Send = () => (
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
            <div className={'relative'}>
                <Form />
            </div>
        </div>
    </Page>
);

export default Send;
