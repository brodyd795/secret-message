import React from 'react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion';

const variants = {
    hidden: {
        opacity: 0.1,
        x: -100
    },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            bounce: 0,
            duration: 0.5
        },
        x: 0
    },
    exiting: {
        opacity: 0.1,
        x: 100
    }
};

const SlidingDiv = ({children, motionKey}) => (
    <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
            <motion.div
                key={motionKey}
                initial={'hidden'}
                animate={'visible'}
                exit={'exiting'}
                layout
                variants={variants}
                className={'flex flex-col items-center justify-center w-full'}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </AnimateSharedLayout>
);

export default SlidingDiv;
