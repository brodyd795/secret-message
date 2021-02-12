import React, {useEffect, useRef, useState} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import {useSend} from '../../utils/send-context';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import {FormButtonContainer, MobileFormButton} from './form-buttons';
import {FormHeader} from './form-text';

const MessageForm = () => {
    const {message, setMessage, step, setStep, setErrorMessage, errorMessage} = useSend();
    const [isFocused, setIsFocused] = useState(false);

    const handleNext = () => {
        if (message.length) {
            setStep(step + 1);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a secret message.');
        }
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrorMessage('');
    };

    const textInput = useRef(null);

    useEffect(() => {
        if (step === SendFormSteps.MESSAGE) {
            textInput.current.focus();
            setIsFocused(true);
        }

        window.scrollTo(0, 0);
    }, [step]);

    return (
        <>
            <form className={'flex flex-col w-full min-h-60 items-center'}>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter secret message'}</FormHeader>
                    <div className={'flex justify-center items-center w-3/4 md:w-2/3 lg:w-1/2 -mb-10 sm:mb-0'}>
                        <textarea
                            id={'message'}
                            value={message}
                            aria-label={'message'}
                            placeholder={'e.g. My real name is Bruce Wayne'}
                            onChange={(e) => {
                                setErrorMessage('');
                                setMessage(e.target.value);
                            }}
                            className={'my-4 p-1 rounded w-full text-gray-900 mt-10 bg-gray-100'}
                            ref={textInput}
                            rows={5}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <div>
                        <MobileFormButton
                            isNext={false}
                            handleClick={handleBack}
                        />
                        <MobileFormButton
                            isNext
                            handleClick={handleNext}
                        />
                    </div>
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                <FormButtonContainer
                    backText={'Email'}
                    handleBack={handleBack}
                    nextText={'Confirm'}
                    handleNext={handleNext}
                />
            </form>
        </>
    );
};

export default MessageForm;
