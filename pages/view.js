import React from 'react';

import Page from '../components/page';
import Header from '../components/header';

const View = ({message}) => {
    const foo = 'foo';

    return (
        <Page title={'Send | Secret Message'}>
            <Header />
            <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
                <div className={'relative flexf flex-col justify-center w-3/4 sm:w-1/2 md:w-2/5'}>
                    <p>Secret message:</p>
                    <p>{message}</p>
                </div>
            </div>
        </Page>
    );
};

View.getInitialProps = async (ctx) => {
    const {query} = ctx;
    const res = await fetch(`http://localhost:3000/api/controllers/view?id=${query.id}`);
    const json = await res.json();
    const message = json.message;

    return {
        message
    };
  }

export default View;
