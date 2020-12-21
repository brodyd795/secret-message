import React from 'react';

import sendMessage from '../../utils/send-message';
import {theme} from '../../tailwind.config';

import FormButtonContainer from './form-buttons';

const Heading = ({children}) =>
    <h3 className={'text-center text-xl'}>{children}</h3>;

const Text = ({children}) =>
    <p className={'mt-4'}>{children}</p>;

const Skeletons = () => {
    const pulse = {
        animation: theme.extend.animation.pulseskeleton
    };

    return (
        <>
            <div className={'flex flex-col w-full'}>
                <div
                    className={'bg-gray-800 w-3/4 h-5 mb-3'}
                    style={pulse}
                />
                <div
                    className={'bg-gray-800 w-full h-5'}
                    style={pulse}
                />
            </div>
        </>
    );
};

const Result = ({email, message, isSelfDestructChecked, setStep, step, loading, success, setLoading, setSuccess}) => {
    if (loading) {
        return (
            <Skeletons />
        );
    }

    const handleTryAgain = async () => {
        const result = await sendMessage(email, message, isSelfDestructChecked);

        if (result.message) {
            setSuccess(true);
        }

        setLoading(false);
    };

    return (
        <>
            <div>
                {success ?
                    <>
                        <Heading>{'Success!'}</Heading>
                        <Text>{`Remind ${email} to check their email for your message. ${isSelfDestructChecked && 'It will self-destruct in 15 minutes.'} `}</Text>
                    </>
                    :
                    <>
                        <Heading>{'Something unexpected happened...'}</Heading>
                        <Text>{'Sorry, something went wrong. Please try sending your message again.'}</Text>
                        <button
                            type={'button'}
                            onClick={handleTryAgain}
                        >
                            {'Try again'}
                        </button>
                    </>}
                <FormButtonContainer
                    backText={'Message'}
                    handleBack={() => setStep(step - 1)}
                    nextText={''}
                />
            </div>
        </>
    );
};

export default Result;
