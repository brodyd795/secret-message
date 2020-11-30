import React, {useState} from 'react';
import Link from 'next/link';
import {motion, AnimatePresence} from 'framer-motion';

import {theme} from '../tailwind.config';

const A = ({children, href}) =>
    <Link href={href}>
        <a
            className={'p-3 uppercase w-full md:w-auto md:inline-block text-center'}
        >
            {children}
        </a>
    </Link>;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header
            className={'md:h-auto w-full flex flex-col fixed md:flex-row md:justify-between'}
        >
            <div
                className={'w-full md:w-auto flex justify-between items-center p-2'}
                style={{backgroundImage: `url(${require('../public/background.svg')})`}}
            >
                <span>HOME</span>
                <button
                    type={'button'}
                    onClick={() => setIsOpen(!isOpen)}
                    className={'block hover:text-white focus:text-white focus:outline-none active:bg-transparent p-3 md:hidden'}
                    style={{color: theme.extend.colors.gold.DEFAULT}}
                >
                    <svg
                        className="h-6 w-6 fill-current"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fillRule="evenodd"
                            d={
                                isOpen ?
                                    'M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                                    :
                                    'M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                            }
                        />
                    </svg>
                </button>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div
                        key="modal"
                        initial={{
                            opacity: 0,
                            x: -200
                        }}
                        animate={{
                            opacity: 1,
                            x: 0
                        }}
                        exit={{
                            opacity: 0,
                            x: -200
                        }}
                    >
                        <div
                            className={`h-screen flex flex-grow z-10 left-0 overflow-x-hidden md:hidden`}
                        >
                            <div
                                className={'w-full flex flex-col items-center justify-center'}
                                style={{backgroundImage: `url(${require('../public/background.svg')})`}}
                            >
                                <A href={'/send'}>{'Send message'}</A>
                                <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                                <A href={'#'}>{'About'}</A>
                            </div>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
            <div
                className={'hidden md:block'}
            >
                <A href={'/send'}>{'Send message'}</A>
                <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                <A href={'#'}>{'About'}</A>
            </div>
        </header>
    );
};

export default Header;
