import React, {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';

import {theme} from '../tailwind.config';
import BarsIcon from '../public/bars.svg';
import TimesIcon from '../public/times.svg';

const A = ({children, href}) =>
    <Link href={href}>
        <a
            className={'p-3 uppercase w-full md:w-auto md:inline-block text-center hover:text-gray-100 transition-colors'}
        >
            {children}
        </a>
    </Link>;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={'md:h-auto w-full flex flex-col fixed md:flex-row md:justify-between z-10 bg-gray-800'}
        >
            <div
                className={'w-full md:w-auto flex justify-between items-center p-2'}
            >
                <Link href={'/'}>
                    <a>{'HOME'}</a>
                </Link>
                <button
                    type={'button'}
                    onClick={() => setIsOpen(!isOpen)}
                    className={'block hover:text-white focus:text-white focus:outline-none active:bg-transparent p-3 md:hidden'}
                    style={{color: theme.extend.colors.gold.DEFAULT}}
                >
                    {isOpen ? <TimesIcon className={'h-6'} /> : <BarsIcon className={'h-6'} />}
                </button>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        style={{overflow: 'hidden'}}
                        initial={{
                            opacity: 0,
                            height: 0
                        }}
                        animate={{
                            opacity: 1,
                            height: '100vh'
                        }}
                        exit={{
                            opacity: 0,
                            height: 0
                        }}
                        transition={{
                            duration: 2,
                            type: 'spring',
                            mass: 0.3
                        }}
                        className={'h-screen flex flex-grow z-10 left-0 overflow-x-hidden md:hidden'}
                    >

                        <div
                            className={'w-full flex flex-col items-center justify-center bg-gray-800'}
                        >
                            <A href={'/send'}>{'Send message'}</A>
                            <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                            <A href={'#'}>{'About'}</A>
                        </div>
                    </motion.div>}

            </AnimatePresence>
            <div
                className={'hidden md:block'}
            >
                <A href={'/send'}>{'Send message'}</A>
                <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                <A href={'/about'}>{'About'}</A>
            </div>
        </header>
    );
};

export default Header;
