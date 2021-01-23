import React, {useEffect} from 'react';

import SlidingDiv from '../sliding-div';
import sendMessage from '../../utils/send-message';

import {FormButtonContainer, MobileFormButton} from './form-buttons';
import {FormHeader} from './form-text';
import ErrorAlert from './error-alert';

const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep, setErrorMessage, errorMessage, name, email, message, setLoading, setSuccess}) => {
    const handleNext = async () => {
        setStep(step + 1);

        const result = await sendMessage(name, email, message, isSelfDestructChecked);

        setLoading(false);
        setSuccess(result.status === 200);
    };

    const handleBack = () => {
        setStep(step - 1);
        setErrorMessage('');
    };

    const myListener = (e) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    useEffect(() => {
        window.addEventListener('keypress', myListener);

        return () => {
            window.removeEventListener('keypress', myListener);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form className={'flex flex-col w-full min-h-60 items-center justify-center'}>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Are you sure?'}</FormHeader>
                    <div className={'mt-10 flex'}>
                        <label className="flex flex-col cursor-pointer items-center justify-center">
                            <span className="m-2">{`Self-destruct: ${isSelfDestructChecked ? 'After 15min' : 'Never'}`}</span>
                            <input
                                className="checkbox cursor-pointer relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none"
                                type={'checkbox'}
                                checked={isSelfDestructChecked}
                                onClick={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                            />
                        </label>
                    </div>
                    <div>
                        <MobileFormButton
                            isNext={false}
                            handleClick={handleBack}
                        />
                        <MobileFormButton
                            isNext
                            handleClick={handleNext}
                        />
                    </div>
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                <FormButtonContainer
                    backText={'Message'}
                    handleBack={handleBack}
                    nextText={'Send'}
                    handleNext={handleNext}
                />
            </form>
        </>
    );
};

export default ConfirmForm;
