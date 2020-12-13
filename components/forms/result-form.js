import React, {useEffect, useState} from 'react';

import {theme} from '../../tailwind.config';

import FormButtonContainer from './form-buttons';

const Heading = ({children}) =>
    <h3 className={'text-center text-xl'}>{children}</h3>;

const Text = ({children}) =>
    <p className={'mt-4'}>{children}</p>;

const Result = ({email, message, isSelfDestructChecked, setStep, step}) => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/controllers/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                message,
                isSelfDestructChecked
            })
        }).then((result) => {
            setLoading(false);
            setSuccess(result.status === 200);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pulse = {
        animation: theme.extend.animation.pulseskeleton
    };

    if (loading) {
        return (
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
        );
    }

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
