import React, {useEffect, useRef} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import Form from './form';
import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const EmailForm = ({email, setEmail, step, setStep, setErrorMessage, errorMessage}) => {
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
    }, [step]);

    return (
        <>
            <Form>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter recipient email address'}</FormHeader>
                    <div className={'flex justify-center w-3/4 sm:w-2/5 md:w-1/3 lg:w-1/4'}>
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
                            className={'my-4 p-1 rounded w-full text-gray-900 w-full'}
                            ref={textInput}
                            autoComplete={'off'}
                        />
                    </div>
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                <FormButtonContainer
                    backText={''}
                    handleBack={() => setStep(step - 1)}
                    nextText={'Secret Message'}
                    handleNext={handleNext}
                />
            </Form>
        </>
    );
};

export default EmailForm;
