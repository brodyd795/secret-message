import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

import Page from '../components/page';
import Header from '../components/header';

const Send = () => {
    const [count, setCount] = useState(0);

    return (
        <Page title={'Send'}>
            <Header />
            <button
                className={'mt-32'}
                onClick={() => setCount(count + 1)}
            >
                {'up'}
            </button>
            <button
                onClick={() => setCount(count - 1)}
            >
                {'down'}
            </button>
            <AnimatePresence>
                <motion.div
                    key={count}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {count % 2 === 0 ? <p>Even!</p> : <p>Odd!</p>}
                    
                </motion.div>
            </AnimatePresence>
        </Page>
    );
};

export default Send;
