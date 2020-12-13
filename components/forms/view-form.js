import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import SlidingDiv from '../sliding-div';
import {ViewFormSteps} from '../../enums/form-steps';
import {ErrorMessages} from '../../enums/error-messages';

import {FormHeader} from './form-text';
import FormButtonContainer from './form-buttons';

const BackToSafetyView = () => (
    <Link href={'/'}>
        <a>{'Home'}</a>
    </Link>
);

const getMessageText = (message) => {
    let header,
        body;

    if (!message) {
        header = 'Something went wrong...';
        body = 'Sorry, looks like something strange happened. If you know the sender, please contact them regarding your message.';
    } else if (message === ErrorMessages.ALREADY_VIEWED) {
        header = 'Something went wrong...';
        body = 'Sorry, looks like this message has already been viewed. If you didn\'t view it, please contact the sender immediately.';
    } else if (message === ErrorMessages.SELF_DESTRUCTED) {
        header = 'Something went wrong...';
        body = 'Sorry, looks like this message self-destructed 15 minutes after it was sent. Please contact the sender directly.';
    } else {
        header = 'Message:';
        body = message;
    }

    return {
        header,
        body
    };
};

const MessageView = ({message}) => {
    const {header, body} = getMessageText(message);

    return (
        <>
            <FormHeader>{header}</FormHeader>
            <p>{body}</p>
        </>
    );
};

const ConfirmView = () =>
    <div>
        <FormHeader>{'Are you sure?'}</FormHeader>
        <p className={'mt-3'}>{'You can only view this message once.'}</p>
        <p className={''}>{'Once you view it, it will be permanently deleted from the server.'}</p>
    </div>;

const ViewForm = () => {
    const [step, setStep] = useState(ViewFormSteps.CONFIRM);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const {id, key, iv, hmacKey} = router.query;

    const handleConfirm = async () => {
        setStep(ViewFormSteps.VIEW);

        const response = await await fetch(`http://localhost:3000/api/controllers/view?id=${id}&key=${key}&iv=${iv}&hmacKey=${hmacKey}`);
        const json = await response.json();
        const result = json.message;

        setMessage(result);
    };

    return (
        <>
            <SlidingDiv motionKey={step}>
                {step === 0 &&
                    <ConfirmView />}
                {step === 1 &&
                    <MessageView message={message} />}
                {step === 2 &&
                    <BackToSafetyView />}
            </SlidingDiv>
            {message ?
                <FormButtonContainer
                    backText={''}
                    handleBack={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                    nextText={'Home'}
                    handleNext={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                />
                :
                <FormButtonContainer
                    backText={'View later'}
                    handleBack={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                    nextText={'Confirm'}
                    handleNext={handleConfirm}
                />}
        </>
    );
};

export default ViewForm;
