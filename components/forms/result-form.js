import React from 'react';
import Link from 'next/link';

import sendMessage from '../../utils/send-message';
import {theme} from '../../tailwind.config';

const Heading = ({children}) =>
    <h3 className={'text-center text-xl'}>{children}</h3>;

const Text = ({children}) =>
    <p className={'mt-4'}>{children}</p>;

const Skeletons = () => {
    const pulse = {
        animation: theme.extend.animation.pulseskeleton
    };

    return (
        <div className={'flex flex-col w-full sm:w-1/2 p-8'}>
            <div
                className={'bg-gray-800 w-3/4 h-5 mb-3'}
                style={pulse}
            />
            <div
                className={'bg-gray-800 w-full h-5 mb-3'}
                style={pulse}
            />
            <div
                className={'bg-gray-800 w-5/6 h-5'}
                style={pulse}
            />
        </div>
    );
};

const Result = ({name, email, message, isSelfDestructChecked, loading, success, setLoading, setSuccess}) => {
    if (loading) {
        return (
            <Skeletons />
        );
    }

    const handleTryAgain = async () => {
        setLoading(true);

        const result = await sendMessage(name, email, message, isSelfDestructChecked);

        setSuccess(result.status === 200);
        setLoading(false);
    };

    return (
        <>
            <div>
                {success ?
                    <div className={'m-8 flex flex-col'}>
                        <Heading>{'Success!'}</Heading>
                        <Text>{`Remind ${email} to check their email for your message.`}</Text>
                        {isSelfDestructChecked && <Text>{'It will self-destruct in 15 minutes.'}</Text>}
                        <Link href={'/'}>
                            <button
                                type={'button'}
                                className={'mt-4 self-center flex flex-col justify-center items-center m-2 p-2 rounded border w-48 transform hover:scale-105 transition duration-150 ease-in-out bg-gray-900'}
                            >
                                {'Home'}
                            </button>
                        </Link>
                    </div>
                    :
                    <div className={'m-8 flex flex-col'}>
                        <Heading>{'Something unexpected happened...'}</Heading>
                        <Text>{'Sorry, something went wrong. Please try sending your message again.'}</Text>
                        <button
                            type={'button'}
                            onClick={handleTryAgain}
                            className={'mt-4 self-center flex flex-col justify-center items-center m-2 p-2 rounded border w-48 transform hover:scale-105 transition duration-150 ease-in-out bg-gray-900'}
                        >
                            {'Try again'}
                        </button>
                    </div>}
            </div>
        </>
    );
};

export default Result;
