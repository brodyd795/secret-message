import React, {useEffect} from 'react';

import SlidingDiv from '../sliding-div';
import sendMessage from '../../utils/send-message';

import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep, setErrorMessage, email, message, setLoading, setSuccess}) => {
    const handleNext = async () => {
        setStep(step + 1);

        const result = await sendMessage(email, message, isSelfDestructChecked);

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
            <form className={'w-full'}>
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Are you sure?'}</FormHeader>
                    <div className={''}>
                        <label className="flex cursor-pointer items-center">
                            <input
                                className="checkbox cursor-pointer relative w-10 h-5 transition-all duration-200 ease-in-out bg-gray-400 rounded-full shadow-inner outline-none appearance-none"
                                type={'checkbox'}
                                checked={isSelfDestructChecked}
                                onClick={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                            />
                            <span className="ml-2">{`Self-destruct ${isSelfDestructChecked ? 'after 15min' : 'never'}`}</span>
                        </label>
                    </div>
                </SlidingDiv>
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
