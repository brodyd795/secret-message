import React, {useState} from 'react';
import {useRouter} from 'next/router';

import Skeletons from '../skeletons';
import SlidingDiv from '../sliding-div';
import {ViewFormSteps} from '../../enums/form-steps';
import {ErrorMessages} from '../../enums/error-messages';

import {FormHeader} from './form-text';
import {FormButtonContainer} from './form-buttons';

const somethingWentWrong = 'Something went wrong...';

const getMessageText = (message) => {
    let header,
        bodyOne,
        bodyTwo;

    if (!message) {
        header = somethingWentWrong;
        bodyOne = 'Sorry, looks like something strange happened.';
        bodyTwo = 'If you know the sender, please contact them regarding your message.';
    } else if (message === ErrorMessages.ALREADY_VIEWED) {
        header = somethingWentWrong;
        bodyOne = 'Sorry, looks like this message has already been viewed.';
        bodyTwo = 'If you didn\'t view it, please contact the sender immediately.';
    } else if (message === ErrorMessages.SELF_DESTRUCTED) {
        header = somethingWentWrong;
        bodyOne = 'Sorry, looks like this message self-destructed 15 minutes after it was sent.';
        bodyTwo = 'Please contact the sender directly.';
    }

    return {
        header,
        bodyOne,
        bodyTwo
    };
};

const MessageView = ({message}) => {
    if (!message || Object.values(ErrorMessages).includes(message)) {
        const {header, bodyOne, bodyTwo} = getMessageText(message);

        return (
            <>
                <FormHeader>{header}</FormHeader>
                <p className={'mt-4'}>{bodyOne}</p>
                <p>{bodyTwo}</p>
            </>
        );
    }

    return (
        <>
            <FormHeader>{'Message:'}</FormHeader>
            <textarea
                id={'message'}
                readOnly
                value={message}
                aria-label={'message'}
                className={'p-1 rounded w-4/5 text-gray-900 m-10 bg-gray-100'}
                rows={5}
            />
            <p className={'mt-4 text-red-400'}>{'This message has been permanently deleted from the server...'}</p>
            <p className={'text-red-400'}>{'This is the only time you can view it.'}</p>
        </>
    );
};

const ConfirmView = () =>
    <div>
        <FormHeader>{'Are you sure?'}</FormHeader>
        <p className={'mt-10'}>{'You can only view this message once.'}</p>
        <p className={''}>{'Once you view it, it will be permanently deleted from the server.'}</p>
    </div>;

const ViewForm = () => {
    const [step, setStep] = useState(ViewFormSteps.CONFIRM);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {id, key, iv, hmacKey} = router.query;

    const handleConfirm = async () => {
        setLoading(true);
        setStep(ViewFormSteps.VIEW);

        const response = await fetch(`/secret-message/api/controllers/view?id=${id}&key=${key}&iv=${iv}&hmacKey=${hmacKey}`);
        const json = await response.json();
        const result = json.message;

        setMessage(result);
        setLoading(false);
    };

    if (loading) {
        return <Skeletons />;
    }

    return (
        <div className={'flex flex-col w-full h-60 items-center'}>
            <SlidingDiv motionKey={step}>
                {step === 0 &&
                    <ConfirmView />}
                {step === 1 &&
                    <MessageView message={message} />}
            </SlidingDiv>
            {message ?
                <FormButtonContainer
                    backText={''}
                    handleBack={() => {}}
                    nextText={'Home'}
                    handleNext={() => router.push('/')}
                />
                :
                <FormButtonContainer
                    backText={'View later'}
                    handleBack={() => router.push('/')}
                    nextText={'Confirm'}
                    handleNext={handleConfirm}
                />}
        </div>
    );
};

export default ViewForm;
