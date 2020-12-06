import React, {useState} from 'react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion';

import {EmailForm, MessageForm, ConfirmForm, Result} from './form-steps';

const variants = {
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
};

const Form = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSelfDestructChecked, setIsSelfDestructChecked] = useState(true);
    const [step, setStep] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <AnimateSharedLayout>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={step}
                        initial="hidden"
                        animate="visible"
                        exit="exiting"
                        layout
                        variants={variants}
                    >
                        <EmailForm
                            email={email}
                            setEmail={setEmail}
                            step={step}
                            setStep={setStep}
                            setErrorMessage={setErrorMessage}
                        />
                        <MessageForm
                            message={message}
                            setErrorMessage={setErrorMessage}
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
            <div className={'absolute -bottom-20'}>
                <p>{errorMessage}</p>
            </div>
        </>
    );
};

export default Form;

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

