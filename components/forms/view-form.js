import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Skeletons from '../skeletons';
import SlidingDiv from '../sliding-div';
import {ViewFormSteps} from '../../enums/form-steps';
import {ErrorMessages} from '../../enums/error-messages';

import {FormHeader, MessageSubHeader} from './form-text';
import {FormButtonContainer, MobileFormButton} from './form-buttons';

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
                <MessageSubHeader className={'mt-4'}>{bodyOne}</MessageSubHeader>
                <MessageSubHeader>{bodyTwo}</MessageSubHeader>
            </>
        );
    }

    return (
        <div className={'-mt-24'}>
            <FormHeader>{'Message:'}</FormHeader>
            <textarea
                id={'message'}
                readOnly
                value={message}
                aria-label={'message'}
                className={'p-1 rounded w-4/5 text-gray-900 mx-10 my-5 bg-gray-100'}
                rows={5}
            />
            <MessageSubHeader isWarning>{'This message has been permanently deleted from the server.'}</MessageSubHeader>
            <MessageSubHeader isWarning>{'This is the only time you can view it.'}</MessageSubHeader>
        </div>
    );
};

const ConfirmView = () =>
    <div>
        <FormHeader>{'Are you sure?'}</FormHeader>
        <MessageSubHeader>{'You can only view this message once.'}</MessageSubHeader>
        <MessageSubHeader>{'Once you view it, it will be permanently deleted from the server.'}</MessageSubHeader>
    </div>;

const ViewForm = () => {
    const [step, setStep] = useState(ViewFormSteps.CONFIRM);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {id, key, iv, hmacKey} = router.query;

    if (id === undefined || key === undefined || iv === undefined || hmacKey === undefined) {
        return (
            <div>
                <FormHeader>{somethingWentWrong}</FormHeader>
                <MessageSubHeader>{'Sorry, the url you\'ve entered has some missing data.'}</MessageSubHeader>
                <MessageSubHeader>{'Please try again.'}</MessageSubHeader>
            </div>
        );
    }

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
        <div className={'flex flex-col w-full min-h-60 items-center'}>
            <SlidingDiv motionKey={step}>
                {step === 0 &&
                    <ConfirmView />}
                {step === 1 &&
                    <MessageView message={message} />}
            </SlidingDiv>
            {message ?
                <>
                    <Link href="/">
                        <button
                            type={'submit'}
                            className={'flex flex-col justify-center outline-none focus:outline-none items-center mx-4 mt-8 p-2 rounded border w-1/2 sm:hidden transform hover:scale-105 transition duration-150 ease-in-out bg-gray-900'}
                        >
                            {'Home'}
                        </button>
                    </Link>
                    <FormButtonContainer
                        backText={''}
                        handleBack={() => {}}
                        nextText={'Home'}
                        handleNext={() => router.push('/')}
                    />
                </>
                :
                <>
                    <div>
                        <MobileFormButton
                            isNext={false}
                            handleClick={() => router.push('/')}
                        />
                        <MobileFormButton
                            isNext
                            handleClick={handleConfirm}
                        />
                    </div>
                    <FormButtonContainer
                        backText={'View later'}
                        handleBack={() => router.push('/')}
                        nextText={'Confirm'}
                        handleNext={handleConfirm}
                    />
                </>}
        </div>
    );
};

export default ViewForm;
