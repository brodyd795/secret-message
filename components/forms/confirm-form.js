import React, {useEffect} from 'react';

import SlidingDiv from '../sliding-div';

import FormButtonContainer from './form-buttons';
import {FormHeader} from './form-text';

const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep}) => {
    const handleNext = () => {
        setStep(step + 1);
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
                    handleBack={() => setStep(step - 1)}
                    nextText={'Send'}
                    handleNext={handleNext}
                />
            </form>
        </>
    );
};

export default ConfirmForm;
