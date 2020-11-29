import React, {useState} from 'react';
import Link from 'next/link';

const A = ({children, href}) =>
    <Link href={href}>
        <a
            className={'p-3 uppercase hover:bg-blue-500 w-full md:w-auto md:inline-block text-center'}
        >
            {children}
        </a>
    </Link>;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={'h-screen md:h-auto w-full flex flex-col fixed md:flex-row md:justify-between md:bg-gray-500'}>
            <div className={'bg-gray-500 w-full md:w-auto flex justify-between items-center p-2'}>
                <span>HOME</span>
                <button
                    type={'button'}
                    onClick={() => setIsOpen(!isOpen)}
                    className={'block hover:text-white focus:text-white focus:outline-none p-3 md:hidden'}
                    style={{color: 'blue'}}
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
            <div
                className={`trans bg-gray-500 flex flex-grow ${isOpen ? 'w-full' : 'w-0'} z-10 left-0 overflow-x-hidden md:hidden`}
            >
                <div className={'w-full flex flex-col items-center justify-center'}>
                    <A href={'#'}>{'Send message'}</A>
                    <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                    <A href={'#'}>{'About'}</A>
                </div>
            </div>
            <div
                className={'hidden md:block bg-gray-500'}
            >
                <A href={'#'}>{'Send message'}</A>
                <A href={'https://github.com/brodyd795/secret-message'}>{'Source Code'}</A>
                <A href={'#'}>{'About'}</A>
            </div>
        </header>
    );
};

export default Header;
