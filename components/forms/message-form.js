import React, {useEffect, useRef} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const MessageForm = ({message, setMessage, step, setStep, setErrorMessage}) => {
    const handleNext = () => {
        if (message.length) {
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
                    <FormHeader>{'Enter secret message'}</FormHeader>
                    <textarea
                        id={'message'}
                        value={message}
                        aria-label={'message'}
                        placeholder={'e.g. My real name is Bruce Wayne'}
                        onChange={(e) => {
                            setErrorMessage('');
                            setMessage(e.target.value);
                        }}
                        className={'my-4 p-1 rounded'}
                        ref={textInput}
                    />
                </SlidingDiv>
                <FormButtonContainer
                    backText={'Email'}
                    handleBack={() => setStep(step - 1)}
                    nextText={'Confirm'}
                    handleNext={handleNext}
                />
            </form>
        </>
    );
};

export default MessageForm;
