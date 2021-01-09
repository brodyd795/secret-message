import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from 'react-device-detect';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const MessageForm = ({message, setMessage, step, setStep, setErrorMessage, errorMessage}) => {
    const [isFocused, setIsFocused] = useState(false);
    const shouldRenderButtons = !(isMobile && isFocused);

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

            if (message === '\n') {
                setMessage('');
            }
        }
    }, [step]);

    return (
        <>
            <form className={'flex flex-col w-full h-60 items-center'}>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter secret message'}</FormHeader>
                    <div className={'flex justify-center w-3/4 md:w-2/3 lg:w-1/2'}>
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
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                {shouldRenderButtons &&
                    <FormButtonContainer
                        backText={'Email'}
                        handleBack={handleBack}
                        nextText={'Confirm'}
                        handleNext={handleNext}
                    />}
            </form>
        </>
    );
};

export default MessageForm;
