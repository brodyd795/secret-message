import React, {useEffect} from 'react';

import {SendFormSteps} from '../../enums/form-steps';
import {useSend} from '../../utils/send-context';

import ConfirmForm from './confirm-form';
import EmailForm from './email-form';
import NameForm from './name-form';
import MessageForm from './message-form';
import Result from './result-form';

const SendForm = () => {
    const {step, setErrorMessage} = useSend();

    useEffect(() => {
        setErrorMessage('');
    }, [step, setErrorMessage]);

    return (
        <>
            {step === SendFormSteps.NAME &&
                <NameForm />}
            {step === SendFormSteps.EMAIL &&
                <EmailForm />}
            {step === SendFormSteps.MESSAGE &&
                <MessageForm />}
            {step === SendFormSteps.CONFIRM &&
                <ConfirmForm />}
            {step === SendFormSteps.RESULT &&
                <Result />}
        </>
    );
};

export default SendForm;
