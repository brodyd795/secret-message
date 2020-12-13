import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import SendForm from '../components/forms/send-form';

const Send = () =>
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'h-screen flex flex-col justify-center items-center'}>
            <div className={'relative flex justify-center w-full'}>
                <SendForm />
            </div>
        </div>
    </Page>;

export default Send;
