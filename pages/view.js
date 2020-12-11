import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import Page from '../components/page';
import Header from '../components/header';
import SlidingDiv from '../components/sliding-div';
import {ViewFormSteps} from '../enums/form-steps';
import {ErrorMessages} from '../enums/error-messages';
import {BackButton, ButtonContainer, Label, NextButton} from '../components/form-steps';

const BackToSafety = () => (
    <Link href={'/'}>
        <a>{'Home'}</a>
    </Link>
);

const SecretMessage = ({message}) => {
    if (!message) {
        return (
            <div>
                <Label>{'Something went wrong...'}</Label>
                <p>{'Sorry, looks like something strange happened. If you know the sender, please contact them regarding your message.'}</p>
            </div>
        );
    } else if (message === ErrorMessages.ALREADY_VIEWED) {
        return (
            <div>
                <Label>{'Something went wrong...'}</Label>
                <p>{'Sorry, looks like this message has already been viewed. If you didn\'t view it, please contact the sender immediately.'}</p>
            </div>
        );
    } else if (message === ErrorMessages.SELF_DESTRUCTED) {
        return (
            <div>
                <Label>{'Something went wrong...'}</Label>
                <p>{'Sorry, looks like this message self-destructed 15 minutes after it was sent. Please contact the sender directly.'}</p>
            </div>
        );
    }

    return (
        <div>
            <Label>{'Message:'}</Label>
            <p>{message}</p>
        </div>
    );
};

const View = () => {
    const [step, setStep] = useState(ViewFormSteps.CONFIRM);
    const [message, setMessage] = useState(null);
    const router = useRouter();

    const handleConfirm = async () => {
        setStep(ViewFormSteps.VIEW);

        const response = await fetch(`http://localhost:3000/api/controllers/view?id=${router.query.id}`);
        const json = await response.json();
        const result = json.message;

        setMessage(result);
    };

    return (
        <Page title={'Send | Secret Message'}>
            <Header />
            <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
                <div className={'relative flex flex-col justify-center w-3/4 sm:w-1/2 md:w-2/5'}>
                    <SlidingDiv motionKey={step}>
                        {step === 0 &&
                            <div>
                                <Label>{'Are you sure?'}</Label>
                                <p className={'mt-3'}>{'You can only view this message once.'}</p>
                                <p className={''}>{'Once you view it, it will be permanently deleted from the server.'}</p>
                            </div>}
                        {step === 1 &&
                            <SecretMessage message={message} />}
                        {step === 2 &&
                            <BackToSafety />}
                    </SlidingDiv>
                    <ButtonContainer>
                        {message ?
                            <>
                                <BackButton
                                    backText={''}
                                    handleBack={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                                />
                                <NextButton
                                    nextText={'Home'}
                                    handleSubmit={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                                />
                            </>
                            : <>
                                <BackButton
                                    backText={'View later'}
                                    handleBack={() => setStep(ViewFormSteps.BACK_TO_SAFETY)}
                                />
                                <NextButton
                                    nextText={'Confirm'}
                                    handleSubmit={handleConfirm}
                                />
                            </>}
                    </ButtonContainer>
                </div>
            </div>
        </Page>
    );
};

export default View;
