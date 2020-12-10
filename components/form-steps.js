import React, {useState, useRef, useEffect} from 'react';

import {theme} from '../tailwind.config';
import {SendFormSteps} from '../enums/form-steps';

import SlidingDiv from './sliding-div';

export const ButtonContainer = ({children}) =>
    <div className={'w-screen flex justify-between fixed bottom-0 left-0'}>{children}</div>;

export const BackButton = ({backText, handleBack}) => (
    <>
        <div className={'flex h-24 w-24'}>
            {backText &&
                <button
                    type={'button'}
                    className={'m-2 p-2 rounded border w-full'}
                    onClick={handleBack}
                >
                    {backText}
                </button>}
        </div>
    </>
);

export const NextButton = ({nextText, handleSubmit}) => (
    <>
        <div className={'flex h-24 w-24'}>
            {nextText &&
                <button
                    type={'submit'}
                    className={'m-2 p-2 rounded border w-full'}
                    onClick={(e) => {
                        e.preventDefault();

                        handleSubmit();
                    }}
                >
                    {nextText}
                </button>}
        </div>
    </>
);

export const EmailForm = ({email, setEmail, step, setStep, setErrorMessage}) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const verify = (emailToTest) => emailRegex.test(emailToTest);

    const handleSubmit = () => {
        if (verify(email)) {
            setStep(step + 1);
        } else {
            setErrorMessage('Please enter a valid email address.');
        }
    };

    const textInput = useRef(null);

    useEffect(() => {
        if (step === SendFormSteps.EMAIL) {
            textInput.current.focus();
        }
    }, [step]);

    return (
        <>
            <form>
                <SlidingDiv motionKey={step}>
                    <label className={'block'}>{'Enter recipient email address'}</label>
                    <input
                        id={'email'}
                        type={'text'}
                        value={email}
                        aria-label={'email'}
                        placeholder={'me@example.com'}
                        onChange={(e) => {
                            setErrorMessage('');
                            setEmail(e.target.value);
                        }}
                        required
                        className={'mx-4 my-2 p-1 rounded'}
                        ref={textInput}
                    />
                </SlidingDiv>
                <ButtonContainer>
                    <BackButton
                        backText={''}
                        handleBack={() => setStep(step - 1)}
                    />
                    <NextButton
                        nextText={'Secret Message'}
                        handleSubmit={handleSubmit}
                    />
                </ButtonContainer>
            </form>
        </>
    );
};

export const MessageForm = ({message, setMessage, step, setStep, setErrorMessage}) => {
    const verify = (messageToTest) => messageToTest.length;

    const handleSubmit = () => {
        if (verify(message)) {
            setStep(step + 1);
        } else {
            setErrorMessage('Please enter a secret message.');
        }
    };

    const textInput = useRef(null);

    useEffect(() => {
        if (step === SendFormSteps.MESSAGE) {
            textInput.current.focus();
        }
    }, [step]);

    return (
        <>
            <form>
                <SlidingDiv motionKey={step}>
                    <label className={'block'}>{'Enter secret message'}</label>
                    <textarea
                        id={'message'}
                        value={message}
                        aria-label={'message'}
                        placeholder={'Enter secret message'}
                        onChange={(e) => {
                            setErrorMessage('');
                            setMessage(e.target.value);
                        }}
                        className={'mx-4 my-2 p-1 rounded'}
                        ref={textInput}
                    />
                </SlidingDiv>
                <ButtonContainer>
                    <BackButton
                        backText={'Email'}
                        handleBack={() => setStep(step - 1)}
                    />
                    <NextButton
                        nextText={'Confirm'}
                        handleSubmit={handleSubmit}
                    />
                </ButtonContainer>
            </form>
        </>
    );
};

export const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep}) => {
    const handleSubmit = () => {
        setStep(step + 1);
    };

    const myListener = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', myListener);

        return () => {
            window.removeEventListener('keypress', myListener);
        };
    }, []);

    return (
        <>
            <form>
                <SlidingDiv motionKey={step}>
                    <p>Are you sure?</p>
                    <label>
                        <input
                            onClick={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                            type={'checkbox'}
                            checked={isSelfDestructChecked}
                            className={'mx-3'}
                        />
                        {'Self-destruct after 15min'}
                    </label>
                </SlidingDiv>
                <ButtonContainer>
                    <BackButton
                        backText={'Message'}
                        handleBack={() => setStep(step - 1)}
                    />
                    <NextButton
                        nextText={'Send'}
                        handleSubmit={handleSubmit}
                    />
                </ButtonContainer>
            </form>
        </>
    );
};

export const Result = ({email, message, isSelfDestructChecked}) => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/controllers', {
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
                        <h3>{'Success!'}</h3>
                        <p>{`Remind ${email} to check their email for your message. ${isSelfDestructChecked && 'It will self-destruct in 15 minutes.'} `}</p>
                    </>
                    :
                    <>
                        <h3>{'Something unexpected happened...'}</h3>
                        <p>{'Sorry, something went wrong. Please try sending your message again.'}</p>
                    </>}
            </div>
        </>
    );
};

