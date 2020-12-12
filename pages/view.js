import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import ViewForm from '../components/forms/view-form';

const View = () =>
    <Page title={'Send | Secret Message'}>
        <Header />
        <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
            <div className={'relative flex flex-col justify-center w-3/4 sm:w-1/2 md:w-2/5'}>
                <ViewForm />
            </div>
        </div>
    </Page>;

export default View;
