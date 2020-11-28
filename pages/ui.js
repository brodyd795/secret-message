import React from 'react';

import Page from '../components/page';
import Footer from '../components/footer';
import Header from '../components/header';

const styles = {
    wrapper: {
        flex: 1
    }
};

const Card = ({children}) => <div className={'flex flex-col m-3 p-3 items-center border-2 border-white'}>{children}</div>;

const H3 = ({children}) => <h3 className={'text-gray-500'}>{children}</h3>;

const P = ({children}) => <p className={'m-3'}>{children}</p>;

const UI = () => (
    <Page title={'UI'}>
        <Header />
        <div style={styles.wrapper} className={'md:flex flex-1 items-center'}>
            <div className={'md:flex'}>
                <Card>
                    <H3>{'Secure transit'}</H3>
                    <P>{'Your secrets are sent via https protocol at every step along the way.'}</P>
                </Card>
                <Card>
                    <H3>{'Encrypted at rest'}</H3>
                    <P>
                        {'All data is stored on a private server, fully encrypted using '}
                        <a
                            href={'https://en.wikipedia.org/wiki/Advanced_Encryption_Standard'}
                            target={'_blank'}
                        >
                            {'aes-256-cbc'}
                        </a>
                        {', the only public cipher approved by the NSA.'}
                    </P>
                </Card>
                <Card>
                    <H3>{'Readable by recipient alone'}</H3>
                    <P>{'Only one copy of the encyption keys exist – in the hands of your recipient. Not even the creators can decrypt your message.'}</P>
                </Card>
                <Card>
                    <H3>{'Open source'}</H3>
                    <P>
                        {'The full code for this app is publicly available '}
                        <a
                            href={'https://github.com/brodyd795/secret-message'}
                            target={'_blank'}
                        >
                            {'here'}
                        </a>
                        {'. No blind trust – fully open.'}
                    </P>
                </Card>
            </div>

            <div className={'sticky bottom-0 w-full h-64'}>
                <button className={'border p-3 mt-4 w-full mb-2'}>
                    {'Send Message'}
                </button>
            </div>
        </div>
        <Footer />
    </Page>
);

export default UI;
