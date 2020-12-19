import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import SendForm from '../components/forms/send-form';

const Send = () =>
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'flex flex-1 flex-col justify-center items-center'}>
            <SendForm />
        </div>
    </Page>;

export default Send;
