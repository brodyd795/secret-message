import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import Page from '../components/page';
import Header from '../components/header';

const Send = () => {
    const [count, setCount] = useState(0);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);

    const [step, setStep] = useState(0);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const getBackBtnText = () => {
        if (step === 1) {
            return 'Recipient';
        } else if (step === 2) {
            return 'Message';
        }

        return null;
    };

    const getNextBtnText = () => {
        if (step === 0) {
            return 'Message';
        } else if (step === 1) {
            return 'Confirm';
        }

        return null;
    };

    const getIsNextDisabled = () => {
        if (!email) {
            return true;
        }

        if (step === 1 && !message) {
            return true;
        }

        return false;
    };

    return (
        <Page title={'Send | Secret Message'}>
            <Header />
            <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
                <AnimatePresence>
                    <motion.div
                        key={step}
                        initial="hidden"
                        animate="visible"
                        exit="exiting"
                        variants={{
                            hidden: {
                                scale: 0.8,
                                opacity: 0,
                                x: -100
                            },
                            visible: {
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    delay: 0.4
                                },
                                x: 0
                            },
                            exiting: {
                                scale: 0.8,
                                opacity: 0,
                                x: -100
                            }
                        }}
                    >
                        {step === 0 &&
                            <>
                                <label className={'block'}>{'Enter recipient email address'}</label>
                                <input
                                    id={'email'}
                                    type={'email'}
                                    value={email}
                                    aria-label={'email'}
                                    placeholder={'me@dingel.dev'}
                                    onChange={handleEmailChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setStep(1);
                                        }
                                    }}
                                    required
                                    className={'mx-4 my-2 p-1 rounded'}
                                />
                            </>}
                        {step === 1 &&
                            <>
                                <label className={'block'}>{'Enter secret message'}</label>
                                <textarea
                                    id={'message'}
                                    type={'text'}
                                    value={message}
                                    aria-label={'message'}
                                    placeholder={'Enter secret message'}
                                    onChange={handleMessageChange}
                                    className={'mx-4 my-2 p-1 rounded'}
                                />
                            </>}
                        {step === 2 &&
                            <>
                                <p>Are you sure?</p>
                                <input
                                    type="checkbox"
                                    checked={isSelfDestructChecked}
                                    onChange={() => setIsSelfDestructChecked(!isSelfDestructChecked)}
                                />
                                <label>Self-destruct after 15min</label>
                                <button className={'block'}>Send</button>
                            </>}
                        {step === 3 &&
                            <>
                                <h4>Success!</h4>
                            </>}
                    </motion.div>
                </AnimatePresence>
                <div className={'flex'}>
                    <div className={'bg-green-500 h-24 w-24'}>
                        {step > 0 &&
                            <button
                                type={'button'}
                                className={'m-2 p-2 rounded border'}
                                onClick={() => setStep(step - 1)}
                            >
                                {getBackBtnText()}
                            </button>}
                    </div>
                    <div className={'bg-green-500 h-24 w-24'}>
                        {step < 2 &&
                            <button
                                className={'m-2 p-2 rounded border'}
                                type={'button'}
                                onClick={() => setStep(step + 1)}
                                disabled={getIsNextDisabled()}
                            >
                                {getNextBtnText()}
                            </button>}
                    </div>
                </div>
            </div>
        </Page>
    );
};

export default Send;
