import React from 'react';
import {motion, AnimatePresence, AnimateSharedLayout} from 'framer-motion';

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

const SlidingDiv = ({children, motionKey}) => (
    <AnimateSharedLayout>
        <AnimatePresence exitBeforeEnter>
            <motion.div
                key={motionKey}
                initial="hidden"
                animate="visible"
                exit="exiting"
                layout
                variants={variants}
                className={'flex justify-center w-full'}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    </AnimateSharedLayout>
);

export default SlidingDiv;

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

