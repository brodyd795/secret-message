import React, {useState} from 'react';

import {SendFormSteps} from '../enums/form-steps';

import SlidingDiv from './sliding-div';
import {EmailForm, MessageForm, ConfirmForm, Result} from './form-steps';

const Form = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <SlidingDiv motionKey={step}>
                {step === SendFormSteps.EMAIL &&
                    <EmailForm
                        email={email}
                        setEmail={setEmail}
                        step={step}
                        setStep={setStep}
                        setErrorMessage={setErrorMessage}
                    />}
                {step === SendFormSteps.MESSAGE &&
                    <MessageForm
                        message={message}
                        setErrorMessage={setErrorMessage}
                        setMessage={setMessage}
                        step={step}
                        setStep={setStep}
                    />}
                {step === SendFormSteps.CONFIRM &&
                    <ConfirmForm
                        isSelfDestructChecked={isSelfDestructChecked}
                        setIsSelfDestructChecked={setIsSelfDestructChecked}
                        step={step}
                        setStep={setStep}
                    />}
                {step === SendFormSteps.RESULT &&
                    <Result
                        email={email}
                        message={message}
                        isSelfDestructChecked={isSelfDestructChecked}
                    />}
            </SlidingDiv>
            <div className={'absolute -bottom-20'}>
                <p>{errorMessage}</p>
            </div>
        </>
    );
};

export default Form;
