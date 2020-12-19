import React from 'react';

import LeftArrowIcon from '../../public/left-arrow.svg';
import RightArrowIcon from '../../public/right-arrow.svg';

const ButtonContainer = ({children}) =>
    <div className={'flex h-20 w-1/2 sm:w-2/5 md:m-4'}>
        {children}
    </div>;

const ButtonTextWrapper = ({children}) =>
    <span className={'text-lg'}>{children}</span>;

const BackButton = ({backText, handleBack}) => (
    <>
        <ButtonContainer>
            {backText &&
                <button
                    type={'button'}
                    className={'flex flex-col justify-center items-center m-2 p-2 rounded border w-full  transform hover:scale-105 transition duration-150 ease-in-out bg-gray-900'}
                    onClick={handleBack}
                >
                    <LeftArrowIcon className={'h-6'} />
                    <ButtonTextWrapper>{backText}</ButtonTextWrapper>
                </button>}
        </ButtonContainer>
    </>
);

const NextButton = ({nextText, handleNext}) => (
    <>
        <ButtonContainer>
            {nextText &&
                <button
                    type={'submit'}
                    className={'flex flex-col justify-center items-center m-2 p-2 rounded border w-full transform hover:scale-105 transition duration-150 ease-in-out bg-gray-900'}
                    onClick={(e) => {
                        e.preventDefault();

                        handleNext();
                    }}
                >
                    <RightArrowIcon className={'h-6'} />
                    <ButtonTextWrapper>{nextText}</ButtonTextWrapper>
                </button>}
        </ButtonContainer>
    </>
);

const FormButtonContainer = ({backText, handleBack, nextText, handleNext}) =>
    <div className={'w-screen flex justify-between absolute bottom-0 left-0'}>
        <BackButton
            backText={backText}
            handleBack={handleBack}
        />
        <NextButton
            nextText={nextText}
            handleNext={handleNext}
        />
    </div>;

export default FormButtonContainer;
