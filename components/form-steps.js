import React, {useState, useRef, useEffect} from 'react';

import {theme} from '../tailwind.config';
import {SendFormSteps} from '../enums/form-steps';
import LeftArrowIcon from '../public/left-arrow.svg';
import RightArrowIcon from '../public/right-arrow.svg';

import SlidingDiv from './sliding-div';

export const Label = ({children}) => (
    <label className={'block text-center text-xl'}>{children}</label>
);

export const ButtonContainer = ({children}) =>
    <div className={'w-screen flex justify-between fixed bottom-0 left-0'}>{children}</div>;

export const BackButton = ({backText, handleBack}) => (
    <>
        <div className={'flex h-20 w-1/2 sm:w-2/5'}>
            {backText &&
                <button
                    type={'button'}
                    className={'flex flex-col justify-center items-center m-2 p-2 rounded border w-full'}
                    onClick={handleBack}
                >
                    <LeftArrowIcon className={'h-6'} />
                    <span className={'text-lg'}>{backText}</span>
                </button>}
        </div>
    </>
);

export const NextButton = ({nextText, handleSubmit}) => (
    <>
        <div className={'flex h-20 w-1/2 sm:w-2/5'}>
            {nextText &&
                <button
                    type={'submit'}
                    className={'flex flex-col justify-center items-center m-2 p-2 rounded border w-full'}
                    onClick={(e) => {
                        e.preventDefault();

                        handleSubmit();
                    }}
                >
                    <RightArrowIcon className={'h-6'} />
                    <span className={'text-lg'}>{nextText}</span>
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
            <form className={'w-full'}>
                <SlidingDiv motionKey={step}>
                    <Label>{'Enter recipient email address'}</Label>
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
                        className={'my-4 p-1 rounded'}
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
            <form className={'w-full'}>
                <SlidingDiv motionKey={step}>
                    <Label>{'Enter secret message'}</Label>
                    <textarea
                        id={'message'}
                        value={message}
                        aria-label={'message'}
                        placeholder={'e.g. My real name is Bruce Wayne'}
                        onChange={(e) => {
                            setErrorMessage('');
                            setMessage(e.target.value);
                        }}
                        cols={'10'}
                        className={'my-4 p-1 rounded'}
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
            <form className={'w-full'}>
                <SlidingDiv motionKey={step}>
                    <p className={'text-center text-xl'}>{'Are you sure?'}</p>
                    <div className={''}>
                        <label className="flex cursor-pointer items-center">
                            <input className="checkbox cursor-pointer relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none" type={'checkbox'} checked={isSelfDestructChecked} onClick={() => setIsSelfDestructChecked(!isSelfDestructChecked)} />
                            <span className="ml-2">{`Self-destruct ${isSelfDestructChecked ? 'after 15min' : 'never'}`}</span>
                        </label>
                    </div>
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

export const Result = ({email, message, isSelfDestructChecked, setStep, step}) => {
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
                        <h3 className={'text-center text-xl'}>{'Success!'}</h3>
                        <p className={'mt-4'}>{`Remind ${email} to check their email for your message. ${isSelfDestructChecked && 'It will self-destruct in 15 minutes.'} `}</p>
                    </>
                    :
                    <>
                        <h3 className={'text-center text-xl'}>{'Something unexpected happened...'}</h3>
                        <p className={'mt-4'}>{'Sorry, something went wrong. Please try sending your message again.'}</p>
                    </>}
                    <ButtonContainer>
                    <BackButton
                        backText={'Message'}
                        handleBack={() => setStep(step - 1)}
                    />
                </ButtonContainer>
            </div>
        </>
    );
};

