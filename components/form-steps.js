import React, {useRef, useEffect} from 'react';

import FormSteps from '../enums/form-steps';

const ButtonContainer = ({children}) =>
    <div className={'flex justify-between'}>{children}</div>;

export const BackButton = ({backText, step, setStep}) => (
    <>
        <div className={'flex h-24 w-24'}>
            {backText &&
                <button
                    type={'button'}
                    className={'m-2 p-2 rounded border w-full'}
                    onClick={() => setStep(step - 1)}
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
        if (step === FormSteps.EMAIL) {
            textInput.current.focus();
        }
    }, [step]);

    return (
        <>
            {step === FormSteps.EMAIL &&
                <form>
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        required
                        className={'mx-4 my-2 p-1 rounded'}
                        ref={textInput}
                    />
                    <ButtonContainer>
                        <BackButton
                            backText={''}
                            setStep={setStep}
                            step={step}
                        />
                        <NextButton
                            nextText={'Secret Message'}
                            handleSubmit={handleSubmit}
                        />
                    </ButtonContainer>
                </form>}
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
        if (step === FormSteps.MESSAGE) {
            textInput.current.focus();
        }
    }, [step]);

    return (
        <>
            {step === FormSteps.MESSAGE &&
                <form>
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
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                        ref={textInput}
                    />
                    <ButtonContainer>
                        <BackButton
                            backText={'Email'}
                            setStep={setStep}
                            step={step}
                        />
                        <NextButton
                            nextText={'Confirm'}
                            handleSubmit={handleSubmit}
                        />
                    </ButtonContainer>
                </form>}
        </>
    );
};

export const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep}) => {
    const handleSubmit = () => {
        setStep(step + 1);
    };

    return (
        <>
            {step === FormSteps.CONFIRM &&
                <form>
                    <p>Are you sure?</p>
                    <div onClick={() => setIsSelfDestructChecked(!isSelfDestructChecked)}>
                        <input
                            type="checkbox"
                            checked={isSelfDestructChecked}
                        />
                        <label>Self-destruct after 15min</label>
                    </div>
                    <ButtonContainer>
                        <BackButton
                            backText={'Message'}
                            setStep={setStep}
                            step={step}
                        />
                        <NextButton
                            nextText={'Send'}
                            handleSubmit={handleSubmit}
                        />
                    </ButtonContainer>
                </form>}
        </>
    );
};

export const Result = ({email, message, isSelfDestructChecked, step}) => {
    const success = true;

    return (
        <>
            {step === FormSteps.RESULT &&
                <div>
                    {success ?
                        <p>{'Success!'}</p> :
                        <p>{'Error!'}</p>}
                </div>}
        </>
    );
};

