import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import SendForm from '../components/forms/send-form';
import {SendProvider} from '../utils/send-context';

const Send = () => (
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'flex flex-1 flex-col justify-center items-center'}>
            <SendProvider>
                <SendForm />
            </SendProvider>
        </div>
    </Page>
);

export default Send;
