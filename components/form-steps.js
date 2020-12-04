import React from 'react';

const ButtonContainer = ({children}) =>
    <div className={'flex justify-between'}>{children}</div>;

export const BackButton = ({backText, step, setStep}) => (
    <>
        <div className={'flex h-24 w-24'}>
            {backText &&
                <button
                    type={'button'}
                    className={'m-2 p-2 rounded border w-full'}
                    onClick={() => setStep(step - 1)}
                >
                    {backText}
                </button>}
        </div>
    </>
);

export const NextButton = ({nextText, step, setStep}) => (
    <>
        <div className={'flex h-24 w-24'}>
            {nextText &&
                <button
                    type={'submit'}
                    className={'m-2 p-2 rounded border w-full'}
                    onClick={() => setStep(step + 1)}
                >
                    {nextText}
                </button>}
        </div>
    </>
);

export const EmailForm = ({email, setEmail, step, setStep}) =>
    <>
        {step === 0 &&
            <form>
                <label className={'block'}>{'Enter recipient email address'}</label>
                <input
                    id={'email'}
                    type={'email'}
                    value={email}
                    aria-label={'email'}
                    placeholder={'me@dingel.dev'}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setStep(1);
                        }
                    }}
                    required
                    className={'mx-4 my-2 p-1 rounded'}
                />
                <ButtonContainer>
                    <BackButton
                        backText={''}
                        setStep={setStep}
                        step={step}
                    />
                    <NextButton
                        nextText={'Secret Message'}
                        setStep={setStep}
                        step={step}
                    />
                </ButtonContainer>
            </form>}
    </>;

export const MessageForm = ({message, setMessage, step, setStep}) =>
    <>
        {step === 1 &&
            <form>
                <label className={'block'}>{'Enter secret message'}</label>
                <textarea
                    id={'message'}
                    value={message}
                    aria-label={'message'}
                    placeholder={'Enter secret message'}
                    onChange={(e) => setMessage(e.target.value)}
                    className={'mx-4 my-2 p-1 rounded'}
                />
                <ButtonContainer>
                    <BackButton
                        backText={'Email'}
                        setStep={setStep}
                        step={step}
                    />
                    <NextButton
                        nextText={'Confirm'}
                        setStep={setStep}
                        step={step}
                    />
                </ButtonContainer>
            </form>}
    </>;

export const ConfirmForm = ({isSelfDestructChecked, setIsSelfDestructChecked, step, setStep}) =>
    <>
        {step === 2 &&
            <form>
                <p>Are you sure?</p>
                <input
                    type="checkbox"
                    checked={isSelfDestructChecked}
                    onChange={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                />
                <label>Self-destruct after 15min</label>
                <ButtonContainer>
                    <BackButton
                        backText={'Message'}
                        setStep={setStep}
                        step={step}
                    />
                    <NextButton
                        nextText={'Send'}
                        setStep={setStep}
                        step={step}
                    />
                </ButtonContainer>
            </form>}
    </>;

export const Result = ({email, message, isSelfDestructChecked, step}) => {
    const success = true;

    return (
        <>
            {step === 3 &&
                <div>
                    {success ?
                        <p>{'Success!'}</p> :
                        <p>{'Error!'}</p>}
                </div>}
        </>
    );
};


