import React, {useState} from 'react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion';

import Page from '../components/page';
import Header from '../components/header';
import {EmailForm, MessageForm, ConfirmForm, Result} from '../components/form-steps';

const Send = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);

    return (
        <Page title={'Send | Secret Message'}>
            <Header />
            <div className={'text-red-500  h-screen flex flex-col justify-center items-center'}>
                <AnimateSharedLayout>
                    <AnimatePresence exitBeforeEnter>
                        <motion.div
                            key={step}
                            initial="hidden"
                            animate="visible"
                            exit="exiting"
                            layout
                            variants={{
                                hidden: {
                                    scale: 0.8,
                                    opacity: 0.1,
                                    x: -100
                                },
                                visible: {
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        when: 'beforeChildren',
                                        staggerChildren: 0.2
                                    },
                                    x: 0
                                },
                                exiting: {
                                    scale: 0.8,
                                    opacity: 0.1,
                                    x: 100
                                }
                            }}
                        >
                            <EmailForm
                                email={email}
                                setEmail={setEmail}
                                step={step}
                                setStep={setStep}
                            />
                            <MessageForm
                                message={message}
                                setMessage={setMessage}
                                step={step}
                                setStep={setStep}
                            />
                            <ConfirmForm
                                isSelfDestructChecked={isSelfDestructChecked}
                                setIsSelfDestructChecked={setIsSelfDestructChecked}
                                step={step}
                                setStep={setStep}
                            />
                            <Result
                                email={email}
                                message={message}
                                isSelfDestructChecked={isSelfDestructChecked}
                                step={step}
                            />
                        </motion.div>
                    </AnimatePresence>
                </AnimateSharedLayout>
            </div>
        </Page>
    );
};

export default Send;

// WIP framer motion component
/*
 * <AnimatePresence initial={false}>
 *                     <motion.div
 *                         key={page}
 *                         custom={direction}
 *                         variants={variants}
 *                         initial="enter"
 *                         animate="center"
 *                         exit="exit"
 *                         transition={{
 *                             x: {type: 'spring', stiffness: 300, damping: 200},
 *                             opacity: {duration: 0.2}
 *                         }}
 *                     >
 *                         {page === 0 ? <p>Zero</p> : <p>Not Zero</p>}
 *                     </motion.div>
 *                 </AnimatePresence>
 *
 */

