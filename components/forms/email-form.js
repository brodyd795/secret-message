import React, {useEffect, useRef, useState} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import {FormButtonContainer, MobileFormButton} from './form-buttons';
import {FormHeader, FormSubHeader} from './form-text';

const EmailForm = ({email, setEmail, step, setStep, setErrorMessage, errorMessage}) => {
    const [isFocused, setIsFocused] = useState(true);
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const handleNext = () => {
        if (emailRegex.test(email)) {
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

        window.scrollTo(0, 0);
    }, [step]);

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
                className={'flex flex-col w-full min-h-60 items-center'}
            >
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter recipient email address'}</FormHeader>
                    <FormSubHeader>{'(This is also never stored.)'}</FormSubHeader>
                    <div className={'flex justify-center items-center w-3/4 sm:w-2/5 md:w-1/3 lg:w-1/4'}>
                        <input
                            id={'email'}
                            type={'email'}
                            value={email}
                            aria-label={'email'}
                            placeholder={'me@example.com'}
                            onChange={(e) => {
                                setErrorMessage('');
                                setEmail(e.target.value);
                            }}
                            className={'my-4 p-1 rounded w-full text-gray-900 w-full mt-10 -mb-4 sm:mb-0'}
                            ref={textInput}
                            autoComplete={'off'}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <div>
                        <MobileFormButton
                            isNext={false}
                            handleClick={() => setStep(step - 1)}
                        />
                        <MobileFormButton
                            isNext
                            handleClick={handleNext}
                        />
                    </div>
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                <FormButtonContainer
                    backText={'Name'}
                    handleBack={() => setStep(step - 1)}
                    nextText={'Secret Message'}
                    handleNext={handleNext}
                />
            </form>
        </>
    );
};

export default EmailForm;
