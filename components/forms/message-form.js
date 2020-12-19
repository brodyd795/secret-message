import React, {useEffect, useRef} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import Form from './form';
import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const MessageForm = ({message, setMessage, step, setStep, setErrorMessage, errorMessage}) => {
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
        }
    }, [step]);

    return (
        <>
            <Form>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter secret message'}</FormHeader>
                    <div className={'flex justify-center w-3/4 sm:w-2/5 md:w-1/3 lg:w-1/4'}>
                        <textarea
                            id={'message'}
                            value={message}
                            aria-label={'message'}
                            placeholder={'e.g. My real name is Bruce Wayne'}
                            onChange={(e) => {
                                setErrorMessage('');
                                setMessage(e.target.value);
                            }}
                            className={'my-4 p-1 rounded w-full text-gray-900'}
                            ref={textInput}
                            rows={5}
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
            </Form>
        </>
    );
};

export default MessageForm;
