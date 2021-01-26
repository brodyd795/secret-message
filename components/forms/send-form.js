import React, {useState, useEffect} from 'react';

import {SendFormSteps} from '../../enums/form-steps';

import ConfirmForm from './confirm-form';
import EmailForm from './email-form';
import NameForm from './name-form';
import MessageForm from './message-form';
import Result from './result-form';

const SendForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setErrorMessage('');
    }, [step]);

    return (
        <>
            {step === SendFormSteps.NAME &&
                <NameForm
                    step={step}
                    setStep={setStep}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                    name={name}
                    setName={setName}
                />}
            {step === SendFormSteps.EMAIL &&
                <EmailForm
                    email={email}
                    setEmail={setEmail}
                    step={step}
                    setStep={setStep}
                    setErrorMessage={setErrorMessage}
                    errorMessage={errorMessage}
                />}
            {step === SendFormSteps.MESSAGE &&
                <MessageForm
                    message={message}
                    setErrorMessage={setErrorMessage}
                    setMessage={setMessage}
                    step={step}
                    setStep={setStep}
                    errorMessage={errorMessage}
                />}
            {step === SendFormSteps.CONFIRM &&
                <ConfirmForm
                    isSelfDestructChecked={isSelfDestructChecked}
                    setIsSelfDestructChecked={setIsSelfDestructChecked}
                    email={email}
                    message={message}
                    step={step}
                    setStep={setStep}
                    setErrorMessage={setErrorMessage}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
                    errorMessage={errorMessage}
                    name={name}
                />}
            {step === SendFormSteps.RESULT &&
                <Result
                    email={email}
                    message={message}
                    isSelfDestructChecked={isSelfDestructChecked}
                    step={step}
                    setStep={setStep}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
                    loading={loading}
                    success={success}
                    name={name}
                />}
        </>
    );
};

export default SendForm;
