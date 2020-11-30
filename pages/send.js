import Page from '../components/page';
import Header from '../components/header';
import Link from 'next/link';

const Send = () => {
    return (
        <Page title={'Send'}>
            <Header />
            <p className={'mt-32'}>Send here</p>
            {/* <Link href={'/'}> */}
                <a
                    className={'p-3 uppercase w-full md:w-auto md:inline-block text-center'}
                    href={'/'}
                >
                    {'Home'}
                </a>
    {/* </Link> */}

        </Page>
    )
}

export default Send;
