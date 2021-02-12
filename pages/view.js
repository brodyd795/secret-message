import React from 'react';

import Page from '../components/page';
import Header from '../components/header';
import ViewForm from '../components/forms/view-form';

const View = () =>
    <Page title={'View | Secret Message'}>
        <Header />
        <div className={'flex flex-1 flex-col justify-center items-center'}>
            <ViewForm />
        </div>
    </Page>;

export default View;
