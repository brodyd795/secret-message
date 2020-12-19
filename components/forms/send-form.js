import React, {useState} from 'react';
import {motion} from 'framer-motion';

import {SendFormSteps} from '../../enums/form-steps';
import AlertIcon from '../../public/alert.svg';

import ConfirmForm from './confirm-form';
import EmailForm from './email-form';
import MessageForm from './message-form';
import Result from './result-form';

const variants = {
    hidden: {
        opacity: 0.1,
        y: 10
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1
        },
        y: 0
    },
    exiting: {
        opacity: 0.1,
        y: 10
    }
};

const ErrorAlert = ({errorMessage}) =>
    <motion.div
        key={'asdf'}
        initial="hidden"
        animate="visible"
        exit="exiting"
        variants={variants}
        layout
        className={'absolute -bottom-12 bg-red-300 border rounded p-2 flex justify-center items-center text-red-900'}
    >
        <AlertIcon className={'h-4 w-4 mr-2'} />
        <p className={'m-0'}>{errorMessage}</p>
    </motion.div>;

const SendForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    return (
        <>
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
                    email={email}
                    message={message}
                    step={step}
                    setStep={setStep}
                    setErrorMessage={setErrorMessage}
                    setLoading={setLoading}
                    setSuccess={setSuccess}
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
                />}
            {errorMessage &&
                <ErrorAlert errorMessage={errorMessage} />}
        </>
    );
};

export default SendForm;
