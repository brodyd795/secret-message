import React from 'react';
import {motion} from 'framer-motion';

import AlertIcon from '../../public/alert.svg';

const variants = {
    hidden: {
        opacity: 0.1,
        y: 10
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1
        },
        y: 0
    },
    exiting: {
        opacity: 0.1,
        y: 10
    }
};

const ErrorAlert = ({errorMessage}) =>
    <motion.div
        key={'asdf'}
        initial="hidden"
        animate="visible"
        exit="exiting"
        variants={variants}
        layout
        className={'bg-red-300 border rounded p-2 flex justify-center items-center text-red-900 w-3/4 md:w-1/2 m-4'}
    >
        <AlertIcon className={'h-4 w-4 mr-2'} />
        <p className={'m-0'}>{errorMessage}</p>
    </motion.div>;

export default ErrorAlert;
