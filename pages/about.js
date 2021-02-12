import React from 'react';

import Page from '../components/page';
import Footer from '../components/footer';
import Header from '../components/header';

const Heading = ({children}) =>
    <div className={'text-3xl mt-10 mb-4'}>{children}</div>;

const Text = ({children}) =>
    <div className={'mt-2 ml-4 border-l pl-4'}>{children}</div>;

const Disclaimer = () =>
    <>
        <hr className={'mt-10'} />
        <div className={'text-xl mt-10'}>
            {'Disclaimer and Liability Notice'}
        </div>
        <div className={'text-sm mt-2 ml-4 border-l pl-4'}>
            {'The owner of this website makes no promises or guarantees about the security or adequacy of the tool provided herein and expressly disclaims liability for any errors in the contents of this website, including but not limited to the security of the data collected and communicated.'}
        </div>
    </>;

const Content = () =>
    <>
        <Heading>
            {'Encrypted at rest'}
        </Heading>
        <Text>
            <span>{'Your secret message is encrypted using '}</span>
            <a
                href={'https://en.wikipedia.org/wiki/Advanced_Encryption_Standard'}
                className={'underline'}
            >
                {'AES-256-CBC'}
            </a>
            <span>{' (the only publicly accessible cipher approved by the NSA) before it’s ever stored.'}</span>
        </Text>
        <Text
            content={'The raw message never touches the database, and it’s additionally protected by an HMAC to verify that it was never tampered with.'}
        />
        <Heading>
            {'Decryptable only by the recipient'}
        </Heading>
        <Text>
            {'Once the encryption keys are generated, they are sent to the recipient and immediately discarded. Nobody can decrypt your message except the recipient.'}
        </Text>
        <Heading>
            {'Open-source code'}
        </Heading>
        <Text>
            <span>{'All of the code for this website is publicly accessible '}</span>
            <a
                href={'https://github.com/brodyd795/secret-message'}
                className={'underline'}
            >
                {' on GitHub'}
            </a>
            <span>{' and has been reviewed by experienced developers.'}</span>
        </Text>
        <Heading>
            {'Secure transit'}
        </Heading>
        <Text>
            {'Your message is communicated over a secure network encrypted by HTTPS protocol. In addition, the database is accessible only by the server hosting the website, thereby preventing access over the internet.'}
        </Text>
    </>;

const About = () =>
    <Page title={'About | Secret Message'}>
        <Header />
        <div className={'flex mt-32 flex-col items-center'}>
            <div className={'flex flex-col md:w-2/3 mx-4 mb-10'}>
                <h1 className={'text-center text-4xl'}>{'About'}</h1>
                <Content />
                <Disclaimer />
            </div>
        </div>
        <Footer />
    </Page>;

export default About;
