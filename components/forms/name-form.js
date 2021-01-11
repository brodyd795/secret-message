import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from 'react-device-detect';

import {SendFormSteps} from '../../enums/form-steps';
import SlidingDiv from '../sliding-div';

import ErrorAlert from './error-alert';
import FormButtonContainer from './form-buttons';
import {FormHeader, FormSubHeader} from './form-text';

const NameForm = ({name, setName, step, setStep, setErrorMessage, errorMessage}) => {
    const [isFocused, setIsFocused] = useState(true);
    const shouldRenderButtons = !(isMobile && isFocused);

    const handleNext = () => {
        if (name.length) {
            setStep(step + 1);
        } else {
            setErrorMessage('Please enter your name.');
        }
    };

    const textInput = useRef(null);

    useEffect(() => {
        if (step === SendFormSteps.NAME) {
            textInput.current.focus();
        }
    }, [step]);

    return (
        <>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}
                className={'flex flex-col w-full h-60 items-center'}
            >
                <SlidingDiv motionKey={step}>
                    <FormHeader>{'Enter first and last name'}</FormHeader>
                    <FormSubHeader>{'(This information is never stored.'}</FormSubHeader>
                    <FormSubHeader>{'We only use it in the email to your recipient.)'}</FormSubHeader>
                    <div className={'flex justify-center w-3/4 sm:w-2/5 md:w-1/3 lg:w-1/4'}>
                        <input
                            id={'name'}
                            type={'text'}
                            value={name}
                            aria-label={'name'}
                            placeholder={'Brody Dingel'}
                            onChange={(e) => {
                                setErrorMessage('');
                                setName(e.target.value);
                            }}
                            className={'my-4 p-1 rounded w-full text-gray-900 w-full mt-10'}
                            ref={textInput}
                            autoComplete={'off'}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                </SlidingDiv>
                {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
                {shouldRenderButtons &&
                    <FormButtonContainer
                        backText={''}
                        handleBack={() => setStep(step - 1)}
                        nextText={'Email'}
                        handleNext={handleNext}
                    />}
            </form>
        </>
    );
};

export default NameForm;
